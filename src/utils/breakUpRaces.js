// this program extends the races json file by  breaking up the fulltext into new keys and values
// races that have replacement features MUST EB ADJUSTED MANUALLY IF THIS IS RUN AGAIN

import fs from 'fs';
import toCamelCase from "./toCamelCase.js";

let input = fs.readFileSync('D:/nodejs_programs/DnD-4e/src/data/races.json', 'utf8');
let json = JSON.parse(input);

const breakup = (fullText,) => {
    let output = {
        "name": "",
        "height": "",
        "weight": "",
        "abilityScores": "",
        "size": "",
        "speed": "",
        "languages": "",
        "uniqueFeatures": {},
        "physTxt": "",
        "refSource": ""
    }

    // first remove \\n, \\r and \\\ from the text and remove everything after the closing html tag
    let original = fullText.replace(/\\n/g, '').replace(/\\r/g, '').replace(/=(\\)*?"/g, '="').replace(/\\"/g, '"').replace(/<\/html>.*$/g, '');
    
    // get the name from the title header
    let name = original.match(/<title>(.*?)<\/title>/);
    if (name) { 
        output.name = name[1] 
    } else {
        output.name = 'ERROR - NO NAME';
    };

    let flavor = original.match(/<\/h1><i>(.*?)<\/i>/)
    if (flavor) { output.flavorTxt = flavor[1] };

    // check the document for a race power
    let power = original.match(/<span class="power".*?<\/span>(.*?)<\/h1>/);
    if (power) { output.power = power[1] };

    // // check the document for personality characteristics
    let characteristics = original.match(/<b>.*? Characteristics<\/b>: (.*?)<br\/><br\/>/);
    if (characteristics) { output.characteristics = characteristics[1].toLowerCase().replace(/, /g, ',').split(",") };

    // // check the document for female and male names
    let femNames = original.match(/<b>.*? Female Names<\/b>: (.*?)<br\/>/);
    if (femNames) { output.femNames = femNames[1].toLowerCase().replace(/, /g, ',').split(",") };

    let mascNames = original.match(/<b>.*? Male Names<\/b>: (.*?)<br\/>/);
    if (mascNames) { output.mascNames = mascNames[1].toLowerCase().replace(/, /g, ',').split(",") };

    // find the race features section
    let blockquote = original.match(/<blockquote>.*?<\/blockquote>/);
    let features = [];
    if (blockquote) {
        features = blockquote[0].match(/<b>.*?<\/b>: .*?<br\/>/g);
    }
    while (features.length > 0) {
        let standards = ['name', 'height', 'weight', 'abilityScores', 'size', 'speed', 'languages'];
        let feature = features.pop();
        let key = feature.match(/<b>(.*?)<\/b>/)[1];
        key = toCamelCase(key);
        let value = feature.match(/<b>.*?<\/b>: (.*?)<br\/>/)[1];
        if (key === 'averageHeight') {
            key = 'height';
            value = value.replace(/\\/g, '');
        }

        if (key === 'averageWeight') {
            key = 'weight';
            value = value + ' lbs';
        }

        if (standards.includes(key)) {
            output[key] = value.trim();
        } else {
            output.uniqueFeatures[key] = value.trim();
        }
    };

    // set the source [--, book, page]
    let source = original.match(/Published in <a .*?>(.*?)<\/a>.*?(\d*?).*?<\/p>/)
    output.refSource = source[1] + ', page ' + source[2];

    // find the physical qualities section
    let physical = original.match(/<h3>PHYSICAL QUALITIES<\/h3>(.*?)<br\/><br\/>/);
    if (physical) {
        output.physTxt = physical[1].replace(/<br\/>/g, ' ').replace(/(&nbsp;)+/g, ' ').trim();
    };

    // find the PLAYING A section
    let playing = original.match(/<h3>PLAYING A.*?<\/h3>(.*?)<br\/><br\/>/);
    if(playing) {
        output.tipsTxt = playing[1].replace(/<br\/>/g, '').replace(/(&nbsp;)+/g, ' ').trim()
    };

    if (!blockquote) {
        
        if (output.name.match(/Dwarf/)) {
            output = JSON.parse(fs.readFileSync('D:/nodejs_programs/DND-4e/src/data/races/dwarf.json', 'utf8'));
            output.name = name[1];
        } else if (output.name.match(/Eladrin/)) {
            output = JSON.parse(fs.readFileSync('D:/nodejs_programs/DND-4e/src/data/races/eladrin.json', 'utf8'));
            output.name = name[1];
        } else if (output.name.match(/Elf/)) {
            output = JSON.parse(fs.readFileSync('D:/nodejs_programs/DND-4e/src/data/races/elf.json', 'utf8'));
            output.name = name[1];
        } else if (output.name.match(/Draconian/)) {
            output = JSON.parse(fs.readFileSync('D:/nodejs_programs/DND-4e/src/data/races/dragonborn.json', 'utf8'));
            output.name = name[1];
        };

        let flavor = original.match(/<\/h1><br\/>(.*?)<br\/><br\/>/);
        if (flavor) {
            output.flavorTxt = flavor[1].replace(/<br\/>/g, '').replace(/(&nbsp;)+/g, ' ').trim();
        };

        let tips = original.match(/<h3>Roleplaying a.*?<\/h3>(.*?)<br\/><br\/>/);
        if (tips) {
            output.tipsTxt = tips[1].replace(/<br\/>/g, '').replace(/(&nbsp;)+/g, ' ').trim();
        };

        let benefits = original.match(/<h3>.*?Benefits<\/h3>(.*?)<br\/><p /);
        if (benefits) {
            let benefit = benefits[1].match(/<b>.*?: <\/b>.*?<br\/>.*?<i>.*?<br\/>/g);
            while (benefit.length > 0) {
                let feature = benefit.pop();
                let key = feature.match(/<b>(.*?): <\/b>/)[1];
                key = toCamelCase(key);
                let value = feature.match(/<b>.*?: <\/b>(.*?<br\/>.*?<i>.*?)<br\/>/)[1]
                    .replace(/<br\/>/g, '').replace(/(&nbsp;)+/g, ' ').replace(/<i>/, '').replace(/<\/i>/, '').trim();
                output.uniqueFeatures[key] = value.trim();
            };
        };
    };

    return output;
};

for(let i = 0; i < json.length; i++) {
    let output = breakup(json[i].fullText);
    let fileName = toCamelCase(output.name) + '.json';
    fs.writeFileSync("D:/nodejs_programs/DnD-4e/src/data/races/" + fileName, JSON.stringify(output, null, 2), 'utf8');
}



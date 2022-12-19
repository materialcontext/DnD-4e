import fs from 'fs';

let folder = 'D:/nodejs_programs/DnD-4e/src/data/powers/';

const breakup = (fullText) => {
    // first remove \\n, \\r and \\\ from the text and remove everything after the closing html tag
    let original = fullText.replace(/\\n/g, '').replace(/\\r/g, '').replace(/=(\\)*?"/g, '="').replace(/\\"/g, '"').replace(/<\/html>.*$/g, '');
    let splitText = original.split('<br/><br/><h1');

    // return an object from the text with the following properties: 
    // attack, effect, flavor, keywords, onHit, onMiss, keywords, range, target, trigger
    // if the property is not present, return an empty string
    // if the property is present, return the value without the html tags or slashes

    const json = {
        "flavor": "",
        "keywords": [],
        "range": "",
    };
function processText(split, bonusTag = '') {
    // flavor is inside an <i> tage inside a <p> tag with the class flavor. There may be a bonus flavor so check for a second match too
    // if there is a second match add it as bonusFlavor
    let flavorMatches = split.match(/<p class="flavor"><i>(.*?)<\/i><\/p>/) ? split.match(/<p class="flavor"><i>(.*?)<\/i><\/p>/) : '';
    if (flavorMatches) { json[bonusTag + "flavor"] = flavorMatches[1].trim() };

    // range is inside a <p> with other stuff but the range is after six consecutive spaces written in unicode. there may be a bonus range so check for a second match too
    // remove the <b> tags from the range
    let rangeMatches = split.match(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(.*?)<br\/>/) ? split.match(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(.*?)<br\/>/) : '';
    if (rangeMatches) { json[bonusTag + "range"] = rangeMatches[1].replace(/<b>/g, '').replace(/<\/b>/g, '').trim() };

    //keywords are listed in <b> tags following four consecutive spaces written in unicode and ending at a <br /> tag. There may be a bonus lsit of keywords so check for that arrray too.
    // remove the <b> tags from each keyword
    let keywordMatches = split.match(/&nbsp;&nbsp;&nbsp;&nbsp;(.*?)<br\/>/) ? split.match(/&nbsp;&nbsp;&nbsp;&nbsp;(.*?)<br\/>/) : '';
    if (keywordMatches) { json[bonusTag +"keywords"] = keywordMatches[1].split('</b><b>').map(keyword => keyword.replace(/<b>/g, '').replace(/<\/b>/g, '').trim()); };
};

processText(splitText[0]);
if (splitText[1]) {
    processText(splitText[1], 'bonus');
};

    // create properties for the json object
    // the key is found in the text between <b> and </b> tags that are followed by a colon
    // the value is found in the text after the colon and before the next </p> tag

    
    let matchesOne = splitText[0].match(/<b>([\w ]*?)<\/b>: (.*?)<\/p>/g);
    let matchesTwo = [];

    if (splitText[1]) {
        matchesTwo = splitText[1].match(/<b>([\w ]*?)<\/b>: (.*?)<\/p>/g);
    }

    if (matchesOne) {
        let secondary = false;
        matchesOne.forEach(match => {
            let key = match.match(/<b>(.*?)<\/b>.*?/)[1];
            if (key === 'Primary Attack') {
                key = 'attack';
            }

            if (key === 'Secondary Attack') {
                secondary = true;
                key = 'secondaryAttack';
            };

            if (key === 'Hit' || key === 'Miss') {
                key = 'on' + key.charAt(0).toUpperCase() + key.slice(1);;
            };

            if (secondary && (key === 'onHit' || key === 'onMiss' || key === 'Effect')) {
                key = 'secondary' + key.charAt(0).toUpperCase() + key.slice(1);
            };

            if (key !== 'secondaryAttack' && key !== 'onHit' && key !== 'onMiss' 
             && key !== 'secondaryOnHit' && key !== 'secondaryOnMiss') {
                let keys = key.split(' ');
                // capitalize the first letter of each word except for the first word
                key = keys[0].toLowerCase() + keys.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
             }
            let value = match.match(/: (.*?)<\/p>/)[1];
            json[key] = value.trim();

            // if there is a bonusMatch, process it the same as the first but with the word bonus appended to the beginning of the key
        });
    };

    if (matchesTwo) {
        let secondary = false;
        matchesTwo.forEach(match => {
            let key = match.match(/<b>(.*?)<\/b>.*?/)[1];
            if (key === 'Primary Attack') {
                key = 'bonusAttack';
            }

            if (key === 'Secondary Attack') {
                secondary = true;
                key = 'bonusSecondaryAttack';
            };

            if (key === 'Hit' || key === 'Miss') {
                key = 'bonusOn' + key.charAt(0).toUpperCase() + key.slice(1);;
            };

            if (secondary && (key === 'onHit' || key === 'onMiss' || key === 'Effect')) {
                key = 'bonusSecondary' + key.charAt(0).toUpperCase() + key.slice(1);
            };

            if (key !== 'bonusSecondaryAttack' && key !== 'bonusOnHit' && key !== 'bonusOnMiss' 
            && key !== 'bonusSecondaryOnHit' && key !== 'bonusSecondaryOnMiss') {
                let keys = key.split(' ');
                // capitalize the first letter of each word except for the first word
                key = "bonus" + keys[0].toLowerCase() + keys.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
            }
            let value = match.match(/: (.*?)<\/p>/)[1];
            json[key] = value.trim();
        });
    };

    return json;
};

// loop through each class in the powers folder
let files = fs.readdirSync(folder);
files.forEach(file => {
    let data = fs.readFileSync(folder
        + file, 'utf8');
    let json = JSON.parse(data);
    let keys = Object.keys(json);
    keys.forEach(key => {
        let newData = breakup(json[key].fullText);
        let newKeys = Object.keys(newData);
        newKeys.forEach(newKey => {
            json[key][newKey] = newData[newKey];
        }); 
        if (key.type === 'of') {
            json[key].type = json[key].fullText.match(/<h1 class=.*?"(.*?)power/)[1];
        }
    });

    fs.writeFileSync(folder + file, JSON.stringify(json, null, 2), 'utf8');
});
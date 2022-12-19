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

    if (splitText.length > 1) {
        json.bonusPower = {
            "name": "",
            "flavor": "",
            "keywords": [],
            "range": "",
        };
    }
    
function processText(split, bonus = false) {
    // flavor is inside an <i> tage inside a <p> tag with the class flavor. There may be a bonus flavor so check for a second match too
    // if there is a second match add it as bonusFlavor
    let flavorMatches = split.match(/<p class="flavor"><i>(.*?)<\/i><\/p>/) ? split.match(/<p class="flavor"><i>(.*?)<\/i><\/p>/) : '';
    if (flavorMatches) {
        let flavor = flavorMatches[1].trim()
        bonus ? json.bonusPower.flavor = flavor : json.flavor = flavor;
    };

    // range is inside a <p> with other stuff but the range is after six consecutive spaces written in unicode. there may be a bonus range so check for a second match too
    // remove the <b> tags from the range
    let rangeMatches = split.match(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(.*?)<\/p>/) ? split.match(/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(.*?)\/p>/) : '';
    if (rangeMatches) {
        let range = rangeMatches[1].replace(/<b>/g, '').replace(/<\/b>/g, '').trim();
        bonus ? json.bonusPower.range = range : json.range = range; 
    };

    //keywords are listed in <b> tags following four consecutive spaces written in unicode and ending at a <br /> tag. There may be a bonus lsit of keywords so check for that arrray too.
    // remove the <b> tags from each keyword
    let keywordMatches = split.match(/&nbsp;&nbsp;&nbsp;&nbsp;(.*?)<br\/>/) ? split.match(/&nbsp;&nbsp;&nbsp;&nbsp;(.*?)<br\/>/) : '';
    if (keywordMatches) { 
        let keywords = keywordMatches[1].split('</b><b>').map(keyword => keyword.replace(/<b>/g, '').replace(/<\/b>/g, '').trim()); 
        bonus ? json.bonusPower.keywords = keywords : json.keywords = keywords;
    };
};

processText(splitText[0]);
if (splitText[1]) {
    let bonusName = splitText[1].match(/<\/span>(.*?)<\/h1>/)[1];
    json.bonusPower.name = bonusName.replace(/<b>/g, '').replace(/<\/b>/g, '').trim();
    processText(splitText[1], true);
};

    // create properties for the json object
    // the key is found in the text between <b> and </b> tags that are followed by a colon
    // the value is found in the text after the colon and before the next </p> tag

    
    let matchesOne = splitText[0].match(/<b>([\w\(\) ]*?)<\/b>: (.*?)<\/p>/g);
    let matchesTwo = [];

    if (splitText[1]) {
        matchesTwo = splitText[1].match(/<b>([\w\(\) ]*?)<\/b>: (.*?)<\/p>/g);
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

            if (/[Hh]it.*?/.test(key) || /[Mm]iss.*?/.test(key)) {
                key = 'on' + key.trim().charAt(0).toUpperCase() + key.slice(1);;
            };

            if (secondary && (/onHit.*?/.test(key) || /onMiss.*?/.test(key) || key === 'Effect')) {
                key = 'secondary' + key.charAt(0).toUpperCase() + key.slice(1);
            };

            if (key !== 'secondaryAttack' && !/onHit.*?/.test(key) && !/onMiss.*?/.test(key)
             && !/secondaryOnHit.*?/.test(key) && !/secondaryOnMiss.*?/.test(key)) {
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
                key = 'attack';
            }

            if (key === 'Secondary Attack') {
                secondary = true;
                key = 'secondaryAttack';
            };

            if (/[Hh]it.*?/.test(key) || /[Mm]iss.*?/.test(key)) {
                key = 'on' + key.trim().charAt(0).toUpperCase() + key.slice(1);;
            };

            if (secondary && (/onHit.*?/.test(key) || /onMiss.*?/.test(key) || key === 'Effect')) {
                key = 'secondary' + key.charAt(0).toUpperCase() + key.slice(1);
            };

            if (key !== 'secondaryAttack' && !/onHit.*?/.test(key) && !/onMiss.*?/.test(key)
             && !/secondaryOnHit.*?/.test(key) && !/secondaryOnMiss.*?/.test(key)) {
                let keys = key.split(' ');
                // capitalize the first letter of each word except for the first word
                key = keys[0].toLowerCase() + keys.slice(1).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
             }
            let value = match.match(/: (.*?)<\/p>/)[1];
            json.bonusPower[key] = value.trim();
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
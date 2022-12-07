import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let file = fs.readFileSync(__dirname + '/../../sql/ddiFeat.sql', 'utf8');

//a regex to get all the lines that values between "VALUES (" and ");"
let regex = /VALUES \((.*?)\);/g;

//store regex matches in an array
let matches = file.match(regex);

let jsonTemplate = {
    "id": 0,
    "name": "",
    "tier": "",
    "ref": "",
    "teaserText": "",
    "fullText": "",
}

console.log(matches[0])

// convert matches to json array matching the template
let json = matches.map((match, index) => {
    let values = match.replace(/VALUES \(/, '').replace(/\);/, '').split("','");
    let json = Object.assign({}, jsonTemplate);
    json.id = values[0];
    json.name = values[1];
    json.tier = values[5];
    json.sort = values[6];
    // remover double slashes from ref
    json.ref = values[4].replace(/\\/g, '');

    //remove everything after </html> tag
    json.fullText = values[8].replace(/<\/html>.*$/, '</html>');
    
    return json;
});

// save json to file
fs.writeFileSync(__dirname + '/../../sql/ddiFeats.json', JSON.stringify(json, null, 2), 'utf8');

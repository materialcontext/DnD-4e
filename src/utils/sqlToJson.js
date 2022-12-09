import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let file = fs.readFileSync(__dirname + '/../data/ddiPower.sql', 'utf8');

//a regex to get all the lines that values between "VALUES (" and ");"
let regex = /VALUES \((.*?)\);/g;

//store regex matches in an array
let matches = file.match(regex);

let jsonTemplate = {
    "id": 0,
    "name": "",
    "size": "",
    "description": "",
    "ref": "",
    "fullText": "",
}

let fileNames = [];
let json = Object.assign({}, jsonTemplate);


let addToObject = (values) => {
    let target = values[7];
    json[target].id = values[0];
    json[target].powerName = values[1];
    json[target].powerLevel = values[2];
    json[target].actionCost = values[3];
    // remover double slashes from ref
    json[target].sourceRef = values[6].replace(/\\/g, '');
    json[target].powerClass = values[7];
    json[target].powerType = values[10];
    json[target].powerFreq = values[11];

    //remove everything after </html> tag
    json[target].fullText = values[9].replace(/<\/html>.*$/, '</html>');
};

for (let match of matches) {
    let values = match.replace(/VALUES \(/, '').replace(/\);/, '').split("','");
    if (fileNames.includes(values[7])) {
        addToObject(values);
    } else {
        fileNames.push(values[7]);
        json[values[7]] = Object.assign({}, jsonTemplate);
    }
};

// save jsons to files by power class
for (let i = 0; i < fileNames.length; i++) {
    fs.writeFileSync(__dirname + '/../data/' + fileNames[i] + '.json', JSON.stringify(json[fileNames[i]]));
}
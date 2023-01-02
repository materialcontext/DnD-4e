import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import toCamelCase from './toCamelCase.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

let file = fs.readFileSync(__dirname + '/../data/ddiTheme.sql', 'utf8');

//a regex to get all the lines that values between "VALUES (" and ");"
let regex = /VALUES \((.*?)\);\n/g;

//store regex matches in an array
let matches = file.match(regex);

let jsonTemplate = {
    "id": 0,
    "name": "",
    "sourceRef": "",
    "fullText": ""
}

let fileNames = [];
let json = {};

const addToObject = (values) => {
    let name = values[1].replace(/\//g, "~");
    json[name] = { ...jsonTemplate };
    let target = json[name];

    target.id = values[0];
    target.name = values[name];
    // remove backslashes from sourceRef
    target.sourceRef = values[2].replace(/\\/g, '');
    target.fullText = values[3];
};

let check = true;

for (let match of matches) {
    let values = match.replace(/VALUES \(/, '').replace(/\);/, '').replace(/\\'/g, "'").split("','");
    if (check) {
        check = false;
    }
    
    // if the file name is already in the array, add to the object
    if (fileNames.includes(values[1])) {
        addToObject(values);
    } else {
        // if the file name is not in the array, create a new object and add to the array
        let fileName = values[1].replace(/\//g, "~")
        fileNames.push(fileName);

        // create a new object with the power name as the key
        json[fileName] = {};
        addToObject(values);
    }
};

// save jsons to files by power class
for (let i = 0; i < fileNames.length; i++) {
    console.log(fileNames.length)
    fs.writeFileSync(__dirname + '/../data/themes/' + toCamelCase(fileNames[i]) + '.json', JSON.stringify(json[fileNames[i]]));
}
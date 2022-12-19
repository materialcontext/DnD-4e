import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

let file = fs.readFileSync(__dirname + '/../data/ddiPower.sql', 'utf8');

//a regex to get all the lines that values between "VALUES (" and ");"
let regex = /VALUES \((.*?)\);\n/g;

//store regex matches in an array
let matches = file.match(regex);

let jsonTemplate = {
    "id": 0,
    "action": "",
    "powerClass": "",
    "frequency": "",
    "level": "",
    "name": "",
    "type": "",
    "sourceRef": "",
    "fullText": "",
}

let fileNames = [];
let json = {};

const addToObject = (values) => {
    json[values[7]][values[1]] = { ...jsonTemplate };
    let target = json[values[7]][values[1]];

    target.id = values[0];
    target.name = values[1];
    target.level = values[2];
    target.action = values[3];

    // remove backslashes from sourceRef
    target.sourceRef = values[6].replace(/\\/g, '');
    target.powerClass = values[7];
    target.fullText = values[9];
    target.type = values[10];

    // remove "');\n" from powerFreq
    target.frequency = values[11].replace(/'\);\n/, '');
};

let check = true;

for (let match of matches) {
    let values = match.replace(/VALUES \(/, '').replace(/\);/, '').replace(/\\'/g, "'").split("','");
    if (check) {
        check = false;
    }
    
    // if the file name is already in the array, add to the object
    if (fileNames.includes(values[7])) {
        addToObject(values);
    } else {
        // if the file name is not in the array, create a new object and add to the array
        fileNames.push(values[7]);

        // create a new object with the power name as the key
        json[values[7]] = {};
        addToObject(values);
    }
};

// save jsons to files by power class
for (let i = 0; i < fileNames.length; i++) {
    fs.writeFileSync(__dirname + '/../data/powers/' + fileNames[i] + '.json', JSON.stringify(json[fileNames[i]]));
}
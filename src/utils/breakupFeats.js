// this program takes the fulltext of each feat and breaks it up into the appropriate fields

import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import toCamelCase from './toCamelCase.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
let source = JSON.parse(fs.readFileSync(__dirname + '/../data/feats.json', 'utf8'));
let keys = Object.keys(source);

//read the info from each feat in the feat json
keys.forEach(feat => {
    let json = source[feat];
    json.name = json.featName.replace(/\\/g, '');

    const fullText = json.fullText;
    console.log(fullText)

    //split the full text into the appropriate fields prerequisite, special, and benefit
    const textarea = fullText.match(/">(.*?)<\/p>/);
    let prerequisite = textarea[1].match(/<b>Prerequisite<\/b>: ?(.*?)<br\/>/);
    let special = textarea[1].match(/<b>Special<\/b>: ?(.*?)<br\/>/);
    let benefit = textarea[1].match(/<b>Benefit<\/b>: ?(.*?)<br\/>/);

    //add the fields to the json
    if (prerequisite) {
        json["prerequisite"] = prerequisite[1];
    };

    if (special) {
        json["special"] = special[1];
    };

    if (benefit) {
        json["benefit"] = benefit[1];
    };

    let file = toCamelCase(json.name.replace(/\\/g, ''));

    //write the json to the file
    fs.writeFileSync(__dirname + `/../data/feats/${file}.json`, JSON.stringify(json, null, 4), 'utf8');
});
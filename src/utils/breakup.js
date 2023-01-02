import fs from 'fs';
import toCamelCase from "./toCamelCase.js";
import fromCamelCase from "./fromCamelCase.js";

// breakup the full text in the paragon path files in the path folder

let directory = 'D:/nodejs_programs/DnD-4e/src/data/themes';

function breakup() {
    // load each file from the directory
    let files = fs.readdirSync(directory, 'utf8').forEach(file => {
        // read each file into a json object
        let json = JSON.parse(fs.readFileSync(directory + '/' + file, 'utf8'));
        
        // get the full text
        let fullText = json.fullText;

        let nameAndText = fullText.match(/>(.*?)<\/h1>/);
        json.name = nameAndText[1];

        let flavorText = fullText.match(/<p><i>(.*?)<\/i><\/p>/);
        if (flavorText){
            json.flavorText = flavorText[1].replace(/&quot;/g, '');
        };

        let prerequisite = fullText.match(/<p><b>Prerequisite:<\/b> (.*?)<br\/>/);
        if (prerequisite){
            json.prerequisite = prerequisite[1].replace(/&quot;/g, '');
        };

        let text = fullText.match(/(?:<\/i><\/p>|<br\/><br\/>)(.*?)<br\/>&nbsp;&nbsp;&nbsp;&nbsp;<b>/);
        if (text) {
            json.text = text[1].replace(/&quot;/g, '');
        };

        let themeFeatures = fullText.match(/<br\/>&nbsp;&nbsp;&nbsp;&nbsp;<b>.*?(?=<br\/>&nbsp;&nbsp;&nbsp;&nbsp;<b>|<p><h1)/g);
        if (themeFeatures) {
            json.themeFeatures = {};
            for (let i = 0; i < themeFeatures.length; i++) {
                let feature = themeFeatures[i].match(/<b>(.*?)<\/b>: (.*)/);
                console.log(feature[0])
                let featureName = feature[1];
                let featureText = feature[2].replace(/<br\/>/g, '');
                json.themeFeatures[featureName] = featureText.replace(/&quot;/g, '');
            };
        };
        
        // write the json object to a file
        fs.writeFileSync(directory + '/' + file, JSON.stringify(json, null, 4), 'utf8');
    });
    
}

breakup();
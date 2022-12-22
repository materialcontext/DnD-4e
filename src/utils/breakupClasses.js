// this program extends the classes json files by breaking up the fulltext into new keys and values

import fs from 'fs';
import toCamelCase from "./toCamelCase.js";

let input = fs.readFileSync('D:/nodejs_programs/DnD-4e/src/data/classes.json', 'utf8');
let json = JSON.parse(input);

function process(data) {
    let dataString = data.fullText;
    let output = {
        id: data.id,
        name: data.className,
        combatRole: data.combatRole,
        powerSource: data.powerSource,
        keyAttributes: data.keyAttributes,
        refSource: data.refSource,
        classTraits: {},
    };

    // find all the class traits inside the block quote and add them to the json under classTraits
    let traitblock = dataString.match(/<blockquote>(.*?)lockquote>/);
    let traits = traitblock[1].match(/<b>(.*?)<\/b>(.*?)<br\/>/g);
    for (let trait of traits) {
        let traitName = trait.match(/<b>(.*?)<\/b>/);
        let traitText = trait.match(/<b>.*?<\/b>(.*?)<br\/>/);
        output.classTraits[toCamelCase(traitName[1])] = traitText[1];
    };

    // find the class text and add it to the json
    let classText = dataString.match(/<\/blockquote><\/p>(.*?)<br\/><br\/><h3>/i);
    output.classText = classText[1].replace(/<br\/>/g, " ").replace(/&nbsp;/g, "").trim();

    // find the CREATING A CHARACTER section and if it exists add it to the json as tipsTxt
    let suggestions = dataString.match(/(<h3>CREATING A.*?<\/h3>.*?<br\/><br\/><h3>).*? Class Features/i);
    if (suggestions) {
        output.suggestions = {
            "overview": "",
            "suggestions": {}
        };

        let suggestionTemplate = {
            "overview": "",
            "classFeature": "",
            "suggestedFeat": "",
            "suggestedSkills": "",
            "suggestedAtWillPowers": "",
            "suggestedEncounterPowers": "",
            "suggestedDailyPowers": "",
        }

        // find the overview text and add it to the json
        let overview = suggestions[0].match(/<h3>CREATING A.*?<\/h3>(.*?)<br\/><h3>/i);
        output.suggestions["overview"] = overview[1];

        // find the suggestion blocks and add them to json with their header as the key
        let header = suggestions[0].match(/<br\/><h3>.*?<\/h3>/g);

        // get suggestion categories and text for each header and add them to the suggestions object under the header key
        for (let i = 0; i < header.length; i++) {
            let key = header[i].match(/<h3>(.*?)<\/h3>/)[1];
            output.suggestions[toCamelCase(key)] = suggestionTemplate;

            let classText = suggestions[0].match(new RegExp(`<h3>${key}<\/h3>(.*?)<br\/><h3>`, "i"));
            let overviewtext = classText[0].match(new RegExp(`<h3>${key}<\/h3>(.*?)<br\/>`, "i"));
            output.suggestions[toCamelCase(key)]["overview"] = overviewtext[1];

            let classFeature = classText[0].match(/<h3>Class Feature<\/h3>: (.*?)<br\/>/);
            if (classFeature) {
                output.suggestions[toCamelCase(key)]["classFeature"] = classFeature[1];
            }

            let suggestedFeat = classText[0].match(/<b>Suggested Feats?<\/b>: (.*?)<br\/>/);
            if (suggestedFeat) {
                output.suggestions[toCamelCase(key)]["suggestedFeat"] = suggestedFeat[1];
            }

            let suggestedSkills = classText[0].match(/<b>Suggested Skills?<\/b>: (.*?)<br\/>/);
            if (suggestedSkills) {
                output.suggestions[toCamelCase(key)]["suggestedSkills"] = suggestedSkills[1];
            }

            let suggestedAtWillPowers = classText[0].match(/<b>Suggested At-Will Powers?<\/b>: (.*?)<br\/>/);
            if (suggestedAtWillPowers) {
                output.suggestions[toCamelCase(key)]["suggestedAtWillPowers"] = suggestedAtWillPowers[1];
            }

            let suggestedEncounterPowers = classText[0].match(/<b>Suggested Encounter Powers?<\/b>: (.*?)<br\/>/);
            if (suggestedEncounterPowers) {
                output.suggestions[toCamelCase(key)]["suggestedEncounterPowers"] = suggestedEncounterPowers[1];
            }

            let suggestedDailyPowers = classText[0].match(/<b>Suggested Daily Powers?<\/b>: (.*?)<br\/>/);
            if (suggestedDailyPowers) {
                output.suggestions[toCamelCase(key)]["suggestedDailyPowers"] = suggestedDailyPowers[1];
            }
        }
    };

    // find the class features and add them to the json
    let features = dataString.match(/<h3>.* Class Features(<\/h3><br\/>.*)publishedIn/i);
    output.classFeatures = {};
    let regex = new RegExp(/(?:<br\/><br\/>|<\/p><br\/>|<\/h3><br\/>|<br\/><\/p>)<b>.*?<\/b>.*?(?=<br\/><br\/>|<br\/><p>)/, "g");
    if (features) {
        let matches = features[0].match(regex);
        for (let match of matches) {
            let featureName = match.match(/<b>(.*?)<\/b>/);
            let featureText = match.match(/<\/b><br\/>(.*)/) || "error";
            output.classFeatures[toCamelCase(featureName[1])] = featureText[1].replace(/<br\/>/g, " ").trim();
        }
    }
    return output;
}

for (let item of json) {
    let output = process(item);
    let fileName = toCamelCase(output.name);
    fs.writeFileSync(`D:/nodejs_programs/DnD-4e/src/data/classes/${fileName}.json`, JSON.stringify(output, null, 2), "utf8");
}
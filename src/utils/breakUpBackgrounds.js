// this file finds missing pieces of backgrounds in their full text and adds them to the source json file
// it is not a complete program, but it is a useful tool

import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

//read the info from each background file in the backgroudns folder
fs.readdirSync(__dirname + '/../data/backgrounds/').forEach(file => {
    const background = JSON.parse(fs.readFileSync(__dirname + '/../data/backgrounds/' + file, 'utf8'));
    const fullText = background.fullText;

    if (background.skills === "\\n      ") { delete background.skills };
    
    let previewText = fullText.match(/<p><i>(.*?)<\/i><\/p>/);
    if (previewText) { background.previewText = previewText[1] };

    let benefit = fullText.match(/<i>Benefit: ?<\/i>(.*?)<br\/><p/);
    if (benefit) { background.benefit = benefit[1] };

    let flavor = fullText.match(/<br\/><\/p>(.*?)(?:&nbsp;&nbsp;&nbsp;&nbsp;(Good.*)?<i>|<br\/><p class)/);
    if (flavor) {
        console.log(flavor[1])
        background.flavor = flavor[1].replace(/<br\/>/g, "");
    };

    let name = file.charAt(0).toUpperCase() + file.slice(1).replace(/\.json/, "").replace(/([A-Z])/g, " $1").replace(/-(?=[A-Z ])/, " -");
    background.name = name;

    let prerequisites = fullText.match(/<b>Prerequisites: ?<\/b>(.*?)<br\/>/);
    if (prerequisites) { background.prerequisites = prerequisites[1] };

    //write
    fs.writeFileSync(__dirname + '/../data/backgrounds/' + file, JSON.stringify(background, null, 2));
});

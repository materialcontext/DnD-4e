import fs from "fs";

const featData = JSON.parse(fs.readFileSync("src/data/feats.json", "utf8"));

//filter data into an array of 4 array groups by sort
const featGroups = featData.reduce((acc, feat) => {
  const group = feat.sort;
  acc[group] = acc[group] || [];
  acc[group].push(feat);
  return acc;
}, []);

console.log(featGroups[0][0]);
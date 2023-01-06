// get a given file from the data folder
import fs from 'node:fs'
import path from 'node:path'

export default function getFile(folder, name) {
  const __dirname = path.resolve(path.dirname(''), 'data');
  const file = fs.readFileSync(`${__dirname}/${folder}/${name}`, 'utf8')
  return file;
};
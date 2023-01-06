import fs from 'node:fs'
import path from 'node:path'

export default function getFileNames(name) {
  const __dirname = path.resolve(path.dirname(''), 'data');
  const files = fs.readdirSync(__dirname + '/' + name)
    return files;
};
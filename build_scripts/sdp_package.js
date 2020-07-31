const fs = require('fs');
const path = require('path');

fs.createReadStream(path.join(__dirname, '../', 'package.json')).pipe(fs.createWriteStream(path.join(__dirname, '../dist', 'package.json')));
fs.createReadStream(path.join(__dirname, '../', 'package-lock.json')).pipe(fs.createWriteStream(path.join(__dirname, '../dist', 'package-lock.json')));

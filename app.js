const fs = require('fs');
const path = require('path');

const verifyExistence = (route)  => fs.existsSync(route); 

const verifyExtension = (route) => path.extname(route) === '.md';

const isFile = (route) => fs.statSync(route).isFile()

const isDirectory = (route) => fs.lstatSync(route).isDirectory()



exports.verifyExtension = verifyExtension;
exports.verifyExistence = verifyExistence;
exports.isFile = isFile;
exports.isDirectory = isDirectory;
  


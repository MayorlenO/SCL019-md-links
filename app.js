const fs = require('fs');
const path = require('path');

const verifyExistence = (resp)  => fs.existsSync(resp); 

const verifyExtension = (resp) => path.extname(resp) === '.md';

const isFile = (resp) => fs.statSync(resp).isFile()

const isDirectory = (resp) => fs.lstatSync(resp).isDirectory()


exports.verifyExtension = verifyExtension;
exports.verifyExistence = verifyExistence;
exports.isFile = isFile;
exports.isDirectory = isDirectory;
  


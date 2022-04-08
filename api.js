const fs = require('fs');
const path = require('path');


const verifyExistence = (ruta)  => fs.existsSync(ruta); 

const verifyExtension = (ruta) => path.extname(ruta) === '.md';

const isFile = (ruta) => fs.statSync(ruta).isFile()

const isDirectory = (ruta) => fs.lstatSync(ruta).isDirectory()

const readFile = (file) => fs.readFileSync(ruta, "utf-8");
  



exports.verifyExtension = verifyExtension;
exports.verifyExistence = verifyExistence;
exports.isFile = isFile;
exports.isDirectory = isDirectory;
exports.readFile = readFile;

  


const fs = require('fs');
const path = require('path');


const verifyExistence = (ruta)  => fs.existsSync(ruta); 

const verifyExtension = (ruta) => path.extname(ruta) === '.md';

const isFile = (ruta) => fs.statSync(ruta).isFile()

const isDirectory = (ruta) => fs.lstatSync(ruta).isDirectory()

const readFile = (ruta) => fs.readFileSync(ruta, "utf-8");

const linksMd = (file, files) => {
    const line = file.split('\n');// separa en lineas el documento
    let arrayLinks = [];
    for ( let i=0; line.length > i; i++) {
      const lineI = line[i];
      const reguExpress = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; // expresión regular que muestra el texto y los links
      const matchLinks = lineI.matchAll(reguExpress);// busca coincidencias
      const testMatch = reguExpress.test(lineI); // true o false
      if(testMatch) {
        for(const match of matchLinks) {
          var objMd = {
            href: match[2],
            text: match[1],
            file: files,
            line: i + 1,
          }
        }arrayLinks.push(objMd);
      }
    }return arrayLinks;
  };
  const dirOMd = (routeTotal, totalLinks) => {
    if(isDirectory( routeTotal)) {
      readFolder(routeTotal, totalLinks);
    }else if(verifyExtension(routeTotal)) {
      readFile(routeTotal, totalLinks);
    }
  };
  
  

const validateOpt = (arrayLinks) => {
    const statusLink = arrayLinks.map((obj) =>
      fetch(obj.href)
      .then((res) => {
        if (res.status === 200) {
          return {
            href: obj.href,
            text: obj.text,
            file: obj.file,
            status: res.status,
            statusText: 'ok',
          };
        } else {
          return {
            href: obj.href,
            text: obj.text,
            file: obj.file,
            status: res.status,
            statusText: 'Fail',
          };
        }
      })
      .catch((err) =>
        ({
          href: obj.href,
          text: obj.text,
          file: obj.file,
          status: 404,
          statusText: 'Fail',
        }),
      ));
    return Promise.all(statusLink);
  };
  



exports.verifyExtension = verifyExtension;
exports.verifyExistence = verifyExistence;
exports.isFile = isFile;
exports.isDirectory = isDirectory;
exports.readFile = readFile;
exports.validateOpt = validateOpt;
exports.linksMd = linksMd;
exports.dirOMd = dirOMd;

  


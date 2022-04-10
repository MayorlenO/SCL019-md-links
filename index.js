import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';


export const verifyExistence = (ruta)  => fs.existsSync(ruta); 

export const verifyExtension = (ruta) => path.extname(ruta) === '.md';

export const isFile = (ruta) => fs.statSync(ruta).isFile()

export const isDirectory = (ruta) => fs.lstatSync(ruta).isDirectory()

export const linksMd = (file, files) => {
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

  export const readFile = (files, mdLinks) => {
    const file = fs.readFileSync(files, 'utf8');//lee el archivo y lo devuelve
    mdLinks.push(...linksMd(file, files)); // spread operator
};

  export const dirOMd = (routeTotal, totalLinks) => {
    if(isDirectory( routeTotal)) {
      readFolder(routeTotal, totalLinks);
    }else if(verifyExtension(routeTotal)) {
      readFile(routeTotal, totalLinks);
    }
  };
  
  

export const validateOpt = (arrayLinks) => {
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
  





  


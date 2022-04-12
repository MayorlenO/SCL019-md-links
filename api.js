import fs from 'fs'
import fetch from 'node-fetch'
import {verifyExistence, verifyExtension, isAbsolute, transfAbsolute, isDirectory   
    } from "./index.js";
import chalk from "chalk";
import { exit } from "process";

  const takeLinks = ruta => {
    if(verifyExistence(ruta))&& isAbsolute(ruta)){
      const linksArray = isDirectory(ruta)
      let arrayMd = verifyExtension(linksArray)
      return arrayMd
    
    } else {
      route = transfAbsolute(route)
      // const linksArray = isDirectory(ruta)
      // let arrayMd = verifyExtension(linksArray)
      // return arrayMd
    
    } else {
      throw new Error('El archivo no existe')
    }
      }

    
  



   export  const mdLinks = (files, options = { validate: false }) => {
      return new Promise((resolve, reject) => {
        let totalLinks = [];
        md(files, totalLinks);
        if (totalLinks.length > 0) {
          if (!options.validate) {
            resolve(validateOpt(totalLinks)).then((r) => console.log(r));
          }  else if (options.validate === false && options.stats === true) {
            resolve(statsArray(totalMdLinks));
        } else if (options.validate === true && options.stats === true) {
          console.log('verificando' + options)
            validateStats(totalMdLinks)
            .then(r=>console.log(r))
        } else {
          reject(new Error("No se ha encontrado ningún link. Pruebe con otro archivo:"));
        }
       }
      }).catch((err) => { err});
      
    };
    
         

 

import fs from 'fs'
import fetch from 'node-fetch'
import { verifyExistence, isAbsolutePath, convertToAbsolute, isDirectory, verifyExtension } from './index.js'

const expReg = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g
const urlExp = /\((http|https|ftp|ftps).+?\)/g
const urlText = /\[((.+?))\]/g

const verifyLinks = route => {
  if (verifyExistence(route)) {
    if (isAbsolutePath(route)) {
      const arrayPath = isDirectory(route)
      let result = verifyExtension(arrayPath)
      return result
    } else {
      route = convertToAbsolute(route)
      const arrayDir = isDirectory(route)
      let result = verifyExtension(arrayRoute)
      return result
    }
  } else {
    throw new Error('No existe')
  }
}


  //  export  const mdLinks = (files, options = { validate: false }) => {
  //     return new Promise((resolve, reject) => {
  //       let totalLinks = [];
  //       md(files, totalLinks);
  //       if (totalLinks.length > 0) {
  //         if (!options.validate) {
  //           resolve(validateOpt(totalLinks)).then((r) => console.log(r));
  //         }  else if (options.validate === false && options.stats === true) {
  //           resolve(statsArray(totalMdLinks));
  //       } else if (options.validate === true && options.stats === true) {
  //           validateStats(totalMdLinks)
  //           .then(r=>console.log(r))
  //       } else {
  //         reject(new Error("No se ha encontrado ningún link. Pruebe con otro archivo:"));
  //       }
  //      }
  //     }).catch((err) => { err});
      
  //   };
    
         

 

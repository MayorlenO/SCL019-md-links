const fs = require('fs');
const path = require('path');
const  resolve  = require('path');
const fetch = require ('node-fetch');
const marked = require ('marked');

const verifyExistence = (ruta)  => fs.existsSync(ruta); 

const verifyExtension = (ruta) => path.extname(ruta) === '.md';

const isFile = (ruta) => fs.statSync(ruta).isFile()

const isDirectory = (ruta) => fs.lstatSync(ruta).isDirectory()

const readFile = (ruta) => {
     new Promise((resolve, reject) => {
     fs.readFile(ruta, 'utf-8', (err, data) => {
      const ext = ruta.extname(ruta);
      if(ext !=='.md') {
        reject(new Error('Este archivo no es .md') );
      };
      const links = [];
      const renderer = new marked.Renderer();
      renderer.link = (href) => {
        if(!href.startsWith('#')){
          fs.links.push({
            text: href,
            href: href,
            type: 'link',
            file: ruta,
          });
        };
      };
      renderer.image = function(href) {
        if(!href.startsWith('#')){
          href = href.replace(/ =\d*%?x\d*%?$/,'');
          links.push({
            href:href,
            text:href,
            type:'image',
            file: ruta,
          });
        };
      };
      marked(data,{renderer: renderer});
      if(links.length === 0) {
        reject(new Error('No se han encontrado links'));
      }
      resolve(links)
     });   
    });
  };
  const validate = (links) =>{
     new Promise.all(link.map((link) => {
      fetch(link.href)
      .then((res) => {
        if(res.status > 400){
          link.status = res.status;
          link.response = 'fail';
          resolve(link);
        }else{
          link.status = res.status;
          link.response = res.statusText;
          resolve(link);
        }
      })
      .catch((err) => {
        link.status = null;
        link.response = 'fail';
        resolve(link);
      })
     }))
   
   }
 
 const mdLinks = (path, option) => {
    new Promise((resolve, reject) => {
     if (option[0] !== '--validate') {
       readFile(path)
           .then((links) => {
             resolve(links);
           })
           .catch((err) => {
             reject(err);
           });
     } else if (option[0] === '--validate') {
       readFileData(path)
           .then((links) => {
             validate(links)
                 .then((res) => {
                   resolve(res);
                 });
           });
         } else {
           reject(err);
         };
       });
     };


exports.verifyExtension = verifyExtension;
exports.verifyExistence = verifyExistence;
exports.isFile = isFile;
exports.isDirectory = isDirectory;
exports.mdLinks = mdLinks;
exports.validate = validate;
exports.readFile = readFile;
  


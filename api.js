import path from 'path';
import fs from 'fs';
import { exit } from 'process';
import {verifyExistence, verifyExtension, isFile, isDirectory, readFile, dirOMd, validateOpt} from './index.js';
import util from 'util'


// let mdLinks = (ruta, options = {validate:false}) =>{

let route = '';

process.stdout.write('Ingrese la ruta del archivo / directorio que desea revisar:\n');

process.stdin.on('data', function(data){
route = data.toString().trim();
process.stdout.write(`Verificando ruta: ${route} \n`); 

const ruta = path.resolve(route)
if(verifyExistence(route) && isFile(route)){
  process.stdout.write('El archivo existe!\n')
  process.stdout.write('Transformando la ruta a absoluta:\n')
  process.stdout.write(ruta + '\n')
}else if(!verifyExistence(route)){
  process.stdout.write('El archivo o directorio no existe. Verifique y Vuelva a iniciar la librería')
  exit();
};

 if(verifyExistence(route) && isDirectory(route)){
  process.stdout.write('El directorio existe \n');
  process.stdout.write('Transformando la ruta a absoluta: \n')
  process.stdout.write(ruta +'\n')
  process.stdout.write('Los archivos del directorio son: \n')

    
    let dirData = new Array();
    dirData = fs.readdirSync(ruta);
     console.log(dirData);
     process.stdout.write(' \n Y se han encontrado estos archivos .md \n')
    
     
     const filesMd = [];      
     for (let i = 0; i < dirData.length; i++) {
        if (dirData[i].endsWith(".md")) {
        filesMd.push(dirData[i])


        
      }
     }

            
    console.log(filesMd);
    process.stdout.write('\n');
    process.stdout.write('Ingrese la ruta del archivo que desea revisar \n')
 };
 
if(isFile(ruta) && verifyExtension(ruta)){
   process.stdout.write('La extensión del archivo es .md \n');

   const readFileContent = util.promisify(fs.readFile)
   readFileContent(ruta)

.then(buff => {
  const contents = buff.toString()
  console.log(`\nContenido :\n${contents}`)
})

  
.catch(err => {
   console.log(`Error occurs, Error code -> ${err.code}, 
   Error No -> ${err.errno}`);
});

     const linksMd = (files, options = {validate: false}) => {
      return new Promise((resolve, reject) => {
        let totalLinks = [];
        dirOMd(files, totalLinks);
        if (totalLinks.length > 0) {
          if (!options.validate ) {
              resolve(validateOpt(totalLinks))
              .then(r=>console.log(r))
     }
    
    }else {
          reject(new Error('No se ha encontrado ningún link'));
      }
    
      }).catch((err) => { console.log('Este es el '+ err)});
    };
  
      linksMd(ruta,{ validate: false}).then((results)=> {
          console.log(results);
      })
      
  } else if (isFile(ruta) && !verifyExtension(ruta)){
    process.stdout.write('El archivo no es MD!');
     exit();
     }
    
     });
    
    
 

//  module.export = mdLinks;

  
// module.exports = () => {
//   // ...
// };

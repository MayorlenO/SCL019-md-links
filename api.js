const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const colors = require('colors/safe');
const index = require('./index.js');
const util = require('util')


// let mdLinks = (ruta, options = {validate:false}) =>{

let route = '';
const exist = index.verifyExistence;
const verify = index.verifyExtension;
const verifIsFile = index.isFile;
const verifIsDirectory = index.isDirectory;
const validOpt = index.validateOpt;
const dirOMd = index.dirOMd



process.stdout.write(colors.green('Ingrese la ruta del archivo / directorio que desea revisar:\n'));

process.stdin.on('data', function(data){
route = data.toString().trim();
process.stdout.write(colors.green(`Verificando ruta: ${route} \n`)); 

const ruta = path.resolve(route)
if(exist(route) && verifIsFile(route)){
  process.stdout.write(colors.bgWhite(colors.black('El archivo existe!\n')));
  process.stdout.write(colors.green('Transformando la ruta a absoluta:\n'))
  process.stdout.write(colors.bgMagenta(colors.black(ruta + '\n')))
}else if(!exist(route)){
  process.stdout.write(colors.red('El archivo o directorio no existe. Verifique y Vuelva a iniciar la librería'))
  exit();
};

 if(exist(route) && verifIsDirectory(route)){
  process.stdout.write(colors.bgWhite(colors.black('El directorio existe \n')));
  process.stdout.write(colors.green('Transformando la ruta a absoluta: \n'))
  process.stdout.write(colors.bgMagenta(colors.black(ruta +'\n')))
  process.stdout.write(colors.green('Los archivos del directorio son: \n'))

    
    let dirData = new Array();
    dirData = fs.readdirSync(ruta);
     console.log(dirData);
     process.stdout.write(colors.green(' \n Y se han encontrado estos archivos .md \n'));
    
     
     const filesMd = [];      
     for (let i = 0; i < dirData.length; i++) {
        if (dirData[i].endsWith(".md")) {
        filesMd.push(dirData[i])


        
      }
     }

            
    console.log(colors.bgRed(colors.white(filesMd)));
    process.stdout.write('\n');
    process.stdout.write('Ingrese la ruta del archivo que desea revisar \n')
 };
 
if(verifIsFile(ruta) && verify(ruta)){
   process.stdout.write(colors.green('La extensión del archivo es .md \n'));

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

     const mdLinks = (files, options = {validate: false}) => {
      return new Promise((resolve, reject) => {
        let totalLinks = [];
        dirOMd(files, totalLinks);
        if (totalLinks.length > 0) {
          if (!options.validate ) {
              resolve(validOpt(totalLinks))
              .then(r=>console.log(r))
     }
    
    }else {
          reject(new Error('No se ha encontrado ningún link'));
      }
    
      }).catch((err) => { console.log('Este es el '+ err)});
    };
  
      mdLinks(ruta,{ validate: false}).then((results)=> {
          console.log(results);
      })
      
  } else if (verifIsFile(ruta) && !verify(ruta)){
    process.stdout.write(colors.red('El archivo no es MD!'));
     exit();
     }
    
     });
    
    
 

//  module.export = mdLinks;

  
// module.exports = () => {
//   // ...
// };

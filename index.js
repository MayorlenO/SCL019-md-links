const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const colors = require('colors/safe');
const app = require('./app.js');


let route = '';
const ruta = path.resolve(route)
const exist = app.verifyExistence;
const verify = app.verifyExtension;
const verifIsFile = app.isFile;
const verifIsDirectory = app.isDirectory;


process.stdout.write(colors.green('Ingrese la ruta del archivo / directorio que desea revisar:\n'));

process.stdin.on('data', function(data){
route = data.toString().trim();
process.stdout.write(colors.green(`Verificando ruta: ${route} \n`)); 


if(exist(route) && verifIsFile(route)){
  process.stdout.write(colors.bgWhite(colors.black('El archivo existe!\n')));
  process.stdout.write(colors.green('Transformando la ruta a absoluta:\n'))
  process.stdout.write(colors.bgMagenta(colors.black(ruta + '\n')))
}else if(!exist(route)){
  process.stdout.write(colors.red('El archivo o directorio no existe. Verifique y uelva a iniciar la librería'))
  exit();
};

 if(exist(route) && verifIsDirectory(route)){
  process.stdout.write(colors.bgWhite(colors.black('El directorio existe \n')));
  process.stdout.write(colors.green('Transformando la ruta a absoluta: \n'))
  process.stdout.write(colors.bgMagenta(colors.black(ruta +'\n')))
  process.stdout.write(colors.green('¿Desea revisar archivos .md dentro del directorio? (Y/N): \n'))
 };

if(verifIsFile(route) && verify(route)){
   process.stdout.write(colors.green('La extensión del archivo es .md, ¿Desea revisar sus links? (Y/N)'));
  } else if (verifIsFile(route) && !verify(route)){
    process.stdout.write(colors.red('El archivo no es MD!'));
     exit();
  }


 });











  
  




  





// module.exports = () => {
//   // ...
// };

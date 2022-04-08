const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const colors = require('colors/safe');
const app = require('./api.js');


let route = '';
const exist = app.verifyExistence;
const verify = app.verifyExtension;
const verifIsFile = app.isFile;
const verifIsDirectory = app.isDirectory;



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
     process.stdout.write('\n');
     process.stdout.write(colors.green('Y se han encontrado estos archivos .md \n'));
    
     
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

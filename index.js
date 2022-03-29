const fs = require('fs');
const path = require('path');
const { exit } = require('process');

let route;
process.stdout.write('Ingrese la ruta del archivo que desea revisar:\n');

process.stdin.on('data', function(data){
  route = data.toString().trim();
  process.stdout.write(`Verificando existencia!: ${route} \n`); 


if(fs.existsSync(route) && path.extname(route) === '.md'){
  console.log('El archivo existe y su extensión es md');
  }else{
     console.log('El archivo no existe y/o su extensión no es MD!');
     exit();
  }
});

  
  
//trim: quita el salto de línea



  





// module.exports = () => {
//   // ...
// };

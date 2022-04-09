const fs = require('fs');
const path = require('path');
const { exit } = require('process');
const colors = require('colors/safe');
const api = require('./api.js');
const util = require('util')
const markdownLinkExtractor = require('markdown-link-extractor');

// let mdLinks = (ruta, options = {validate:false}) =>{

let route = '';
const exist = api.verifyExistence;
const verify = api.verifyExtension;
const verifIsFile = api.isFile;
const verifIsDirectory = api.isDirectory;



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
 
if(verifIsFile(route) && verify(route)){
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

     const links = markdownLinkExtractor(ruta)   
     let arrayFetch = []; 
     for(let i=0; i < links.length; i++){
      const text = links[i].text;
      const url= links[i]; 

      let linkFetch = fetch(links[i])
        .then(res=>{
        if(ruta === '--validate'){
            let infoLinks = {
                link:res.url,
                texto: text,
                ruta: ruta,
                status:res.status,
                statusText: res.statusText  
              };
              console.log(infoLinks)
              return infoLinks;
          }else{
              let infoLinks = {
                  links:res.url,
                  texto: text,
                  ruta: ruta
              }
              console.log(infoLinks);
              return infoLinks;
              
          }    
          })
          .catch(error =>{
            let fail = {
                urlLink: url,
                satusLink:error,
            }
            return fail;   
        })
        arrayFetch.push(linkFetch);
        console.log(arrayFetch)
        
        
    }
    
    return Promise.all(arrayFetch);
    
    
       
     
      
     } else if (verifIsFile(route) && !verify(route)){
    process.stdout.write(colors.red('El archivo no es MD!'));
     exit();
     }

     });
    
    
 

//  module.export = mdLinks;

  
// module.exports = () => {
//   // ...
// };

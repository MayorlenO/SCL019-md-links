import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

const __dirname = path.resolve('')

//Funciones de verificación
export const verifyExistence = (route)  => fs.existsSync(route);

export const isAbsolute = (route) => path.isAbsolute(route)

export const trasnfAbsolute = route => path.join(__dirname, route)


export const isFile = (ruta) => {
  const stat = fs.statSync(ruta)
  const result = stat.isFile()
  return result
}

export const isDirectory = (ruta) =>{
  let arrayOfFiles = []
  if(isFile(route)){
    arrayOfFiles.push(route)
  }else{
    const isDirectory = fs.readdirSync(route)
    readDirectory.forEach(file => {
      const fileRoute = path.join(route, file)
      arrayOfFiles.push(fileRoute)
    })
  }
  return arrayOfFiles
} 

export const verifyExtension = arrayOfFiles =>{
  return arrayOfFiles.filter(file => {
    return path.extname(file) === '.md'
  })
}
    
//     for ( let i=0; line.length > i; i++) {
//       const lineI = line[i];
//       const reguExpress = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; 
//       const matchLinks = lineI.matchAll(reguExpress);
//       const testMatch = reguExpress.test(lineI);  


//       if(testMatch) {
//         for(const match of matchLinks) {
//           var objectLink = {
//             href: match[2],
//             text: match[1],
//             file: files,
//             line: i + 1,
//           }
//         }linksArray.push(objectLink);
//       }
//      console.log('\n' + 'Se encontró '+ linksArray.length +' link(s) en el archivo .md')
//     }return linksArray;
//     }
  

//   export const readFile = (files, mdLinks) => {
//     const file = fs.readFileSync(files, 'utf8');//lee el archivo y lo devuelve
//     mdLinks.push(...linksMd(file, files)); // spread operator
// };

//   export const md = (routeTotal, totalLinks) => {
//     if(verifyExtension(routeTotal)) {
//       readFile(routeTotal, totalLinks);
//     }
//   };
  
//   export const validateOpt = (linksArray) => {
//     const statusLink = linksArray.map((obj) =>
//       fetch(obj.href)
//       .then((res) => {
//         if (res.status === 200) {
//           return {
//             href: obj.href,
//             text: obj.text,
//             file: obj.file,
//             status: res.status,
//             statusText: 'Ok',
//           };
//         } else {
//           return {
//             href: obj.href,
//             text: obj.text,
//             file: obj.file,
//             status: res.status,
//             textStatus: 'Fail',
//           };
          
//         }
//       })
//       .catch((err) =>
//         ({
//           href: obj.href,
//           text: obj.text,
//           file: obj.file,
//           status: 404,
//           textStatus: 'Fail',
//         }),
//       ));
//     return Promise.all(statusLink);
//   };
  

import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';


const __dirname = path.resolve('')

export const verifyExistence = (ruta)  => fs.existsSync(ruta); 

export const isAbsolutePath = route => path.isAbsolute(route)

export const convertToAbsolute = route => path.join(__dirname, route)


export const isFile = route => {
  const stat = fs.lstatSync(route)
  const result = stat.isFile()
  return result
}

export const isDirectory = route => {
  let arrayFiles = []
  if (isFilePath(route)) {
    arrayFiles.push(route)
  } else {
    const readDirectory = fs.readdirSync(route)
    readDirectory.forEach(file => {
      const pathFile = path.join(route, file)
      arrayFiles.push(pathFile)
    })
  }
  return arrayFiles
}

export const verifyExtension = arrayFiles => {
  return arrayFiles.filter(file => {
    return path.extname(file) === '.md'
  })
}

// export const linksMd = (file, files) => {
//     const line = file.split('\n');// separa en lineas el documento
//     let linksArray = [];
    
//     for ( let i=0; line.length > i; i++) {
//       const lineI = line[i];
//       const reguExpress = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; // expresión regular que muestra el texto y los links
//       const matchLinks = lineI.matchAll(reguExpress);// busca coincidencias
//       const testMatch = reguExpress.test(lineI); // true o false
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
//             statusText: 'Fail',
//           };
          
//         }
//       })
//       .catch((err) =>
//         ({
//           href: obj.href,
//           text: obj.text,
//           file: obj.file,
//           status: 404,
//           statusText: 'Fail',
//         }),
//       ));
//     return Promise.all(statusLink);
//   };
  
//   export const statsArray = (validOpt) => {
//     let objStats = {}
//     objStats.Total = validateOpt.length;
//     objStats.Unique = 0; 
//     const uniqueLinks = new Set(); // Objeto que permite almacenar valores únicos de cualquier tipo
//     validOpt.forEach(obj => {
//     uniqueLinks.add(obj.href);
//     });
//     objStats.Unique = uniqueLinks.size; // devuelve el número de elementos que hay en el objeto Set.
//     return objStats;
// };


// // función validar y status 
// export const validateStats = (arrayLinks) => {
//     return Promise.resolve(
// validateArray(arrayLinks)
//     .then(validatedArr=>{
//         let objeValStat = {};
//         objeValStat.Total = validatedArr.length;
//         objeValStat.Unique = 0;
//         objeValStat.Broken = 0;
//         const uniqueLinks = new Set();
//         validatedArr.forEach(obj => {
//             uniqueLinks.add(obj.href);
//             if (obj.status === 404) {
//                 objeValStat.Broken += 1;
//             }
//         });
//         objeValStat.Unique = uniqueLinks.size;
//         return objeValStat;
//     })
//     .catch(err=>console.log('Error de validación' + err)))
// }




  


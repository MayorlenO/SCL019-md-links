import path from 'path';
import fs from 'fs';
import fetch from 'node-fetch';

const __dirname = path.resolve('')

//Funciones de verificación
export const verifyExistence = (route)  => fs.existsSync(route);

export const isAbsolute = (route) => path.isAbsolute(route)

export const trasnfAbsolute = route => path.join(__dirname, route)

export const verifyExtension = (ruta) => path.extname(ruta) === '.md';

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

export const linksMd = (file, files) => {
    const line = file.split('\n');// separa en lineas el documento
    let linksArray = [];
    
    for ( let i=0; line.length > i; i++) {
      const lineI = line[i];
      const reguExpress = /\[([^\]]+)]\((https?:\/\/[^\s)]+)\)/g; 
      const matchLinks = lineI.matchAll(reguExpress);
      const testMatch = reguExpress.test(lineI);  


      if(testMatch) {
        for(const match of matchLinks) {
          var objectLink = {
            href: match[2],
            text: match[1],
            file: files,
            line: i + 1,
          }
        }linksArray.push(objectLink);
      }
     console.log('\n' + 'Se encontró '+ linksArray.length +' link(s) en el archivo .md')
    }return linksArray;
    }
  

  export const readFile = (files, mdLinks) => {
    const file = fs.readFileSync(files, 'utf8');//lee el archivo y lo devuelve
    mdLinks.push(...linksMd(file, files)); // spread operator
};

  export const md = (routeTotal, totalLinks) => {
    if(verifyExtension(routeTotal)) {
      readFile(routeTotal, totalLinks);
    }
  };
  
  export const validateOpt = (linksArray) => {
    const statusLink = linksArray.map((obj) =>
      fetch(obj.href)
      .then((res) => {
        if (res.status === 200) {
          return {
            href: obj.href,
            text: obj.text,
            file: obj.file,
            status: res.status,
            statusText: 'Ok',
          };
        } else {
          return {
            href: obj.href,
            text: obj.text,
            file: obj.file,
            status: res.status,
            textStatus: 'Fail',
          };
          
        }
      })
      .catch((err) =>
        ({
          href: obj.href,
          text: obj.text,
          file: obj.file,
          status: 404,
          textStatus: 'Fail',
        }),
      ));
    return Promise.all(statusLink);
  };
  
  export const statsArray = (validOpt) => {
    let objStats = {}
    objStats.Total = validateOpt.length;
    objStats.Unique = 0; 
    const uniqueLinks = new Set(); // Objeto que permite almacenar valores únicos de cualquier tipo
    validOpt.forEach(obj => {
    uniqueLinks.add(obj.href);
    });
    objStats.Unique = uniqueLinks.size; // devuelve el número de objos que hay en el objeto Set.
    return objStats;
};

export const uniqueLinks = arrayObject => {
  let newArray = arrayObject.map(obj => obj.href)
  const uniqueArray = [...new Set(newArray)]
  return uniqueArray.length
}

/*---------------------------Option: --stats --validate---------------------------*/
export const brokenLinks = arrayObject => {
  let brokenArray = arrayObject.filter(obj => obj.status >= 400 || obj.status == 'Error')
  brokenArray = brokenArray.map( obj => obj.href)
  return brokenArray
}
// función validar y status 
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




  


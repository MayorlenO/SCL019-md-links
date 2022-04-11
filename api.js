// import path from "path";
// import fs from "fs";
// import { exit } from "process";
import {
   md,
  validateOpt,
  statsArray,
  validateStats,
  } from "./index.js";
import chalk from "chalk";
import { exit } from "process";

// export const  mdLinks = (ruta, options = {validate:false}) =>{
// let route = "";

// process.stdout.write(
//   chalk.green("Ingrese la ruta del archivo / directorio que desea revisar:\n")
// );

// process.stdin.on("data", function (data) {
//   route = data.toString().trim();
//   process.stdout.write(chalk.yellow(`Verificando ruta: ${route} \n`));

//   const ruta = path.resolve(route);
//   if (verifyExistence(route) && isFile(route)) {
//     process.stdout.write(
//       chalk.bgWhiteBright(chalk.black("El archivo existe!\n"))
//     );
//     process.stdout.write(chalk.yellow("Transformando la ruta a absoluta:\n"));
//     process.stdout.write(ruta + "\n");
//   } else if (!verifyExistence(route)) {
//     process.stdout.write(
//       chalk.bgRedBright(
//         chalk.black(
//           "El archivo o directorio no existe ")))
//           process.stdout.write(chalk.green(' Vuelva a iniciar y pruebe con otra ruta:'))
//             exit();
//   }

//   if (verifyExistence(route) && isDirectory(route)) {
//     process.stdout.write(chalk.bgWhite(chalk.black("El directorio existe! \n")));
//     process.stdout.write("Transformando la ruta a absoluta: \n");
//     process.stdout.write(ruta + "\n");
//     process.stdout.write(chalk.green("Los archivos del directorio son: \n"));

//     let dirData = new Array();
//     dirData = fs.readdirSync(ruta);
//     console.log(dirData);
//     process.stdout.write(" \n Y se han encontrado estos archivos .md \n");

//     const filesMd = [];
//     for (let i = 0; i < dirData.length; i++) {
//       if (dirData[i].endsWith(".md")) {
//         filesMd.push(dirData[i]);
//       }
//     }

//     console.log(filesMd);
//     process.stdout.write("\n");
//     process.stdout.write("Ingrese la ruta del archivo .md que desea revisar \n");
//   }

//   if (isFile(ruta) && verifyExtension(ruta)) {
//     process.stdout.write("La extensión del archivo es .md \n");

    // const readFileContent = util.promisify(fs.readFile);
    // readFileContent(ruta);

   export  const mdLinks = (files, options = { validate: false }) => {
      return new Promise((resolve, reject) => {
        let totalLinks = [];
        md(files, totalLinks);
        if (totalLinks.length > 0) {
          if (!options.validate) {
            resolve(validateOpt(totalLinks)).then((r) => console.log(r));
          }  else if (options.validate === false && options.stats === true) {
            resolve(statsArray(totalMdLinks));
        } else if (options.validate === true && options.stats === true) {
            validateStats(totalMdLinks)
            .then(r=>console.log(r))
        } else {
          reject(new Error("No se ha encontrado ningún link. Pruebe con otro archivo:"));
        }
       }
      }).catch((err) => { err});
      
    };
    
    

    
              
                

  // } else if (isFile(ruta) && !verifyExtension(ruta)) {
  //   process.stdout.write(
  //     chalk.bgRedBright(chalk.black("El archivo no es MD!. Ingrese una ruta válida: \n"))
  //   );
    
//   }
// });
// };

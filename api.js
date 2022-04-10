import path from "path";
import fs from "fs";
import { exit } from "process";
import {
  verifyExistence,
  verifyExtension,
  isFile,
  isDirectory,
  dirOMd,
  validateOpt,
} from "./index.js";
import util from "util";
import chalk from "chalk";

// let mdLinks = (ruta, options = {validate:false}) =>{

let route = "";

process.stdout.write(
  chalk.green("Ingrese la ruta del archivo / directorio que desea revisar:\n")
);

process.stdin.on("data", function (data) {
  route = data.toString().trim();
  process.stdout.write(chalk.yellow(`Verificando ruta: ${route} \n`));

  const ruta = path.resolve(route);
  if (verifyExistence(route) && isFile(route)) {
    process.stdout.write(
      chalk.bgWhiteBright(chalk.black("El archivo existe!\n"))
    );
    process.stdout.write(chalk.yellow("Transformando la ruta a absoluta:\n"));
    process.stdout.write(ruta + "\n");
  } else if (!verifyExistence(route)) {
    process.stdout.write(
      chalk.bgRedBright(
        chalk.black(
          "El archivo o directorio no existe ")))
          process.stdout.write(chalk.green(' Vuelva a iniciar y pruebe con otra ruta:'))
            exit();
  }

  if (verifyExistence(route) && isDirectory(route)) {
    process.stdout.write(chalk.bgWhite(chalk.black("El directorio existe! \n")));
    process.stdout.write("Transformando la ruta a absoluta: \n");
    process.stdout.write(ruta + "\n");
    process.stdout.write(chalk.green("Los archivos del directorio son: \n"));

    let dirData = new Array();
    dirData = fs.readdirSync(ruta);
    console.log(chalk.bgGrey(chalk.white(dirData)));
    process.stdout.write(" \n Y se han encontrado estos archivos .md \n");

    const filesMd = [];
    for (let i = 0; i < dirData.length; i++) {
      if (dirData[i].endsWith(".md")) {
        filesMd.push(dirData[i]);
      }
    }

    console.log(chalk.bgRed(chalk.white(filesMd)));
    process.stdout.write("\n");
    process.stdout.write("Ingrese la ruta del archivo .md que desea revisar \n");
  }

  if (isFile(ruta) && verifyExtension(ruta)) {
    process.stdout.write("La extensión del archivo es .md \n");

    const readFileContent = util.promisify(fs.readFile);
    readFileContent(ruta);

    const linksMd = (files, options = { validate: false }) => {
      return new Promise((resolve, reject) => {
        let totalLinks = [];
        dirOMd(files, totalLinks);
        if (totalLinks.length > 0) {
          if (!options.validate) {
            resolve(validateOpt(totalLinks)).then((r) => console.log(r));
          }
        } else {
          reject(new Error("No se ha encontrado ningún link. Pruebe con otro archivo:"));
        }
      }).catch((err) => {
        console.log(chalk.bgRed(chalk.black(err)));
      });
    };

    linksMd(ruta, { validate: false }).then((results) => {
      console.log(results);
    });
  } else if (isFile(ruta) && !verifyExtension(ruta)) {
    process.stdout.write(
      chalk.bgRedBright(chalk.black("El archivo no es MD!. Ingrese una ruta válida: \n"))
    );
    
  }
});

//  module.export = mdLinks;

// module.exports = () => {
//   // ...
// };

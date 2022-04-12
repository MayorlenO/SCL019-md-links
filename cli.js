import { mdLinks } from './api.js'
import path, { resolve } from "path";
import fs from "fs";
import { exit } from "process";
import {
    verifyExistence,
    verifyExtension,
    isFile,
    isDirectory,
    linksMd
  } from "./index.js";
  import util from "util";
  import chalk from "chalk";
  
   
  const messageStart = () => {
    const commands = [
      {
        option: '',
        structure: 'md-links <path-to-file>',
        example: './some/example.md',
        outpout: '[{ file, href, text }]',
      },
      {
        option: '--validate',
        structure: 'md-links <path-to-file> [options]',
        example: './some/example.md --validate',
        outpout: '[{ file, href, message, status, text }]',
      },
      {
        option: '--stats',
        structure: 'md-links <path-to-file> [options]',
        example: './some/example.md --stats',
        output: '[{ total, unique }]',
      },
      {
        option: '--stats --validate',
        structure: 'md-links <path-to-file> [options]',
        example: './some/example.md --stats --validate',
        output: '[{ total, unique, broken }]',
      },
      {
        option: '--help',
        structure: '',
        example: 'md-links <path-to-file> [options]',
        output: 'Volver a mostrar las opciones',
      },
    ]
  
    console.table(
      commands.map(command => {
        return {
          Opciones: command.option,
          Ejemplo: command.example,
          Output: command.outpnodeut,
        }
      })
    )
  }
  // process.stdout.write(
  //   chalk.green("Ingrese la ruta del archivo / directorio que desea revisar:\n")
  // );
  const route = process.argv[2]
  let opt

  if (process.argv[3] && process.argv[4]) {
    opt = `${process.argv[3]} ${process.argv[4]}`
  } else {
    opt = process.argv[3]
  }
  
  // process.stdin.on("data", function (data) {
  //   route = data.toString().trim();
  //   process.stdout.write(chalk.yellow(`Verificando ruta: ${route} \n`));
  
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
  
    if (verifyExistence(ruta) && isDirectory(ruta)) {
      process.stdout.write(chalk.bgWhite(chalk.black("El directorio existe! \n")));
      process.stdout.write("Transformando la ruta a absoluta: \n");
      process.stdout.write(ruta + "\n");
      process.stdout.write(chalk.bgWhite(chalk.black("Los archivos del directorio son: \n")));
  
      let dirData = new Array();
      dirData = fs.readdirSync(ruta);
      console.log(dirData);
      process.stdout.write(chalk.bgWhite(chalk.black(" \n Y se han encontrado estos archivos .md \n")));
  
      const filesMd = [];
      for (let i = 0; i < dirData.length; i++) {
        if (dirData[i].endsWith(".md")) {
          filesMd.push(dirData[i]);
        }
      }
  
      console.log(filesMd);
      process.stdout.write("\n");
      process.stdout.write("Ingrese la ruta del archivo .md que desea revisar \n");
    }
  
    if (isFile(ruta) && verifyExtension(ruta)) {
      process.stdout.write("La extensión del archivo es .md \n");
      const readFileContent = util.promisify(fs.readFile);
      readFileContent(ruta);
      mdLinks()

    } else if (isFile(ruta) && !verifyExtension(ruta)) {
        process.stdout.write(
          chalk.bgRedBright(chalk.black("El archivo no es MD!. Ingrese una ruta válida: \n"))
        );
    }

    if (opt === undefined) {
      mdLinks(ruta, {
        validate: false,
      })
        .then(result => {
          if (result.length > 0) {
            return result.forEach(obj =>
              console.log(
                `File => ${chalk.blue(obj.file)}, Url => ${chalk.yellow(obj.href)}, Text => ${chalk.cyan(
                  obj.text
                )}`
              )
            )
          }
          
        })
        .catch(error =>(error,ruta))
    } else if (opt === '--validate') {
      mdLinks(ruta, {
        validate: true,
      })
        .then(result => {
          if (result.length > 0) {
            return result.forEach(function (obj) {
              if (obj.status >= 400 || obj.status == 'Error') {
                console.log(
                  `File => ${chalk.blue(obj.file)}, Status => ${chalk.red(
                    obj.textStatus,
                    obj.status
                  )}, Url => ${chalk.red(obj.href)},Text => ${chalk.cyan(obj.text)}`
                )
              } else {
                console.log(
                  `File => ${chalk.blue(obj.file)}, Status => ${chalk.green(
                    obj.textStatus,
                    obj.status
                  )}, Url => ${chalk.yellow(obj.href)}, Text => ${chalk.cyan(obj.text)}`
                )
              }
            })
          }
          
        })
        .catch(error => (error,ruta))
    } else if (opt === '--stats') {
        mdLinks(ruta, {
        validate: false,
      })
        .then(result => {
          
          if (result.length > 0) {
            return console.log(`Total => ${result.length} \nUnique => ${uniqueLinks(result)}`)
          }
          
        })
        .catch(error => (error,ruta))
    } else if (opt === '--stats --validate') {
      mdLinks(route, {
        validate: true,
      })
        .then(result => {
          if (result.length > 0) {
            
            return console.log(
              `Total => ${result.length} \nUnique => ${uniqueLinks(result)} \nBroken => ${brokenLinks(result).length} \nSon los siguientes:`, brokenLinks(result)
            )
          }
    
          
        })
        .catch(error => (error, ruta))
    } else if (opt === '--help') {
      messageStart()
    } else {
      console.log(chalk.bold.bgRed(`La opción ${opt} es inválida`))
      messageStart()
    }
    

// let options = {
//     validate: false,
// };

// if (
//     (ruta === '--validate' ) 
// ) {
//     options.validate = true;
// } 

// mdLinks(ruta, options)
//     .then(file => {
//     console.log(file);
//     })
//     .catch(err => console.log('error', err));
  
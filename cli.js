import { mdLinks } from './api.js'
import path from "path";
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
        outpout: '[{ total, unique }]',
      },
      {
        option: '--stats --validate',
        structure: 'md-links <path-to-file> [options]',
        example: './some/example.md --stats --validate',
        outpout: '[{ total, unique, broken }]',
      },
      {
        option: '--help',
        structure: '',
        example: 'md-links <path-to-file> [options]',
        outpout: 'Volver a mostrar las opciones',
      },
    ]

    console.table(
      commands.map(command => {
        return {
          Opciones: command.option,
          Ejemplo: command.example,
          Outpout: command.outpout,
        }
      })
    )
  }



   let route = "";
   let opt;
  
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
  })
  
  if (opt === undefined) {
    mdLinks(args, {
      validate: false,
    })
      .then(result => {
        if (result.length > 0) {
          return result.forEach(element =>
            console.log(
              `File => ${chalk.blue(element.file)}, Url => ${chalk.yellow(element.href)}, Text => ${chalk.cyan(
                element.text
              )}`
            )
          )
        }
        messageNoMd(args)
      })
      .catch(error => messageNoExist(error,args))
  } else if (opt === '--validate') {
    mdLinks(args, {
      validate: true,
    })
      .then(result => {
        if (result.length > 0) {
          return result.forEach(function (element) {
            if (element.status >= 400 || element.status == 'Error') {
              console.log(
                `File => ${chalk.blue(element.file)}, Status => ${chalk.red(
                  element.textStatus,
                  element.status
                )}, Url => ${chalk.red(element.href)},Text => ${chalk.cyan(element.text)}`
              )
            } else {
              console.log(
                `File => ${chalk.blue(element.file)}, Status => ${chalk.green(
                  element.textStatus,
                  element.status
                )}, Url => ${chalk.yellow(element.href)}, Text => ${chalk.cyan(element.text)}`
              )
            }
          })
        }
        messageNoMd(args)
      })
      .catch(error => messageNoExist(error,args))
  } else if (opt === '--stats') {
    mdLinks(args, {
      validate: true,
    })
      .then(result => {
        if (result.length > 0) {
          return console.log(`Total => ${result.length} \nUnique => ${uniqueLinks(result)}`)
        }
        messageNoMd(args)
      })
      .catch(error => messageNoExist(error,args))
  } else if (opt === '--stats --validate') {
    mdLinks(args, {
      validate: true,
    })
      .then(result => {
        if (result.length > 0) {
          
          return console.log(
            `Total => ${result.length} \nUnique => ${uniqueLinks(result)} \nBroken => ${brokenLinks(result).length} \nSon los siguientes:`, brokenLinks(result)
          )
        }
  
        messageNoMd(args)
      })
      .catch(error => messageNoExist(error, args))
  } else if (opt === '--help') {
    messageStart()
  } else {
    console.log(chalk.bold.bgRed(`La opción ${opt} es inválida`))
    messageStart()
  }
  
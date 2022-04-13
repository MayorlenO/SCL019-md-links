#! /usr/bin/env node

import process, { stdout } from 'process'
import chalk from 'chalk'
import { mdLinks, uniqueLinks, brokenLinks } from './api.js'

const startLibrary = () => {
  const commands = [
    {
      option: '',
      structure: 'md-links <path-to-file>',
      example: './some/example.md',
      output: '[{ file, href, text }]',
    },
    {
      option: '--validate',
      structure: 'md-links <path-to-file> [options]',
      example: './some/example.md --validate',
      output: '[{ file, href, message, status, text }]',
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
      structure: 'md-links <path-to-file> [options]',
      example: './some/example.md --stats --validate',
      output: '[{ total, unique, broken }]',
    },
    
  ]

  console.table(
    commands.map(command => {
      return {
        'Opciones disponibles': command.option,
        'Ejemplo de búsqueda': command.example

        
      }
    })
  )
}

const args = process.argv[2]
let userOption

const errorVerifyExistence = (error,route) => {
  process.stdout.write(chalk.red(`${error} el archivo o directorio:`))
  process.stdout.write(chalk.green(` ${route}`))
  process.exit()
}
const errorVerifyExtension = route => {
  process.stdout.write(chalk.red(`La ruta `))
  process.stdout.write(chalk.green(`${route} `))
  process.stdout.write(chalk.red(`no es o no contiene archivos .md`))
  process.exit()
}


if (process.argv[3] && process.argv[4]) {
  userOption = `${process.argv[3]} ${process.argv[4]}`
} else {
  userOption = process.argv[3]
}

//
if (userOption === undefined) {
  mdLinks(args, {
    validate: false,
  })
    .then(result => {
      if (result.length > 0) {
        return result.forEach(element =>
          process.stdout.write(
            `\nArchivo: ${chalk.blue(element.file)}\nUrl: ${chalk.yellow(element.href)}\nTexto: ${chalk.cyan(
              element.text)}\n`)
        )
      }
      errorVerifyExtension(args)
    })
    .catch(error => errorVerifyExistence(error,args))
} else if (userOption === '--validate') {
  mdLinks(args, {
    validate: true,
  })
    .then(result => {
      if (result.length > 0) {
        return result.forEach(function (element) {
          if (element.status >= 400 || element.status == 'Error') {
            process.stdout.write(
              `\nArchivo:${chalk.blue(element.file)}\nStatus: ${chalk.red(element.textStatus, element.status)}\nUrl: ${chalk.yellow(element.href)}\nText: ${chalk.cyan(element.text)}`)
          } else {
            console.log(
              `\nArchivo: ${chalk.blue(element.file)}\nStatus:${chalk.green(element.textStatus,element.status)}\nUrl: ${chalk.yellow(element.href)}\nText:${chalk.cyan(element.text)}`)
          }
        })
      }
      errorVerifyExtension(args)
    })
    .catch(error => errorVerifyExistence(error,args))
} else if (userOption === '--stats') {
  mdLinks(args, {
    validate: true,
  })
    .then(result => {
      if (result.length > 0) {
        return process.stdout.write(chalk.blue(`Total: ${result.length} \nUnique: ${uniqueLinks(result)}`))
      }
      errorVerifyExtension(args)
    })
    .catch(error => errorVerifyExistence(error,args))
} else if (userOption === '--stats --validate') {
  mdLinks(args, {
    validate: true,
  })
    .then(result => {
      if (result.length > 0) {
        
        return console.log(chalk.blue(
          `Links encontrados: ${result.length} \nUnique: ${uniqueLinks(result)} \nBroken: ${chalk.red(brokenLinks(result).length)} \nLos links rotos son:`, brokenLinks(result)
        ))
      }

      errorVerifyExtension(args)
    })
    .catch(error => errorVerifyExistence(error, args))
} else if (userOption === '--help') {
  startLibrary()
} else {
  console.log(chalk.red(`\n La opción ${userOption} no es válida. Revise los ejemplos:`))
  startLibrary()
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


// process.stdout.write(
  //   chalk.green("Ingrese la ruta del archivo / directorio que desea revisar:\n")
  // );
  
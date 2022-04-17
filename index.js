import path from 'path'
import fs from 'fs'

const __dirname = path.resolve('')

export const verifyExistence = route => fs.existsSync(route)

export const verifyAbsolute = route => path.resolve(route)

export const convertToAbsolute = route => path.join(__dirname, route)

export const isFile = route => {
  const lstat = fs.lstatSync(route)
  const result = lstat.isFile()
  return result
}
//Creo array de archivos con archivos y archivos del directorio
export const fileOrDirectory = route => {
  let arrayAllFiles = []
  if (isFile(route)) {
    arrayAllFiles.push(route)
  } else {
    const readDirectory = fs.readdirSync(route)
    readDirectory.forEach(file => {
      const foundFiles = path.join(route, file)
      arrayAllFiles.push(foundFiles)
    })
    // console.log(arrayAllFiles)
  }
  return arrayAllFiles
}

//Verifico la extensión de los archivos del array creado anteriormente
export const verifyExtension = arrayAllFiles => {
  return arrayAllFiles.filter(file => {
    // console.log(arrayAllFiles)
     return path.extname(file) === '.md'
    
  })
}


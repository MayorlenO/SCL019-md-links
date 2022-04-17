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

export const fileOrDirectory = route => {
  let arrayAllFiles = []
  if (isFile(route)) {
    arrayAllFiles.push(route)
  } else {
    const readDirectory = fs.readdirSync(route)
    readDirectory.forEach(file => {
      const pathFile = path.join(route, file)
      arrayAllFiles.push(pathFile)
    })
    // console.log(arrayAllFiles)
  }
  return arrayAllFiles
}

export const verifyExtension = arrayAllFiles => {
  return arrayAllFiles.filter(file => {
    // console.log(arrayAllFiles)
     return path.extname(file) === '.md'
    
  })
}


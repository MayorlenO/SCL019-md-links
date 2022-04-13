import path from 'path'
import fs from 'fs'

const __dirname = path.resolve('')


export const verifyExistence = route => fs.existsSync(route)

export const verifyAbsolute = route => path.resolve(route)

export const convertToAbsolute = route => path.join(__dirname, route)

export const isFile = route => {
  const stat = fs.lstatSync(route)
  const result = stat.isFile()
  return result
}

export const fileOrDirectory = route => {
  let arrayFiles = []
  if (isFile(route)) {
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


import fs from 'fs'
import fetch from 'node-fetch'
import { verifyExistence, verifyAbsolute, convertToAbsolute, fileOrDirectory, verifyExtension } from './index.js'

const expFIle = /\[((.+?))\]\((http|https|ftp|ftps).+?\)/g
const expHref = /\((http|https|ftp|ftps).+?\)/g
const expText = /\[((.+?))\]/g


const arrayMd = route => {
  if (verifyExistence(route)) {
    if (verifyAbsolute(route)) {
      const arrayRoute = fileOrDirectory(route)
      let result = verifyExtension(arrayRoute)
      return result
    } else {
      route = convertToAbsolute(route)
      const arrayRoute = fileOrDirectory(route)
      let result = verifyExtension(arrayRoute)
      return result
    }
  } else {
    throw new Error('No existe!')
  }
}

//buscar regex e cada archivo
const extractLinks = filesMd => {
  const arrayLinksMd = []
  filesMd.forEach(file => {
    const readFileMd = fs.readFileSync(file, 'utf-8')
    const linksMatch = readFileMd.match(expFIle)

    //for in para buscar  texto y url eliminando sus parentesis
    for (let i in linksMatch) {
      let textMatch = linksMatch[i].match(expText)[0]
      let urlMatch = linksMatch[i].match(expHref)[0]
      urlMatch = urlMatch.slice(1, urlMatch.length - 1)
      arrayLinksMd.push({
        href: urlMatch,
        text: textMatch.slice(1, textMatch.length - 1),
        file: filesMd
      })
    }
  })
  return arrayLinksMd
}

//validar links y mostrar status
export const linksValidate = arrayLinks => {
  const linksValidate = arrayLinks.map(element => {
    return fetch(element.href)
      .then(res => {
        let objectOfLinks = {
          href: element.href,
          file: element.file,
          text: element.text,
          status: res.status,
        }
        if (res.status >= 200 && res.status <= 399) objectOfLinks.textStatus = 'OK'
        else objectOfLinks.textStatus = res.statusText
        return objectOfLinks
      })
      .catch(() => {
        let objectOfLinks = {
          href: element.href,
          file: element.file,
          text: element.text,
          status: 'Error',
          textStatus: 'Fail',
        }
        return objectOfLinks
      })
  })

  return Promise.all(linksValidate)
}


export const mdLinks = (pathFile, option) =>
  new Promise((resolve, reject) => {
    let result
    try {
      result = arrayMd(pathFile)
    } catch (error) {
      return reject(error)
    }

    if (result.length > 0) {
      const links = extractLinks(result)

      if (option.validate === false) {
        resolve(links)
      } else {
        linksValidate(links).then(resultValidate => {
          resolve(resultValidate)
        })
      }
    } else {
      resolve(result)
    }
  })

  //--stats  crear colección
export const uniqueLinks = arrayObject => {
  let newArray = arrayObject.map(element => element.href)
  const uniqueArray = [...new Set(newArray)]
  return uniqueArray.length
}


export const brokenLinks = arrayObject => {
  let brokenArray = arrayObject.filter(element => element.status >= 400 || element.status == 'Error')
  brokenArray = brokenArray.map( element => element.href)
  return brokenArray
}
         

 

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
    throw new Error('No existe(n)!')
  }
}

//buscar regex en cada archivo
const extractLinks = filesMd => {
  const arrayLinksMd = []
  filesMd.forEach(file => {
    const readFileMd = fs.readFileSync(file, 'utf-8')
    const matchLinks = readFileMd.match(expFIle)

    //for in para buscar  texto y url eliminando sus parentesis
    for (let indice in matchLinks) {
      let matchText = matchLinks[indice].match(expText)[0]
      let matchHref = matchLinks[indice].match(expHref)[0]
      matchHref = matchHref.slice(1, matchHref.length - 1)
      arrayLinksMd.push({
        href: matchHref,
        text: matchText.slice(1, matchText.length - 1),
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
      .then(data => {
        let objectOfLinks = {
          href: element.href,
          file: element.file,
          text: element.text,
          status: data.status,
        }
        if (data.status >= 200 && data.status <= 399) objectOfLinks.textStatus = ' OK'
        else objectOfLinks.textStatus = data.statusText
        return objectOfLinks
      })
      .catch(() => {
        let objectOfLinks = {
          href: element.href,
          file: element.file,
          text: element.text,
          status: 'Error',
          textStatus: '400',
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
         

 

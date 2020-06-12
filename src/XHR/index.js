const BASE_URL = "https://rickandmortyapi.com/api/"

const COUNT_URL = `${BASE_URL}character/`
const NAME_URL = `${BASE_URL}character/`
const DIMENSION_URL = `${BASE_URL}location/1`

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest


/**
 * Version que usa onload y onerror
 */


function promiseRequest(url) {
  return new Promise((resolve, reject) => {
    const XHR = new XMLHttpRequest()
    const asynchr = true
    
    XHR.open("GET", url, asynchr)
    XHR.onload = () => resolve(JSON.parse(XHR.responseText))
    XHR.onerror = () => reject(XHR.statusText)
    XHR.send()
  })
}


/**
 * Version que usa onreadystatechange
 */

/*

function promiseRequest(url) {
  return new Promise((resolve, reject) => {
    const XHR = new XMLHttpRequest()
    const asynchr = true

    XHR.open("GET", url, asynchr)

    XHR.onreadystatechange = function (event) {
      const DONE = XHR.readyState === 4
      const REQUEST_OK = XHR.status === 200

      if (!DONE) return

      if (REQUEST_OK) {
        resolve(JSON.parse(XHR.responseText))
        return
      }

      const ERROR = new Error("La URL no es válida: " + url)
      console.error(ERROR)
      reject(XHR.statusText)
    }

    XHR.send()
  })
}

*/

function show(title, value) {
  const message = `${title}: ${value}`
  console.log(`${message}\n`)
}

Promise.all(
  [
    promiseRequest(COUNT_URL),
    promiseRequest(NAME_URL),
    promiseRequest(DIMENSION_URL),
  ]
)
  .then(function (responses) {
    show("Cantidad de personajes", responses[0].info.count)
    show("Nombre del primer personaje", responses[1].results[0].name)
    show("Dimensión del primer personaje", responses[2].dimension)
  })
  .catch((err) => console.error(err))
const BASE_URL = "https://rickandmortyapi.com/api/"

const COUNT_URL = `${BASE_URL}character/`
const NAME_URL = `${BASE_URL}character/`
const DIMENSION_URL = `${BASE_URL}location/1`

const OPTIONS = {crossDomain: true}

const AMOUNT = document.getElementById("cantidad_personajes")
const NAME = document.getElementById("nombre_primer_personaje")
const DIMENSION = document.getElementById("dimension_primer_personaje")

function promiseRequest(url) {
  return new Promise((resolve, reject) => {
    $.get(url, OPTIONS, function (data) {
      resolve(data)
    }).fail(() => reject())
  })
}

function show(title, domElement, value) {
  const message = `${title}: ${value}`

  console.log(`${message}\n`)
  domElement.textContent += " " + value
}

Promise.all([promiseRequest(COUNT_URL), promiseRequest(NAME_URL), promiseRequest(DIMENSION_URL)])
  .then(function (responses) {
    show("Cantidad de personajes", AMOUNT, responses[0].info.count)
    show("Nombre del primer personaje", NAME, responses[1].results[0].name)
    show("Dimensión del primer personaje", DIMENSION, responses[2].dimension)
  })
  .catch((err) => console.error(err))

/**
 * La alternativa a usar Promise.all es hacer una llamada completa (con sus respectivos .then y .catch) por cada end point
 */

/*

promiseRequest(COUNT_URL)
  .then(function (response) {
    show("Cantidad de personajes", AMOUNT, response.info.count)
  })
  .catch((err) => console.error(err))

promiseRequest(NAME_URL)
.then(function (response) {
  show("Nombre del primer personaje", NAME, response.results[0].name)
})
.catch((err) => console.error(err))

promiseRequest(DIMENSION_URL)
  .then(function (response) {
    show("Dimensión del primer personaje", DIMENSION, response.dimension)
  })
  .catch((err) => console.error(err))

*/

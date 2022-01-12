const axios = require("axios")

const baseUrl = 'https://pokeapi.co/api/v2/pokemon'

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const getRange = async (firstId, lastId) => {
  const promiseArray = []
  for (let id = firstId; id <= lastId; id++) {
    promiseArray.push(get(id))
  }
  const response = await Promise.all(promiseArray)
  return response
}

module.exports = { get, getRange }
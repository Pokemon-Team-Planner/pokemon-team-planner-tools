const pokemonService = require('./services/pokemon')
const { writeFile } = require('fs/promises')
const fireRedExclusives = require('./data/fireRedExclusives.json')
const leafGreenExclusives = require('./data/leafGreenExclusives.json')

async function main() {
  //Best to run these in async since PokeAPI seems to throttle parallel requests
  await exportDataRange(1, 151, fireRedExclusives, './out/firered-pokedex.json')
  await exportDataRange(1, 151, leafGreenExclusives, './out/leafgreen-pokedex.json')
}

//Run main if this file was run directly from Node.js
if (require.main === module) {
  main();
}

async function exportDataRange (firstId, lastId, arrayExclusives, filename) {
  console.log(`fetching pokemon ${firstId} to ${lastId}...`)
  const data = await pokemonService.getRange(firstId, lastId)
  console.log('pokemon data received')

  console.log('processing...')
  const dataSetExport = data.map(pokemon => {
    //Remap types array
    const types = pokemon.types.map(item => (
      {name: item.type.name}
    ))
    
    //Remap items base stats array
    const base_stats = pokemon.stats.map(item => (
      {name: item.stat.name, value: item.base_stat}
    ))
    //Calculate total of base stats
    const total_base_stats = base_stats.reduce((total, item) => {
      return item.value + total
    }, 0)
    //Add total to base stats array
    base_stats.push({name: "total", value: total_base_stats})

    //Check if pokemon is exclusive in passed array
    const isExclusive = (exclusivesArray) => {
      return exclusivesArray.find(e => e.toLowerCase() === pokemon.name.toLowerCase()) ? true : false
    }

    //Remap rest of the stuff and return
    return {id: pokemon.id, name: pokemon.name, types, sprite: pokemon.sprites.front_default, base_stats, is_exclusive: isExclusive(arrayExclusives)}
  })

  try {
    await writeFile(filename, JSON.stringify(dataSetExport, null, 2))
    console.log(`wrote to ${filename}`)
  } catch (err) {
    console.error(err)
  }
}

module.exports = { exportDataRange }
# Tools for Pokemon Team Planner

## Data exporter for PokeAPI to generate JSON Pokemon data for Pokemon games

With this little data exporter tool you can fetch a range of pokemon (e.g. 1-151) from PokeAPI, transform the data and save it as a JSON-file (see [out/firered-pokedex.json](out/firered-pokedex.json)). The only manually gathered data required is a list of exclusive pokemon in a game version (see [data/fireRedExclusives.json](data/fireRedExclusives.json)).

## Installation instructions

1. clone this project
2. run command `npm install`
3. run command `npm start`
4. (Optional) customize data export calls at [dataExporter.js](dataExporter.js):
```javascript
async function main() {
  //Best to run these in async since PokeAPI seems to throttle parallel requests
  await exportDataRange(1, 151, fireRedExclusives, './out/firered-pokedex.json')
  await exportDataRange(1, 151, leafGreenExclusives, './out/leafgreen-pokedex.json')
}
```

## Known issues (work in progress)

* Pokemon have current generation types. For example Clefairy has incorrectly Fairy type when it should have Normal type in FireRed/LeafGreen games. PokeAPI's pokemon endpoint however has `past_types` where it could be read.

* National Pokedex IDs are used so this tool works best for gen 1 and FireRed/LeafGreen games. For other games support for fetching Regional Pokedexes would be required.
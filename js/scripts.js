let pokemonList = [];
pokemonList = [
  {
    name: 'Bulbasaur', 
    height: 7,
    types: ['grass', 'poison']
  },
  {
    name: 'Charmander', 
    height: 6,
    types: ['fire']
  },
  {
    name: 'Squirtle', 
    height: 5,
    types: ['water']
  }
];

document.write(`Pokemon 1: <br>Name: ${pokemonList[0].name} <br>Height: ${pokemonList[0].height} <br>Types: ${pokemonList[0].types} <br><br>`);
document.write(`Pokemon 2: <br>Name: ${pokemonList[1].name} <br>Height: ${pokemonList[1].height} <br>Types: ${pokemonList[1].types} <br><br>`);
document.write(`Pokemon 3: <br>Name: ${pokemonList[2].name} <br>Height: ${pokemonList[2].height} <br>Types: ${pokemonList[2].types}`);
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

// iterate pokemonList with forEach
pokemonList.forEach(function(pokemon) {
  // check height and add comments
  let comment = '';
  if (pokemon.height <= 5) {
    comment = ' - It\'s so tiny!'
  } else if (pokemon.height >= 7) { 
      comment = ' - Wow, that’s big!';
  }
  document.write(`<span class="pokename">${pokemon.name}</span> (height: ${pokemon.height}, types: ${pokemon.types.join(', ')})${comment}<br>`);
});
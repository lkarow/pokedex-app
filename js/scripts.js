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

// iterate pokemonList
for (let i = 0; i < pokemonList.length; i++) {
  // check height and add comments
  let comment = '';
  if (pokemonList[i].height <= 5) {
    comment = ' - It\'s so tiny!';
  } else if (pokemonList[i].height >= 7) {
    comment = ' - Wow, that’s big!';
  }
  document.write(`<span class="pokename">${pokemonList[i].name}</span> (height: ${pokemonList[i].height}, types: ${pokemonList[i].types.join(', ')})${comment}<br>`);
}


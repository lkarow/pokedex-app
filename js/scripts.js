let pokemonRepository = (function() {
  // pokemonList Array
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

  // function to return all items in pokemonList array
  function getAll () {    
    return pokemonList;
  };

  // function to add a single item to the pokemonList array
  function add (pokemon) {
    // check typeof for object and if all keys exist
    if (
      typeof pokemon === 'object' && 
      'name' in pokemon &&
      'height' in pokemon &&
      'types' in pokemon) {
        pokemonList.push(pokemon)
    } else {
        console.log('Error!')
      }
  };

  // function to find pokemon by name and return it as a new array
  function find (pokemonName) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name === pokemonName
    });
  };

  return {
    getAll,
    add,
    find
  };

})();

// // iterate pokemonList with forEach
pokemonRepository.getAll().forEach(function(pokemon) {
  // check height and add comments
  let comment = '';
  if (pokemon.height <= 5) {
    comment = ' - It\'s so tiny!'
  } else if (pokemon.height >= 7) { 
      comment = ' - Wow, that\'s big!';
  }
  document.write(`<span class="pokename">${pokemon.name}</span> (height: ${pokemon.height}, types: ${pokemon.types.join(', ')})${comment}<br>`);
});
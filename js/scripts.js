// IIFE for pokemonList
let pokemonRepository = (function() {
  // pokemonList array
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

  // function to add list items
  function addListItem(pokemon) {

    // add ul, li and button to pokemon-list
    let ul = document.querySelector('.pokemon-list');
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-pokemon');

    // append button to li in ul
    li.appendChild(button);
    ul.appendChild(li);

    // add eventListener to button
    clickEventListener(button, pokemon);
  };

  // function to add details to list items
  function showDetails(pokemon) {
    console.log(pokemon.name);
  };

  // function to add eventListener
  function clickEventListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  };

  return {
    getAll,
    add,
    find,
    addListItem,
    showDetails
  };

})();

// // iterate pokemonList & call addListItem function
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});
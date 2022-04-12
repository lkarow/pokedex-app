// IIFE for pokemonList
let pokemonRepository = (function() {
  // pokemonList array
  let pokemonList = [];
  // api URL
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1000';

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
      'detailsUrl' in pokemon
      ) {
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

  // function to add eventListener
  function clickEventListener(button, pokemon) {
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  };

  // function to load pokemon list
  function loadList() {
    // show loading message
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      // hide loading message
      hideLoadingMessage();
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url,
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  };

  // function to load details for pokemon items
  function loadDetails(item) {
    // show loading message
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      // hide loading message
      hideLoadingMessage();
      return response.json();
    }).then(function (details) {
      // add details to item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  };

    // function to add details to list items
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function () {
        console.log(pokemon);
      });
    };

    // show loading message
    function showLoadingMessage() {
      console.log('Loading Data ... Please wait ...');
      document.getElementById('loading-message').style.display='block';
    };

    // hide loading message
    function hideLoadingMessage() {
      document.getElementById('loading-message').style.display='none';
    };

  return {
    getAll,
    add,
    find,
    addListItem,
    loadList,
    loadDetails,
    showDetails,
    showLoadingMessage,
    hideLoadingMessage
  };

})();

pokemonRepository.loadList().then(function () {
  // data is loaded
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

// // iterate pokemonList & call addListItem function
pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
});

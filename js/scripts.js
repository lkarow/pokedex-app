// IIFE for pokemonList
let pokemonRepository = (function () {
  // pokemonList array
  let pokemonList = [];
  // api URL
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

  // function to return all items in pokemonList array
  function getAll() {
    return pokemonList;
  };

  // function to add a single item to the pokemonList array
  function add(pokemon) {
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
  function find(pokemonName) {
    return pokemonList.filter(function (pokemon) {
      return pokemon.name === pokemonName
    });
  };

  // search function
  function searchPokemon() {
    // get input and save as string all lower case
    let searchedPokemon = document.getElementById('input-pokemon').value.toLowerCase();

    // execute find function and save object
    let foundPokemon = find(searchedPokemon);

    // check if pokemon exists
    if (pokemonList.length > 0) {
      console.log('found')
    } else {
      console.log('not found')
      let searchContainer = document.querySelector('.search-container');
      let messageNotFound = document.createElement('p');
      messageNotFound.classList.add('not-found');
      messageNotFound.innerText = 'Pokemon not found';
      searchContainer.appendChild(messageNotFound);
    };

    // remove all buttons for pokemons from the DOM
    let deletePokemonButtons = document.getElementsByClassName('button-pokemon');
    while (deletePokemonButtons.length > 0) {
      deletePokemonButtons[0].remove()
    };

    // add pokemon button for the searched pokemon
    addListItem(foundPokemon[0])
  };

  // eventListener click on button for activate search
  let buttonSearch = document.getElementById('button-search-pokemon');
  buttonSearch.addEventListener('click', (e) => {
    e.preventDefault();
    searchPokemon();
  });

  // eventListener press enter for activate search
  let inputPokemon = document.getElementById('input-pokemon');
  inputPokemon.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchPokemon();
    }
  });

  // eventListener to check input of search
  inputPokemon.addEventListener('input', (e) => {
    let autocomplete = document.getElementById('autocomplete');
    // set variable to value in lowercases so that searching for strings in uppercase works
    let input = e.target.value.toLowerCase();

    // if input is not empty show dropdown with autocomplete
    if (input === '') {
      autocomplete.style.display = 'none';
    } else {
      let pokemonListFilter = pokemonList.filter(pokemonObj => pokemonObj.name.includes(input))
      console.log('pokemonListFilter: ' + pokemonListFilter);
      if (pokemonListFilter.length > 0) {
        autocomplete.style.display = 'block';

        // delete all in div autocomplete, so that suggestion update if letters are added or deleted
        autocomplete.innerHTML = '';

        // iterate through pokemonListFilter, append matching pokemons as suggestions
        for (let i = 0; i < pokemonListFilter.length; i++) {
          let searchSuggestion = document.createElement('p');
          searchSuggestion.classList.add('suggestions')
          // if clicked on suggestion set value of search bar to the selected suggestion & execute search function
          searchSuggestion.addEventListener('click', (e) => {
            inputPokemon.value = pokemonListFilter[i].name.charAt(0).toUpperCase() + pokemonListFilter[i].name.slice(1);
            searchPokemon();
          })
          // set innerText of suggestion element to pokemon name (first letter uppercase)
          searchSuggestion.innerText = pokemonListFilter[i].name.charAt(0).toUpperCase() + pokemonListFilter[i].name.slice(1);
          autocomplete.appendChild(searchSuggestion);
        }
      } else {
        autocomplete.style.display = 'none';
      }
    }
  })

  // hide suggestions if clicked on suggestion or outside of suggestions
  document.addEventListener('click', (e) => {
    autocomplete.style.display = 'none';
  });

  // clear input and hide suggestions if escape key is pressed
  inputPokemon.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      autocomplete.innerHTML = '';
      autocomplete.style.display = 'none';
    }
  });

  // reset search and load all pokemons again
  let buttonReset = document.getElementById('button-reset-pokemon');
  buttonReset.addEventListener('click', (e) => {
    e.preventDefault();
    // remove button for searched pokemon
    let deletePokemonButtons = document.getElementsByClassName('button-pokemon');
    while (deletePokemonButtons.length > 0) {
      deletePokemonButtons[0].remove()
    };

    // remove all not-found-message
    let deleteNotFound = document.getElementsByClassName('not-found');
    while (deleteNotFound.length > 0) {
      deleteNotFound[0].remove()
    };

    // load all pokemons again
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  })

  // function to add list items
  function addListItem(pokemon) {
    // capitalize first letter of name
    let pokeName = pokemon.name;
    let pokeNameFirstLetterCap = pokemon.name.charAt(0).toUpperCase() + pokeName.slice(1);

    // add ul, li and button to pokemon-list
    let ul = document.querySelector('.pokemon-list');
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokeNameFirstLetterCap;
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
      item.imageUrl = details.sprites.other.dream_world.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types;
      item.base_experience = details.base_experience;
    }).catch(function (e) {
      console.error(e);
    });
  };

  // function to show details for list items
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      // load function to create modal for list item
      showModal(pokemon);
      console.log(pokemon.name);
    });
  };

  // function to create modal
  function showModal(pokemon) {
    // capitalize first letter of name
    let pokeName = pokemon.name;
    let pokeNameFirstLetterCap = pokemon.name.charAt(0).toUpperCase() + pokeName.slice(1);

    // add every type into array
    let pokeTypes = [];
    for (let i = 0; i < pokemon.types.length; i++) {
      pokeTypes.push(pokemon.types[i].type.name);
    }

    // create div to hold modal
    let modalContainer = document.querySelector('#modal-container');

    // clear modalContainer
    modalContainer.innerHTML = '';

    // create modal
    let modal = document.createElement('div');
    modal.classList.add('modal');

    // create content in modal
    let modalTitle = document.createElement('h2');
    modalTitle.classList.add('h2');
    modalTitle.innerText = pokeNameFirstLetterCap;

    let modalImage = document.createElement('IMG')
    modalImage.classList.add('modal-image');
    modalImage.src = pokemon.imageUrl;

    let modalContentHeight = document.createElement('p');
    modalContentHeight.innerText = `Height: ${pokemon.height / 10} m`;

    let modalContentWeight = document.createElement('p');
    modalContentWeight.innerText = `Weight: ${pokemon.weight / 10} kg`;

    let modalContentTypes = document.createElement('p');
    modalContentTypes.innerText = `Types: ${pokeTypes.join(', ')}`;

    let modalContentExp = document.createElement('p');
    modalContentExp.innerText = `Base experience: ${pokemon.base_experience}`;


    // create close button in modal
    let closeButton = document.createElement('button');
    closeButton.classList.add('close-button');
    closeButton.innerText = 'x'
    closeButton.addEventListener('click', hideModal);

    // append modal elements
    modal.appendChild(closeButton);
    modal.appendChild(modalTitle);
    modal.appendChild(modalImage);
    modal.appendChild(modalContentHeight);
    modal.appendChild(modalContentWeight);
    modal.appendChild(modalContentTypes);
    modal.appendChild(modalContentExp);
    modalContainer.appendChild(modal);

    // activate visibility of modal
    modalContainer.classList.add('visibile');

    // hide modal if click outside of modal
    modalContainer.addEventListener('click', (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })
  };

  // function to hide modal for details of list items
  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('visibile');
  };

  // hide modal if escape is pressed
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('visibile')) {
      hideModal();
    }
  });

  // show loading message
  function showLoadingMessage() {
    console.log('Loading Data ... Please wait ...');
    document.getElementById('loading-message').style.display = 'block';
  };

  // hide loading message
  function hideLoadingMessage() {
    document.getElementById('loading-message').style.display = 'none';
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
  // // iterate pokemonList & call addListItem function
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

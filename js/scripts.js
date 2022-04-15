// IIFE for pokemonList
let pokemonRepository = (function() {
  // pokemonList array
  let pokemonList = [];
  // api URL
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=10';

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
      item.imageUrl = details.sprites.front_default;
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

    // hide modal if click outside of modal
    window.addEventListener('keydown', (e) => {
      let modalContainer = document.querySelector('#modal-container');
      if (e.key === 'Escape' && modalContainer.classList.contains('visibile')) {
        hideModal();
      }
    });

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

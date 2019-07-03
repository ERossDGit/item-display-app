var pokemonRepository = (function() {
  var repository = [];
  var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // function to add a pokemon character to the registry
  function add(pokemon) {
    // verify what is being added is an object
    var isObject = 0;
    if (typeof pokemon === 'object') {
      isObject = 1;
    }

    // verify the object has the name, height and types keys
    var typeOK = 1;
    if (
      pokemon.hasOwnProperty('name') &&
      pokemon.hasOwnProperty('detailsUrl')
    ) {
      typeOK = 1;
    } else {
      typeOK = 0;
    }

    // if type and keys are correct, add pokemon to repository
    if (isObject && typeOK) {
      repository.push(pokemon);
    }
  }

  // function that returns the entire pokemon repository
  function getAll() {
    return repository;
  }

  // add a repository pokemon to the main page as a button with pokemon name
  function addListItem(pokemon_item) {
    // create list element
    var newListElement = document.createElement('li');
    newListElement.classList.add('pokemon-list__item');
    newListElement.innerText = '';

    // create button element and add name to innerText
    var newButtonElement = document.createElement('button');
    newButtonElement.innerText = pokemon_item.name;

    // append button to list element
    newListElement.appendChild(newButtonElement);

    //select the unordered list in the DOM and append list item
    var $pokemonList = document.querySelector('.pokemon-list');
    $pokemonList.appendChild(newListElement);

    // add click event handler to the new button
    newButtonElement.addEventListener('click', function() {
      showDetails(pokemon_item);
    });
  }

  // write the pokemon details to the console log
  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  function loadList() {
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        json.results.forEach(function(item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        alert(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = Object.keys(details.types);
      })
      .catch(function(e) {
        alert(e);
      });
  }

  var $modalContainer = document.querySelector('#modal-container');

  function showModal(name, height, imgUrl) {
    // clear existing content
    $modalContainer.innerHTML = '';

    var modal = document.createElement('div');
    modal.classList.add('modal');

    // Add the content to the modal
    var closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    var nameElement = document.createElement('h1');
    nameElement.innerText = name;

    var heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + height;

    var imageElement = document.createElement('img');
    imageElement.src = imgUrl;

    modal.appendChild(closeButtonElement);
    modal.appendChild(nameElement);
    modal.appendChild(heightElement);
    modal.appendChild(imageElement);
    $modalContainer.appendChild(modal);

    $modalContainer.classList.add('is-visible');
  }
  function hideModal() {
    $modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', e => {
    if (
      e.key === 'Escape' &&
      $modalContainer.classList.contains('is-visible')
    ) {
      hideModal();
    }
  });

  $modalContainer.addEventListener('click', e => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    var target = e.target;
    if (target === $modalContainer) {
      hideModal();
    }
  });

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

// loop through the repository and add a button to the main page
// each button has the pokemon's name on it
pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

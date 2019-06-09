// set up the pokemon registry by wrapping in an IIFE
addListItemCalled = 'No';
var pokemonRepository = (function () {
  var repository = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Spearow', height: 0.3, types: ['flying', 'normal']},
    {name: 'Zubat', height: 0.8, types: ['poison', 'flying']}
  ];

  // function to add a pokemon character to the registry
  function add(pokemon) {
    // verify what is being added is an object
    var isObject = 0;
    if (typeof pokemon === 'object') {
      isObject = 1;
    }

    // verify the object has the name, height and types keys
    var typeOK = 1;
    if (pokemon.hasOwnProperty('name') && pokemon.hasOwnProperty('height') && pokemon.hasOwnProperty('types')) {
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
      newButtonElement.addEventListener('click', function(event) {
        showDetails(pokemon_item);
      })

  }

// write the pokemon details to the console log
function showDetails(pokemon) {
  console.log(pokemon);
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

// loop through the repository and add a button to the main page
// each button has the pokemon's name on it
pokemonRepository.getAll().forEach(function(currentItem) {
  pokemonRepository.addListItem(currentItem);
});

// set up the pokemon registry by wrapping in an IIFE
addListItemCalled = 'No';
var pokemonRepository = (function () {
  var repository = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Spearow', height: 0.3, types: ['flying', 'normal']},
    {name: 'Zubat', height: 0.8, types: ['poison', 'flying']}
  ];

  function add(pokemon) {
    var isObject = 0;
    if (typeof pokemon === 'object') {
      isObject = 1;
    }

    var typeOK = 1;
    if (pokemon.hasOwnProperty('name') && pokemon.hasOwnProperty('height') && pokemon.hasOwnProperty('types')) {
      typeOK = 1;
    } else {
      typeOK = 0;
    }

    if (isObject && typeOK) {
      repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }

  function addListItem(pokemon_item) {
      addListItemCalled = "Yes";
      var newListElement = document.createElement('li');
      newListElement.classList.add('pokemon-list__item');
      newListElement.innerText = '';

      var newButtonElement = document.createElement('button');
      newButtonElement.innerText = pokemon_item.name;

      newListElement.appendChild(newButtonElement);

      var $pokemonList = document.querySelector('.pokemon-list');
      $pokemonList.appendChild(newListElement);

  }

function showDetails(pokemon) {
  console.log(pokemon);
}

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})();

// add a pokemon character to the registry
//pokemonRepository.add({name: 'Bugs Bunny', height: 10.5, types: ['rascally', 'rabbit']});
//pokemonRepository.add('Bugs Bunny');  // this is a test case for trying to enter a non-object
//pokemonRepository.add({charactername: 'Bugs Bunny', height: 10.5, types: ['rascally', 'rabbit']}); //test for incorrect keys

// temp variable to hold information to written to page
var tempName
//pokemonRepository.addListItem({name: 'Bugs Bunny', height: 10.5, types: ['rascally', 'rabbit']});

// loop through the repository and write each pokemon's
// name and height
pokemonRepository.getAll().forEach(function(currentItem) {
  pokemonRepository.addListItem(currentItem);
});

// set up the pokemon registry by wrapping in an IIFE
var pokemonRepository = (function () {
  var repository = [
    {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
    {name: 'Spearow', height: 0.3, types: ['flying', 'normal']},
    {name: 'Zubat', height: 0.8, types: ['poison', 'flying']}
  ];

  function add(pokemon) {
    if (typeof pokemon === 'object') {
      repository.push(pokemon);
    }
  }

  function getAll() {
    return repository;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

// add a pokemon character to the registry
pokemonRepository.add({name: 'Bugs Bunny', height: 10.5, types: ['rascally', 'rabbit']});
// pokemonRepository.add('Bugs Bunny');  // this is a test case for trying to enter a non-object

// temp variable to hold information to written to page
var tempName

// loop through the repository and write each pokemon's
// name and height
pokemonRepository.getAll().forEach(function(currentItem) {
  if (currentItem.height > 10) {
    tempName = currentItem.name + " (height: " + currentItem.height + ") - WOW, that's humongous! Are you sure that's a pokemon character? <br>";
  } else if (currentItem.height > .7) {
    tempName = currentItem.name + " (height: " + currentItem.height + ") - WOW, that's big! <br>";
  } else {
    tempName = currentItem.name + " (height: " + currentItem.height + ") <br>";
    }
  document.write(tempName);
});

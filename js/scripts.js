var repository = [
  {name: 'Bulbasaur', height: 0.7, types: ['grass', 'poison']},
  {name: 'Spearow', height: 0.3, types: ['flying', 'normal']},
  {name: 'Zubat', height: 0.8, types: ['poison', 'flying']}
];

var tempName

for (var i = 0; i < repository.length; i++) {
  tempName = repository[i].name + " (height: " + repository[i].height + ")";
  if (repository[i].height > .5) {
    tempName = tempName + " - Wow, that's big! <br>";
  } else {
    tempName = tempName + " <br>"
  }
  document.write(tempName);
}

const pokemonDisplay = document.getElementById("pokemonDisplay");
const rand_btn = document.getElementById("random");
let btn = document.getElementById("searchBtn");
let input = document.getElementById("textbox");
const pkmnHtml = document.querySelector('.result');


let pkmnIds = [1,2,3,4,5,6];
//console.log(pkmnIds);


console.log(pkmnIds[0]);

function getRandomInt(min,max) {
  let randInt = Math.floor(Math.random() * (max - min) + min);
  console.log(randInt);
  return randInt;
}

/* function generateUrl(val) {
  const pkmnObj = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon",
    name: val,
  }
  return pkmnObj;
} */

/* function searchFromInput(event) {
  console.log('searching by input')
  if(input.value.length > 0) {
    console.log('checking input length')
    //randomize = false;
    fetchPkmn();
    //searchPkmn(generateUrl(input.value));
    //randomize = true;
  }
} */

function searchFromEnter(event) {
  //if(event.keyCode === 13 && input.value.length > 0) {
    console.log('key pressed')
  if(event.keyCode == 39) {
    fetchPkmn();
    //searchPkmn(generateUrl(input.value));
  }
}

console.log(pokemonDisplay);

//fetch pokemon from pokeapi



const fetchPkmn = (pkmnIds) => {
  console.log('fetching pokemon');
  console.log(pkmnIds[0]);
  const promises = [];

  for (let i = 0; i < 6; i++) {
    //let num = getRandomInt(1,281);  //pick random number between 1 and 1281 (number of max pokemon)

/*     let num = i;
    if (randomize == true) {
      num = getRandomInt(1,281);
    } */
    const randNum = getRandomInt(1,281);
    console.log(randNum);
    //searchPkmn(generateUrl(randNum));

    console.log(pkmnIds[1]);
    console.log(pkmnIds[i]);
    console.log(`https://pokeapi.co/api/v2/pokemon/${pkmnIds[i]}`);
    const url = `https://pokeapi.co/api/v2/pokemon/${pkmnIds[i]}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then(results => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map((type) => type.type.name).join (', ')
    }))
    console.log(results);
    displayPokemon(pokemon);
    createCard(pokemon);
  })
}

function createCard(pokemon) {
  const card = document.createElement("div");
  card.classList.add("card");
  console.log(pokemon.name);
}

//creates HTML elements to display each pokemon
const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLstr = pokemon
    .map(
      (pkmn) =>
      `
      <div class="card">
        <img class="card-image" src="${pkmn.image}"/>
        <h2 class="card-title">${pkmn.id}. ${pkmn.name}</h2>
        <p class="card-subtitle">Type: ${pkmn.type}</p>
      </div>
      `
    )
    .join('');
  pokemonDisplay.innerHTML = pokemonHTMLstr; 
}



fetchPkmn(pkmnIds);  //call fetchPkmn() function to start initial state of page with 6 random pokemon


//btn.addEventListener("click",searchFromInput);
rand_btn.addEventListener("click",fetchPkmn);
//input.addEventListener("keypress",searchFromEnter);




document.addEventListener("keydown", function(event){
  console.log(event);
  if (event.keyCode == 39) {  //when Right Arrow key is pressed,

    pkmnIds.forEach(arrayAddOne)
    
    console.log(pkmnIds[0]);

    fetchPkmn(pkmnIds);              //fetch 6 pokemon
  }
});
function arrayAddOne(item, index, arr) {
  arr[index] = item + 1;
}

/* document.onkeydown = function checkKey() {


  switch (event.keyCode) {
    case 38:
    console.log("Up key is pressed");
    break;
case 40:
    console.log("Down key is pressed");
    
    //break;
case 37:
    console.log("left key is pressed");
    break;
case 39:
    console.log("right key is pressed");
    fetchPkmn;
  } */
//};

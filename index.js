const pokedex = document.getElementById("pokedex");

var btn = document.getElementsByTagName("button")[0];
var input = document.getElementById("textbox");
var rand_btn = document.getElementById("random");
const pkmnhtml = document.querySelector('.pokemon');

btn.addEventListener("click",generateRandomPkmn);
rand_btn.addEventListener("click",generateRandomPkmn);

function generateRandomPkmn(event) {
  const randNum = getRandomInt(1,281);
  console.log(randNum);
  //searchPkmn(generateUrl(randNum));
}

function getRandomInt(min,max) {
  var randInt = Math.floor(Math.random() * (max - min) + min);
  console.log(randInt);
  return randInt;
}

function generateUrl(val) {
  const pkmnObj = {
    url: "https://pokeapi.co/api/v2/",
    type: "pokemon",
    name: val,
  }
  return pkmnObj;
}

console.log(pokedex);


//fetch pokemon from pokeapi






const fetchPkmn = () => {
  const promises = [];

  for (let i = 1; i <= 151; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then(results => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map((type) => type.type.name).join (', ')
    }))
    //displayPokemon(pokemon);
  })
}


//creates HTML elements to display each pokemon
/* const displayPokemon = (pokemon) => {
  console.log(pokemon);
  const pokemonHTMLstr = pokemon
    .map(
      (pkmn) =>
      `
      <li class="card">
        <img class="card-image" src="${pkmn.image}"/>
        <h2 class="card-title">${pkmn.id}. ${pkmn.name}</h2>
        <p class="card-subtitle">Type: ${pkmn.type}</p>
      </li>
      `
    )
    .join('');
  pokedex.innerHTML = pokemonHTMLstr;
  
} */
fetchPkmn();



const pokedex = document.getElementById("pokedex");

var btn = document.getElementsByTagName("button")[0];
var input = document.getElementById("textbox");
var rand_btn = document.getElementById("random");
const pkmnHtml = document.querySelector('.result');


function generateRandomPkmn(event) {
  const randNum = getRandomInt(1,281);
  console.log(randNum);
  searchPkmn(generateUrl(randNum));
}

const searchPkmn = (pkmnObj) => {


	const {url, type, name} = pkmnObj //destruct object for url, type, name properties
  const apiUrl = `${url}${type}/${name}` //url string based on pokemon object properties

	fetch(apiUrl)
		.then( (raw_data) => raw_data.json()) 
		.then( (data) => changeHtml(data))
		.catch((err) => { //catch if error occurs
      pkmnHtml.innerHTML = 
			  `<h1> Error, please check code for any issues. </h1>`;
		})

	const changeHtml = (data) => {
		///adding to HTML

    const pokemon = {
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map((type) => type.type.name)  //map array of the pokemon's types
      .join(', ')
    }
		const newHtml = `
		<div class = "details" align="center">
			<img src= "${data.sprites.front_default} " /> 
      <h1 class= "name" > ${pokemon.name} </h1>
      <h3> type: <span class="out">${pokemon.type} </span> </h3>
		</div>`
		pkmnHtml.innerHTML = newHtml //append HTML
		input.value = ""; //clear input value to empty string

    //displayPokemon(pokemon);
	}

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

function searchFromInput(event) {
  if(input.value.length > 0) {
    searchPkmn(generateUrl(input.value));
  }
}

function searchFromEnter(event) {
  //if(event.keyCode === 13 && input.value.length > 0) {
  if(event.keyCode === 13) {
    searchPkmn(generateUrl(input.value));
  }
}

console.log(pokedex);


//fetch pokemon from pokeapi



const fetchPkmn = () => {
  const promises = [];

  for (let i = 1; i <= 6; i++) {

    const randNum = getRandomInt(1,281);
    console.log(randNum);
    //searchPkmn(generateUrl(randNum));

    const url = `https://pokeapi.co/api/v2/pokemon/${randNum}`;
    promises.push(fetch(url).then((res) => res.json()));
  }

  Promise.all(promises).then(results => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites['front_default'],
      type: data.types.map((type) => type.type.name).join (', ')
    }))
    displayPokemon(pokemon);
  })
}


//creates HTML elements to display each pokemon
const displayPokemon = (pokemon) => {
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
  
}
fetchPkmn();

rand_btn.addEventListener("click",fetchPkmn);
btn.addEventListener("click",searchFromInput);
input.addEventListener("keypress",fetchPkmn);

let pokemonIDs = [1,2,3,4,5,6];
let rand_btn = document.getElementById("random");

function getRandomInt(min,max) {
	let randInt = Math.floor(Math.random() * (max - min) + min);
	console.log(randInt);
	return randInt;
  }

const fetchPokemon = (ids) => {
	const promises = [];
	console.log("fetching pokemon");

	for (let i = 0; i < 6; i++) {
		const randNum = getRandomInt(1,281);
		const url = `https://pokeapi.co/api/v2/pokemon/${randNum}`;
		promises.push(fetch(url).then((res) => res.json()));

	}
	Promise.all(promises).then((results) => {
		const pokemon = results.map((data) => ({
			name: data.name,
			id: data.id,
			image: data.sprites['front_default'],
			type: data.types.map((type) => type.type.name).join(', ')
		}));
		//console.log(pokemon);
		displayPokemon(pokemon);
	});
};

const displayPokemon = (pokemon) => {
	const pokemonHTMLString = pokemon
		.map(
			(pokemonDisplay) =>
			`
			<div class="card">
			<img class="card-image" src="${pokemonDisplay.image}"/>
			<h2 class="card-title">${pokemonDisplay.id}. ${pokemonDisplay.name}</h2>
			<p class="card-subtitle">Type: ${pokemonDisplay.type}</p>
		  	</div>
			`
		).join('');
	pokedex.innerHTML = pokemonHTMLString;
}

rand_btn.addEventListener("click", function(event){
	console.log(event);
	fetchPokemon(pokemonIDs);
});
document.addEventListener("keydown", function(event){
	console.log(event);						//log keydown event
	if (event.keyCode == 39) {				//when Right Arrow key is pressed,
	  fetchPokemon(pokemonIDs);             //fetch 6 random pokemon
	}
  });

  fetchPokemon(pokemonIDs);					//call fetchPokemon when page loads
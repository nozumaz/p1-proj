let rand_btn = document.getElementById("random");   //define random button for event logging

function getRandomInt(min,max) {                    //function to generate random number
	return randInt = Math.floor(Math.random() * (max)) + 1;
  }

//fetchPokemon method generates random numbers and fetches 6 pokemon from pokeapi
//then maps the fetched pokemon data into an object with name, id, image, and type properties
const fetchPokemon = () => {
	const promises = [];
	//console.log("fetching pokemon");

	for (let i = 0; i < 6; i++) {
		const randNum = getRandomInt(1,281);		//checks from pokemon #1 through #1281
		console.log(randNum);						//log randomly generated number
		const url = `https://pokeapi.co/api/v2/pokemon/${randNum}`;
		promises.push(fetch(url).then((res) => res.json()));

	}
	//use promise to fetch all results in the same call and map properties to pokemon object
	Promise.all(promises).then((results) => {
		const pokemon = results.map((data) => ({
			name: data.name,
			id: data.id,
			image: data.sprites['front_default'],
			type: data.types.map((type) => type.type.name).join(', ')
		}));
		//console.log(pokemon);

		createCard(pokemon);
	});
};

//creates HTML elements to display in webpage
const createCard = (pokemon) => {
	const appendLocation = document.getElementById("displayArea");

	//while loop to remove any existing child divs to keep it limited to 6 pokemon at a time
	while (appendLocation.firstChild){
		appendLocation.removeChild(appendLocation.firstChild);
	}

	const pokemonMap = pokemon.map(
		(pokemonMapped) => {

		const appendDiv = document.createElement('div');
		const appendImg = document.createElement('img');
		const appendUrl = pokemonMapped.image;
		const appendH2 = document.createElement('h2');
		const appendP = document.createElement('p');

		//grabs pokemon name from the mapped name property
		const pkName = pokemonMapped.name;

		//capitalize first letter of pokemon name
		const pkNameCap = pkName.charAt(0).toUpperCase()
			+ pkName.slice(1);

		//establishing properties of the created HTML elements
		appendDiv.setAttribute("class","card");

		appendImg.setAttribute("class","card-image");
		appendImg.setAttribute("src",appendUrl);

		appendH2.setAttribute("class","card-title");
		appendH2.textContent = pkNameCap;

		appendP.setAttribute("class","card-subtitle");
		appendP.textContent = `Type: ${pokemonMapped.type}`

		//add h2,p,img nodes as children of div
		appendDiv.append(appendH2,appendP,appendImg);

		//add created div to #displayArea
		appendLocation.appendChild(appendDiv);
		}
	)
}

//eventListener to detect button click on the Randomize! button
rand_btn.addEventListener("click", function(event){
	console.log(event);
	fetchPokemon();
});

//eventListener to detect right or left arrow key press
document.addEventListener("keydown", function(event){
	console.log(event);						//log keydown event
	if (event.keyCode == 39 || event.keyCode == 37) {				//when Right or Left Arrow key is pressed,
	  fetchPokemon();             //fetch 6 random pokemon
	}
});

fetchPokemon();					//call fetchPokemon when page loads
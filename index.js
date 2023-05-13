const pokedex = document.getElementById("pokedex");

console.log(pokedex);

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
    displayPokemon(pokemon);
  })
}
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
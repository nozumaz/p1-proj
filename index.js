const fetchPkmn = () => {
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    fetch(url).then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data);
      const pokemon = {
        name: data.name,
        id: data.id,
        image: data.sprites['front_default'],
        type: data.types.map((type) => type.type.name).join (', ')
      };
      console.log(pokemon);
    })      
  }
}

fetchPkmn();
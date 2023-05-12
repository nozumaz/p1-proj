console.log('javascript file connected')

const h2 = document.createElement("h2");
h2.textContent = "This content added by JavaScript";

document.querySelector("body").appendChild(h2);





fetch("https://pokeapi.co/")
  .then((resp) => resp.json())
  .then((json) => console.log(json));



document.addEventListener("DOMContentLoaded", () => {
  let form = document.querySelector("form");
  form.addEventListener("submit", () => {
  })
})

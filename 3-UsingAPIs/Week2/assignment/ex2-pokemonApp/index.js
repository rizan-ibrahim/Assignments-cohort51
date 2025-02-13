/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/blob/main/3-UsingAPIs/Week2/README.md#exercise-2-gotta-catch-em-all

Complete the four functions provided in the starter `index.js` file:

`fetchData`: In the `fetchData` function, make use of `fetch` and its Promise 
  syntax in order to get the data from the public API. Errors (HTTP or network 
  errors) should be logged to the console.

`fetchAndPopulatePokemons`: Use `fetchData()` to load the pokemon data from the 
  public API and populate the `<select>` element in the DOM.
  
`fetchImage`: Use `fetchData()` to fetch the selected image and update the 
  `<img>` element in the DOM.

`main`: The `main` function orchestrates the other functions. The `main` 
  function should be executed when the window has finished loading.

Use async/await and try/catch to handle promises.

Try and avoid using global variables. As much as possible, try and use function 
parameters and return values to pass data back and forth.
------------------------------------------------------------------------------*/
async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetch data:', error);
    throw error;
  }
}

async function fetchAndPopulatePokemons() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=150';
  try {
    const data = await fetchData(url);
    const select = document.querySelector('select');
    select.innerHTML = '';

    data.results.forEach((pokemon) => {
      const option = document.createElement('option');
      option.value = pokemon.url;
      option.textContent = pokemon.name;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetch pokemon list:', error);
  }
}

async function fetchImage(pokemonUrl) {
  try {
    const data = await fetchData(pokemonUrl);
    const img = document.querySelector('img');
    img.src = data.sprites.front_default;
    img.alt = `${data.name} Pokemon sprite`;
  } catch (error) {
    console.error('Error fetch image:', error);
  }
}

function main() {
  const button = document.createElement('button');
  button.id = 'get-button';
  button.textContent = 'get pokemon';
  document.body.appendChild(button);

  const select = document.createElement('select');
  select.id = 'pokemon-select';
  document.body.appendChild(select);

  const option = document.createElement('option');
  option.value = '';
  option.textContent = 'Select a Pokemon';
  select.appendChild(option);

  const img = document.createElement('img');
  img.id = 'pokemon-img';
  img.alt = `select a pokemon to see it image `;
  document.body.appendChild(img);

  button.addEventListener('click', fetchAndPopulatePokemons);

  select.addEventListener('change', (event) => {
    if (event.target.value) {
      fetchImage(event.target.value);
    }
  });
}

window.addEventListener('load', main);

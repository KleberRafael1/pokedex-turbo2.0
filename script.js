let currentPokemonId = 1; // Começa com o primeiro Pokémon

const input = document.getElementById('pokemon-input');
const searchBtn = document.getElementById('search-btn');
const pokemonImage = document.getElementById('pokemon-image');
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const pokedex = document.getElementById('pokedex');

async function buscarPokemon(pokemon) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toString().toLowerCase()}`);
        if (!res.ok) throw new Error('Pokémon não encontrado');
        const data = await res.json();
        currentPokemonId = data.id;

        // Atualiza a Pokédex com os dados
        pokemonImage.src = data.sprites.front_default;
        pokemonName.textContent = data.name;
        pokemonId.textContent = `#${data.id.toString().padStart(3, '0')}`;

        // Expande a Pokédex se estiver pequena
        pokedex.classList.add('expanded');
    } catch (err) {
        pokemonImage.src = '';
        pokemonName.textContent = 'Não encontrado';
        pokemonId.textContent = '';
        console.error(err);
    }
}

// Eventos
searchBtn.addEventListener('click', () => buscarPokemon(input.value || currentPokemonId));
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') buscarPokemon(input.value || currentPokemonId);
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentPokemonId++;
    buscarPokemon(currentPokemonId);
});

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        buscarPokemon(currentPokemonId);
    }
});

// Carrega o Pokémon inicial automaticamente
buscarPokemon(currentPokemonId);

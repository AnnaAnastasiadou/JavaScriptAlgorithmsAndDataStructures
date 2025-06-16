const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const topContainer = document.getElementById('top-container');
const creatureName = document.getElementById('creature-name');
const creatureId = document.getElementById('creature-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

const allCreaturesURL = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";

const fetchData = async () => {
    try{
        const response = await fetch(allCreaturesURL);
        const data = await response.json();
        return data;

    }
    catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
}

const checkInput = (input) => {
    if (!input) {
        alert('Please enter a creature name or ID.');
        return false;
    }
    return true;
}

const searchCreature = async () => {
    const creatures = await fetchData();
    console.log('Fetched Creatures:', creatures);
    const searchInputValue = searchInput.value.trim();
    if (!checkInput(searchInputValue)) {
        return;
    }
    const creatureExists = creatures.find(creature =>
        creature.name.toLowerCase() === searchInputValue.toLowerCase() 
        || creature.id.toString() === searchInputValue.toLowerCase()
    );
    console.log('Creature Exists:', creatureExists);
    if (!creatureExists) {
        alert(`Creature not found`);
        return;
    }

}

searchButton.addEventListener("click", async (event) => {
    event.preventDefault();
    searchCreature();
})
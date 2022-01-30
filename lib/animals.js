const fs = require("fs");
const path = require("path");

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};

// Filter by Query function
function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    // Note that we save the animalsArray as filteredResults here:
    let filteredResults = animalsArray;
    if(query.personalityTraits) {
        // Save personalityTraits as a dedicated array.
        // if personalitytraits is a string, place it into new array and save.
        if(typeof query.personalityTraits === 'string') {
            personalityTraitsArray = [query.personalityTraits];
        } else {
            personalityTraitsArray = query.personalityTraits;
        }
        // Loop through each trait in the personality traits array:
        personalityTraitsArray.forEach(trait => {
            //Check trait against each animal in the filteredResults array.
            //Remember, it is initially a copy of the animalsArray,
            //but we're updating it for erach trait in the .forEach loop.
            //For each trait being targeted by the filter, the filteredResults
            //array will then contain only thge entries that contain the trait,
            //so at the end we'll have an array of animals that have every one
            //of the traits when the .forEach() loop is finished.

            filteredResults = filteredResults.filter(
                animal => animal.personalityTraits.indexOf(trait) !== -1
            );
        });
    }
    if(query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);}
    if(query.species) {
            filteredResults = filteredResults.filter(animal => animal.species === query.species);}
    if(query.name) {
                filteredResults = filteredResults.filter(animal => animal.name === query.name);
    }
    return filteredResults;
}


// Find by ID function
function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}


// Create New Animal function
function createNewAnimal(body, animalsArray) {

console.log(body);
// our function main code will go here
const animal = body;
animalsArray.push(animal);

fs.writeFileSync(
    path.join(__dirname, '../data/animals.json'),
    JSON.stringify({ animals: animalsArray }, null, 2)
);

//return finished code to post route for response
return animal;

}


// Validate Animal Function
function validateAnimal(animal) {
    if(!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if(!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if(!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if(!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}
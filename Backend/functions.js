// Importing the 'fs' module to work with the file system
const fs = require('fs');

function generateUserId(length) {
    const numChars = "1234567890";
    let id = new Array();
    for (let i = 0; i < length; i++) {
        id.push(numChars.split("")[getRandomInt(0, numChars.split("").length)]);
    }
    return id.join("");
};
function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
}

// Function to read and parse the responses from the responses.txt file
function getResponses() {
    // Read the contents of the responses.txt file synchronously and store them in 'inputFile'
    const inputFile = fs.readFileSync('responses.txt', 'utf8');
    // Split the contents of 'inputFile' by line breaks ('\n') to create an array of responses
    const responses = inputFile.split('\n');
    // Return the array of responses
    return responses;
}

// Function to read and parse the company names from the companyNames.txt file
function getCompanyNames() {
    // Read the contents of the companyNames.txt file synchronously and store them in 'inputFile'
    const inputFile = fs.readFileSync('companyNames.txt', 'utf8');
    // Split the contents of 'inputFile' by line breaks ('\n') to create an array of company names
    const names = inputFile.split('\n');
    // Return the array of company names
    return names;
}


// Function to grab a random name from the names array
function grabFromNames(names) {
    const num = Math.floor(Math.random() * names.length); // Generate a random index
    return names[num]; // Return the name at the random index
}

// Function to grab a random response from the list array along with its index
function grabFromList(list) {
    const num = Math.floor(Math.random() * list.length); // Generate a random index
    return { response: list[num], num }; // Return the response at the random index along with the index
}

function getResponse() {
    const names = getCompanyNames(); // Get the array of company names
    let named = grabFromNames(names); // Select a random company name

    let { response, num } = grabFromList(getResponses()); // Get a random response and its index
    let amount;

    // Generate a random percentage amount
    if (num <= 56) {
        amount = Math.floor(Math.random() * 100); // Positive amount
    } else {
        amount = Math.floor(Math.random() * 100) * -1; // Negative amount
    }

    // Replace placeholders in the response string with the selected name and amount
    response = response.replace('<companyname>', `${named.replace("\r", "")}`); // Replace companyname placeholder with the selected name
    response = response.replace('<amount>', `${amount}`); // Replace amount placeholder with the generated amount
    const dblAmount = amount / 100.0; // Convert the amount to a double
    return { message: response, companyName: named, amount: amount, dblAmount: dblAmount };
}
// Exporting the functions for use in other modules
module.exports = {
    generateUserId,
    getRandomInt,
    getResponse
};

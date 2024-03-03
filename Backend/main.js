// Importing the 'fs' module to work with the file system
const fs = require('fs');

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

// Exporting the 'getResponses' and 'getCompanyNames' functions for use in other modules
module.exports = {
    getResponses,
    getCompanyNames
};
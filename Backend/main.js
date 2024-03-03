// Importing the getCompanyNames and getResponses functions from the Reading module
const { getCompanyNames, getResponses } = require("./reading");

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

// Main function
function main() {
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
    response = response.replace('<amount>', `${amount}%`); // Replace amount placeholder with the generated amount

    console.log(response); // Print the modified response

    const dblAmount = amount / 100.0; // Convert the amount to a double
    console.log(dblAmount); // Print the double amount
}

main(); // Call the main function to execute the program
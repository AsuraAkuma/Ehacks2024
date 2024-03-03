
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
module.exports = { generateUserId, getRandomInt }

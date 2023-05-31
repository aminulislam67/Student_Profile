const fs = require('fs');

// Sample text data
const textData = "This is some text data.";

// Create an object to store the text data
const data = {
  text: textData
};

// Convert the object to JSON
const jsonData = JSON.stringify(data);

// Write the JSON data to a file
fs.writeFileSync('data.json', jsonData);
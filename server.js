const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const filePath = path.join(__dirname, 'notepad.txt');

let debounceTimeout;

fs.watchFile(filePath, (curr, prev) => {
    console.log('File changed');
 
    if (debounceTimeout) {
        clearTimeout(debounceTimeout);
    }
    debounceTimeout = setTimeout(() => {

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading file:', err);
                return;
            }
            const searchQuery = data.trim();
            if (searchQuery.length > 0) {
                console.log(`Performing Google search for query: "${searchQuery}"`);
                searchGoogle(searchQuery);
            }
        });
    }, 5000); 
});

function searchGoogle(query) {
    const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

    console.log(`Opening browser with URL: ${url}`);

    exec(`start chrome "${url}"`, (err) => {
        if (err) {
            console.error('Error opening browser:', err);
        } else {
            console.log('Browser opened successfully.');
        }
    });
}

console.log(`Monitoring file: ${filePath}`);

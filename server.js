const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001; // Use a different port than your React app

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

const filePath = path.join(__dirname, 'responses.txt');

// Endpoint to handle form submissions
app.post('/submit', (req, res) => {
    const { restaurant, day, time } = req.body;
    const data = `Restaurant: ${restaurant}, Day: ${day}, Time: ${time}\n`;

    // Append the data to a file
    fs.appendFile(filePath, data, (err) => {
        if (err) {
            console.error('Error saving response:', err);
            return res.status(500).send('Error saving response');
        }
        res.send('Response received!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

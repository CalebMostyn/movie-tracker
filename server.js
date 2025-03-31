require('dotenv').config();

const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

// Load SSL certificate and private key files
const privateKey = fs.readFileSync('/path/to/your/keys/d1cb9_3381b_0f11039c64d0ad4102dbdea6596a14dd.key', 'utf8');
const certificate = fs.readFileSync('/path/to/your/certs/caleb_mostyn_com_d1cb9_3381b_1774933585_e1a82ba20934f1659c03df31d9891725.crt', 'utf8');

// Combine the certificate and key into the credentials object
const credentials = { key: privateKey, cert: certificate };

// Get port from command-line argument or default to 3000
const port = process.argv[2] || 3000;

// Create an HTTPS server with the SSL credentials
https.createServer(credentials, app).listen(port, "0.0.0.0", () => {
    console.log(`Server running on https://0.0.0.0:${port}`);
});

app.get("/fetch-html", async (req, res) => {
    const username = req.query.username; // Get username from query parameters

    if (!username) {
        return res.status(400).send("Username is required");
    }

    try {
        // Replace with your actual Browserless API key
        const browserlessApiKey = process.env.BROWSERLESS_API_KEY;

        // URL to fetch
        const url = `https://letterboxd.com/${username}`;

        // Log the request for debugging purposes
        console.log(`Fetching URL: ${url}`);

        // Construct the request body (without waitForSelector)
        const requestBody = {
            url: url
        };

        // Construct the full API URL with the query parameter waitForSelector
        const apiUrl = `https://chrome.browserless.io/content?token=${browserlessApiKey}&waitForSelector=body`;

        // Make the API call to Browserless
        const response = await axios.post(apiUrl, requestBody, {
            headers: { "Content-Type": "application/json" }
        });

        // The response data contains the rendered HTML
        res.send(response.data);
    } catch (error) {
        console.error("Error details:", error.response ? error.response.data : error.message);
        res.status(500).send(`Error fetching page - ${error.message}`);
    }
});

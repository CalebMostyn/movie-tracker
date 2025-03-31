require('dotenv').config();

const express = require("express");
const fs = require("fs");
const https = require("https");
const cors = require("cors");
const axios = require("axios");

const app = express();

const corsOptions = {
  origin: 'https://caleb-mostyn.com', // Allow requests from your site
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Load SSL certificate and private key files
const privateKey = 
fs.readFileSync('/home/calebmos/ssl/keys/da4f3_bcf91_47a9771f70a6115da29a37e906101851.key', 
'utf8');
const certificate = 
fs.readFileSync('/home/calebmos/ssl/certs/_wildcard__caleb_mostyn_com_da4f3_bcf91_1751170170_f0263663d2af639616ca11cb0fa83cae.crt', 
'utf8');
const ca = fs.readFileSync('/home/calebmos/ssl/ca/bundle.crt', 'utf8'); 
// If you have an intermediate CA certificate

// Combine the certificate and key into the credentials object
const credentials = { key: privateKey, cert: certificate, ca: ca };

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

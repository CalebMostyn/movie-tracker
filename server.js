const express = require("express");
const cors = require("cors");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());

// Get port from command-line argument or default to 3000
const port = process.argv[2] || 3000;

app.get("/fetch-html", async (req, res) => {
    const username = req.query.username; // Get username from query parameters

    if (!username) {
        return res.status(400).send("Username is required");
    }

    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        await page.goto(`https://letterboxd.com/${username}`, { waitUntil: "networkidle2" });

        const html = await page.content(); // Get fully rendered HTML
        await browser.close();

        res.send(html);
    } catch (error) {
        res.status(500).send("Error fetching page");
    }
});

app.listen(port, () => console.log(`Proxy running on http://localhost:${port}`));

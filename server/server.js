const express = require("express");
const cors = require("cors");
const https = require("https");
const http = require("http");
const axios = require("axios");
const puppeteer = require('puppeteer');

const app = express();

const PORT = 3009;

app.use(
    cors({
      origin: [
        "https://lichess-tv-watch-party.vercel.app",
        "http://localhost:3000",
        '1.127.0.1',
      ],
      allowedHeaders: [
        "Accept-Version",
        "Authorization",
        "Credentials",
        "Content-Type",
      ],
      credentials: true,
    })
);
app.use(express.static('public'));  
app.use('/images', express.static('images'));
  
app.get('/screenshot', async (req, res) => {
    const browser = await puppeteer.launch({
        headless: true, args: ['--no-sandbox']
    });
    const [page] = await browser.pages(); 
    await page.goto('http://localhost:3000');
    //await page._client.send('Emulation.clearDeviceMetricsOverride');
    await page.setViewport({
        width: 1080,
        height: 1920
    })
    console.log('at page')
    await page.waitForSelector('.grid');
    const element = await page.$('.grid');
    await element.screenshot({path: 'fen.png'});
    await browser.close();
    res.sendFile('fen.png', { root: __dirname })
});

app.listen(PORT, () => {
    console.log(`Success! Your application is running on port ${PORT}.`);
});

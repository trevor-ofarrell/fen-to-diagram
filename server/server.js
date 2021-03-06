const express = require("express");
const cors = require("cors");
const puppeteer = require('puppeteer');
const shell = require('shelljs');

const app = express();
const PORT = 3009;

app.use(
    cors({
      origin: [
        "https://fen2diagram.com",
        "http://localhost:3000",
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
  try{
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process',
        '--disable-gpu'
      ]
    });
    const [page] = await browser.pages(); 
    await page.goto(`https://fen2diagram.com/diagram?fen=${req.query.fen}`);
    await page.setViewport({
        width: 1280,
        height: 1220
    })
    await page.waitForSelector('#diagram');
    const element = await page.$('#diagram');
    await element.screenshot({path: 'fen.png'});
    await page.close();
    await browser.close();
    shell.exec('pkill chrome');
    res.sendFile('fen.png', { root: __dirname })
  }catch{
    return new Error("puppeteer script failed")
  }

});

app.listen(PORT, () => {
    console.log(`Success! Your application is running on port ${PORT}.`);
});

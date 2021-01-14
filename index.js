const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.goto('https://analyticsindiamag.com/');
    await page.screenshot({path: 'output.png'});
    await browser.close();
})();

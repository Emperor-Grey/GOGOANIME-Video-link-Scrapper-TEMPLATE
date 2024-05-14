const puppeteer = require('puppeteer');

const scrapLinks = async (link) => {
    const browser = await puppeteer.launch({headless: 'new'});
    const page = await browser.newPage();

    await page.goto(link, {
        waitUntil: 'domcontentloaded',
    });

    const linkSelector = await page.evaluate(() => {
        const iframe = document
            .querySelector('#load_anime > div > div > iframe')
            .getAttribute('src');
        return iframe;
    });
    await browser.close();

    return linkSelector;
};

module.exports = scrapLinks;

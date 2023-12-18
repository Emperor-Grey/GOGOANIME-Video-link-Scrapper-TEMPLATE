const puppeteer = require('puppeteer');

const scrapLinks = async (link) => {
  const browser = await puppeteer.launch({ headless: 'new' });
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

// // Example usage:
// scrapLinks('https://anitaku.to/detective-conan-episode-1107');
module.exports = scrapLinks;

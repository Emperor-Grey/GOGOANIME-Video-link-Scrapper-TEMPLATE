const puppeteer = require('puppeteer');

const scrapMovies = async (link) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(link, {
    waitUntil: 'domcontentloaded',
  });

  // Check if the HTML contains the specified text
  const containsStreamtape = await page.evaluate(() => {
    const pTags = document.querySelectorAll('div.entry-content > p');
    for (const pTag of pTags) {
      if (pTag.textContent.includes('Streamtape')) {
        return true;
      }
    }
    return false;
  });

  // If Streamtape is found, execute the first selector
  if (containsStreamtape) {
    const firstSelector = await page.evaluate(() => {
      const first = document
        .querySelector('div.entry-content > p:nth-child(17) > a')
        .getAttribute('href');
      return first;
    });

    await page.goto(firstSelector, {
      waitUntil: 'domcontentloaded',
    });

    const secondSelector = await page.evaluate(() => {
      const second = document
        .querySelector('div > div > a')
        .getAttribute('href');
      return second;
    });

    await browser.close();

    return secondSelector;
  } else {
    await browser.close();
    return 'No links found';
  }
};

module.exports = scrapMovies;

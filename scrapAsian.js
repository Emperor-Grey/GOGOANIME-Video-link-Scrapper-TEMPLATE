const puppeteer = require('puppeteer');

const scrapAsian = async (link) => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.goto(link, {
    waitUntil: 'domcontentloaded',
  });

  const linkSelector = await page.evaluate(() => {
    const iframe = document
      .querySelector(
        'div > div.video-info-left > div.watch_play > div.play-video > iframe'
      )
      .getAttribute('src');
    return iframe;
  });

  await browser.close();
  return linkSelector;
};

// // Example usage:
// scrapAsian('https://draplay.info/videos/my-demon-2023-episode-8');
module.exports = scrapAsian;

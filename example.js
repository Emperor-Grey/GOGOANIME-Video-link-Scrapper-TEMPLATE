const AsianExtractor = require('./AsianExtractor');
const scrapAsian = require('./scrapAsian');
const scrapLinks = require('./scrapEpisodes');
const VideoExtractor = require('./VideoExtractor');
async function main() {
  // get this from gogoanime
  const link = await scrapLinks(
    'https://anitaku.to/tokyo-revengers-tenjiku-hen-episode-11'
  );

  console.log(link);

  const videoExtractor = new VideoExtractor();
  const videoUrl = new URL(link);
  videoExtractor.extract(videoUrl).then((data) => {
    console.log(data);
  });
}

async function second() {
  const link = await scrapAsian(
    'https://draplay.info/videos/my-demon-2023-episode-8'
  );
  console.log(link);

  const asian = new AsianExtractor();
  const url = new URL('https:' + link);
  asian.extract(url).then((data) => {
    console.log(data);
  });
}

// runs both concurrently
// Promise.all([main(), second()]);

main();
second();

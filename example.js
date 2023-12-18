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

main();

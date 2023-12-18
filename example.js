const { urlToHttpOptions } = require('url');
const scrapLinks = require('./scrapEpisodes');
const VideoExtractor = require('./VideoExtractor');
async function main() {
  // get this from gogoanime
  const link = await scrapLinks(
    'https://anitaku.to/detective-conan-episode-1107'
  );

  console.log(link);

  const videoExtractor = new VideoExtractor();
  const videoUrl = new URL(link);
  videoExtractor.extract(videoUrl).then((data) => {
    console.log(data);
  });
}

main();

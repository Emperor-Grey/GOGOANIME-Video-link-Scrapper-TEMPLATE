const AsianExtractor = require('./AsianExtractor');
const scrapAsian = require('./scrapAsian');
const scrapLinks = require('./scrapEpisodes');
const scrapMovies = require('./scrapMovieRulz');
const StreamTapeExtractor = require('./SteamTape');
const VideoExtractor = require('./VideoExtractor');
async function first() {
  // get this from gogoanime
  const link = await scrapLinks(
    'https://anitaku.to/dr-stone-new-world-part-2-episode-2'
  );

  const videoExtractor = new VideoExtractor();
  const videoUrl = new URL(link);
  videoExtractor.extract(videoUrl).then((data) => {
    console.log(data);
  });
}

async function second() {
  // get this from asian load now known as draplay
  const link = await scrapAsian(
    'https://draplay.info/videos/gifted-season-2-2023-episode-8'
  );

  const asian = new AsianExtractor();
  const url = new URL('https:' + link);
  asian.extract(url).then((data) => {
    console.log(data);
  });
}

// async function third() {
//   // get this from movieRulz
//   const link = await scrapMovies(
//     'https://www.5movierulz.bingo/hanuman-2024-hdrip-original-malayalam-kannada-full-movie-watch-online-free/'
//   );

//   const videoUrl = new URL(link);

//   const streamTapeExtractor = new StreamTapeExtractor();
//   streamTapeExtractor
//     .extract(videoUrl)
//     .then((sources) => {
//       console.log('Video sources:', sources);
//     })
//     .catch((error) => {
//       console.error('Error extracting video sources:', error.message);
//     });
// }

// runs all concurrently
// Promise.all([main(), second()]);

first();
second();
// third();

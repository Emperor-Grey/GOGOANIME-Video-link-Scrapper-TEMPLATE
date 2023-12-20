const axios = require('axios');
const cheerio = require('cheerio');

class StreamTapeExtractor {
  constructor() {
    this.serverName = 'StreamTape';
    this.sources = [];
  }

  async extract(videoUrl) {
    try {
      const { data } = await axios.get(videoUrl.href).catch(() => {
        throw new Error('Video not found');
      });

      const $ = cheerio.load(data);

      let [fh, sh] = $.html()
        .match(/robotlink'\).innerHTML = (.*)'/)[1]
        .split("+ ('");

      sh = sh.substring(3);
      fh = fh.replace(/\'/g, '');

      const url = `https:${fh}${sh}`;

      this.sources.push({
        url: url,
        isM3U8: url.includes('.m3u8'),
      });

      return this.sources;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = StreamTapeExtractor;

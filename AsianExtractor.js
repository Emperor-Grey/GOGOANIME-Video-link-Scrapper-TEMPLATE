const axios = require('axios');
const CryptoJS = require('crypto-js');
const cheerio = require('cheerio');

class AsianExtractor {
  constructor() {
    this.serverName = 'asianload';
    this.sources = [];
    this.keys = {
      key: CryptoJS.enc.Utf8.parse('93422192433952489752342908585752'),
      iv: CryptoJS.enc.Utf8.parse('9262859232435825'),
    };
  }

  async extract(videoUrl) {
    const res = await axios.get(videoUrl.href);
    const $ = cheerio.load(res.data);

    const encryptedParams = await this.generateEncryptedAjaxParams(
      $,
      videoUrl.searchParams.get('id') || ''
    );

    const encryptedData = await axios.get(
      `${videoUrl.protocol}//${videoUrl.hostname}/encrypt-ajax.php?${encryptedParams}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
      }
    );

    const decryptedData = await this.decryptAjaxData(encryptedData.data.data);

    if (!decryptedData.source)
      throw new Error('No source found. Try a different server.');

    decryptedData.source.forEach((source) => {
      this.sources.push({
        url: source.file,
        isM3U8: source.file.includes('.m3u8'),
      });
    });

    decryptedData.source_bk.forEach((source) => {
      this.sources.push({
        url: source.file,
        isM3U8: source.file.includes('.m3u8'),
      });
    });

    return {
      sources: this.sources,
    };
  }

  async generateEncryptedAjaxParams($, id) {
    const encryptedKey = CryptoJS.AES.encrypt(id, this.keys.key, {
      iv: this.keys.iv,
    }).toString();

    const scriptValue = $("script[data-name='crypto']").data().value;

    const decryptedToken = CryptoJS.AES.decrypt(scriptValue, this.keys.key, {
      iv: this.keys.iv,
    }).toString(CryptoJS.enc.Utf8);

    return `id=${encryptedKey}&alias=${decryptedToken}`;
  }

  async decryptAjaxData(encryptedData) {
    const decryptedData = CryptoJS.enc.Utf8.stringify(
      CryptoJS.AES.decrypt(encryptedData, this.keys.key, {
        iv: this.keys.iv,
      })
    );

    return JSON.parse(decryptedData);
  }
}

module.exports = AsianExtractor;

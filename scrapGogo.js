const cheerio = require('cheerio');
const axios = require('axios');

const fetchData = async () => {
  try {
    const result = await axios.get('https://anitaku.to/popular.html');
    return result.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const fetchDetails = async (link) => {
  try {
    const result = await axios.get(link);
    const $ = cheerio.load(result.data);

    // Extract additional details as needed
    const title = $('div.anime_info_body_bg > h1').text();
    const image = $('div.anime_info_body_bg > img').attr('src');
    const type = $('div.anime_info_body_bg > p:nth-child(4) > a').text();
    const description = $(
      '#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > p:nth-child(5)'
    )
      .text()
      .substring(14);

    const genres = [];

    // Extract genres
    $(
      '#wrapper_bg > section > section.content_left > div.main_body > div:nth-child(2) > div.anime_info_body_bg > p:nth-child(6) > a'
    ).each((i, element) => {
      const genre = $(element).text();
      genres.push(genre);
    });

    return {
      title,
      image,
      type,
      description,
      genres,
    };
  } catch (error) {
    console.error(`Error fetching details for ${link}:`, error);
    return null;
  }
};

const processPage = async () => {
  try {
    const html = await fetchData();
    const $ = cheerio.load(html);

    const data = [];

    // Use a more specific selector to target each list item
    $('div.last_episodes > ul > li').each((index, element) => {
      const link = `https://anitaku.to${$(element)
        .find('div > a')
        .attr('href')}`;
      data.push(link);
    });

    // Fetch details for each link
    const detailsPromises = data.map((link) => fetchDetails(link));
    const detailsResults = await Promise.all(detailsPromises);

    // Log the details
    console.log(detailsResults);
  } catch (error) {
    console.error('Error processing page:', error);
  }
};

// Run the process
processPage();

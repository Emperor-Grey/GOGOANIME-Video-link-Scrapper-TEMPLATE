const axios = require('axios');
const fs = require('fs');

// const videoUrl =
//   'https://tcsglobal.udemy.com/assets/34757398/files/2021-07-09_09-23-07-6e973643907576b7eec2928fdd2806ee/2/hls/AVC_1024x576_1000k_AAC-HE_64k/aa00ae5b6f7f177d16457296efb0bbeb26a0.m3u8?provider=cloudfront&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXRoIjoiMjAyMC0wOS0wMl8yMS0wNC01Ni0yODEyZjE5NzgyZDdhYTNjNjRhZGY0MTEwZmE0OThhZi8yLyIsImV4cCI6MTcwMzY3NDA2MX0.y_vaDR1WUAr5KCgwbflkfSnJn6Fjb_UOSsPYSobkTJc&v=1';

const videoUrl = 'https://www.udemy.com/assets/27558190/files/2020-09-02_21-04-56-2812f19782d7aa3c64adf4110fa498af/2/aa0013599fc88346756e1ebbcb4964b7cd5a.m3u8?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwYXRoIjoiMjAyMC0wOS0wMl8yMS0wNC01Ni0yODEyZjE5NzgyZDdhYTNjNjRhZGY0MTEwZmE0OThhZi8yLyIsImV4cCI6MTcwMzY3NDA2MX0.y_vaDR1WUAr5KCgwbflkfSnJn6Fjb_UOSsPYSobkTJc&provider=cloudfront&v=1';

axios
    .get(videoUrl, {
        responseType: 'arraybuffer', headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
            Referer: 'https://www.udemy.com',
        },
    })
    .then((response) => {
        const filePath = 'downloaded_video.mp4';
        fs.writeFileSync(filePath, response.data);
        console.log('Video downloaded successfully:', filePath);
    })
    .catch((error) => {
        console.error('Error downloading video:', error);
    });

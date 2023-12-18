# GOGOANIME VIDEO LINK Encrypt and Decoder FROM CONSUMET (Without TypeScript)

**Forked from [consumet](https://github.com/consumet)'s GitHub repository.**

## Introduction

This project provides a JavaScript implementation for extracting video sources from Gogoanime video links. It utilizes various libraries, such as CryptoJS for encryption/decryption, Axios for making HTTP requests, and Cheerio for parsing HTML content.

## Overview

The `VideoExtractor` class within the script serves as the core component. It is designed to extract video sources from a given Gogoanime video URL. The extraction process involves making requests to the Gogoanime server, decrypting AJAX parameters, and handling different types of video sources, including m3u8 files.

## Setup

Before running the script, ensure that you have the necessary libraries installed. You can install them using the following commands:

```bash
npm install crypto-js axios cheerio
```
## Usage

To use the script, follow these steps:

1. Create an instance of the `VideoExtractor` class:

   ```javascript
   const videoExtractor = new VideoExtractor();
```
2. Specify the Gogoanime video URL you want to extract sources from:

```javascript
const videoUrl = new URL('YOUR_GO_GO_ANIME_VIDEO_URL_HERE');
```
3. Call the extract method and handle the results or errors:
 ```javascript
   videoExtractor
  .extract(videoUrl)
  .then((sources) => {
    console.log('Video Sources:', sources);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });
  ```
The VideoExtractor class within the script handles the extraction process. It makes requests to the Gogoanime server, decrypts AJAX parameters, and manages various types of video sources, including m3u8 files.

## Notes

- The script handles different types of video sources, including m3u8 files.
- The `addSources` method processes and adds sources to the array, considering various conditions.
- The script supports both global and local configuration for the user's identity.

The `addSources` method in the script is responsible for processing and adding sources to the array. It distinguishes between different types of video sources and handles them accordingly. Additionally, the script allows users to configure their identity settings globally or locally.

## Disclaimer

This script is based on reverse engineering Gogoanime's website structure and may be subject to changes on the server side. Use it responsibly and be aware of any terms of service of the website.

## Acknowledgments

- Thanks to [consumet](https://github.com/consumet) for the original work.

Feel free to contribute to this project and make improvements. Happy coding!

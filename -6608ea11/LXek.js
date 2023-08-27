const axios = require('axios');

// Set up the API endpoint URL
const url = 'https://www.googleapis.com/youtube/v3/captions';
const videoId = 'G0Cp7DrvNLQ'; // Replace with the actual video ID
const apiKey = 'AIzaSyCiM-xZK2JLgnHGdFVIlY_lCeeNeRnN9uI'; // Replace with your API key

// Set up the request parameters
const params = {
  part: 'snippet',
  videoId: videoId,
  key: apiKey
};

// Make the API request
axios.get(url, { params: params })
  .then(response => {
    const captionsData = response.data;
    // Access the captions data and extract the information you need
    // Example: log the language of each caption track
    captionsData.items.forEach(item => {
      const language = item.snippet.language;
      console.log('Language:', language);
    });
  })
  .catch(error => {
    console.error('Error:', error.response.status, error.response.data);
  });

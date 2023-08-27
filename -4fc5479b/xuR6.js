const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = 'https://twitter.com/Farabi_dev/photo';
const avatarDir = './avatar';
const avatarFilename = 'Farabi_dev.png';

// Make sure the avatar directory exists
if (!fs.existsSync(avatarDir)) {
  fs.mkdirSync(avatarDir);
}

axios.get(url, { responseType: 'arraybuffer' })
  .then(response => {
    // Save the image data to a file
    const imagePath = path.join(avatarDir, avatarFilename);
    fs.writeFileSync(imagePath, response.data);
    console.log(`Profile image saved to ${imagePath}`);
  })
  .catch(error => {
    console.error(`Error fetching profile image: ${error}`);
  });

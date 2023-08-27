const profilePageUrl = 'https://twitter.com/Farabi_dev/photo'; // Replace with the profile page URL you want to fetch
const fs = require('fs')

fetch(profilePageUrl)
  .then(response => response.text())
  .then(html => {
    fs.writeFileSync('./index.html', html, 'utf-8')   
    const regex = /data-resolved-url-large="([^"]+)"/;
    const match = html.match(regex);
    if (match) {
      const profileImageUrl = match[1];
      console.log(profileImageUrl);
    } else {
      console.error('Failed to extract profile image URL');
    }
  })
  .catch(error => {
    console.error(error);
  });

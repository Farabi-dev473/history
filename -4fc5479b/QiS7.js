const profilePageUrl = 'https://twitter.com/Farabi_dev/photo'; // Replace with the profile page URL you want to fetch

fetch(profilePageUrl)
  .then(response => response.text())
  .then(html => {
    const regex = /property="og:image"\s+content="([^"]+)"/;
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

const userId = '123456789'; // Replace with the user ID you want to fetch
const url = `https://api.twitter.com/2/users/${userId}`;

const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAJXpnAEAAAAA8i9CNBmX9GOVecN0P2lv32p8OkA%3D0FsYvAweLODGOG5BE9zBOk5LsJEUP8WXQ8gFJDPnRN3TDiFK1e'; // Replace with your bearer token

fetch(url, {
  headers: {
    Authorization: `Bearer ${bearerToken}`,
  },
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

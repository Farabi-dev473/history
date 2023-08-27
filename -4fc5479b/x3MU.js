const userId = '123456789'; // Replace with the user ID you want to fetch
const url = `https://api.twitter.com/2/users/${userId}`;

const bearerToken = 'AAAAAAAAAAAAAAAAAAAAAJXpnAEAAAAAhD8PCriUSnUEBo22YiK8FLCp5iU%3D1QHcKQBnJyjHolNZt1jRD0gXP42FjhV6hNM5m34WoDbOivZJF9'; // Replace with your bearer token

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

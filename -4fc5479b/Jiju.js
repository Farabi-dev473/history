const apiKey = 'AlACMA1pnaTGdsYP84SzMZvpA'; // Replace with your API key
const apiSecret = 'Pfy0kUq43s4NJUww2uoXzQgMALUiTEK7EmYdHtDmZoxnkkoGYm'; // Replace with your API secret

const credentials = `${encodeURIComponent(apiKey)}:${encodeURIComponent(apiSecret)}`;
const encodedCredentials = btoa(credentials);

fetch('https://api.twitter.com/oauth2/token', {
  method: 'POST',
  headers: {
    Authorization: `Basic ${encodedCredentials}`,
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  },
  body: 'grant_type=client_credentials',
})
  .then(response => response.json())
  .then(data => {
    const bearerToken = data.access_token;
    console.log(bearerToken);
  })
  .catch(error => {
    console.error(error);
  });

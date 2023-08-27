// Replace these values with your own client ID and redirect URI
const CLIENT_ID = 'YOUR_CLIENT_ID_HERE';
const REDIRECT_URI = 'http://localhost:6000/auth/discord/redirect';

// The Discord authorization endpoint
const authEndpoint = 'https://discord.com/api/oauth2/authorize';

// The Discord token endpoint
const tokenEndpoint = 'https://discord.com/api/oauth2/token';

// The scopes you want to request from the user
const scopes = ['identify', 'email'];

// Generates the authorization URL
const authorizeURL = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scopes.join('%20')}`;

// Redirect the user to the authorization URL

// Once the user is redirected back to your redirect URI, exchange the authorization code for an access token
// const urlParams = new URLSearchParams(window.location.search);
// const code = urlParams.get('code');
console.log(authorizeURL)
// if (code) {
//   // Set up the request body for exchanging the authorization code for an access token
//   const requestBody = new URLSearchParams({
//     client_id: CLIENT_ID,
//     client_secret: 'YOUR_CLIENT_SECRET_HERE',
//     grant_type: 'authorization_code',
//     code: code,
//     redirect_uri: REDIRECT_URI,
//     scope: scopes.join(' ')
//   });

//   // Send a POST request to the token endpoint to exchange the authorization code for an access token
//   fetch(tokenEndpoint, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: requestBody
//   })
//     .then(response => response.json())
//     .then(data => {
//       // Use the access token to make requests to the Discord API
//       const accessToken = data.access_token;
//       // Do something with the access token...
//     })
//     .catch(error => console.error(error));
// }

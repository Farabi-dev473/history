import dotenv from 'dotenv'
import express from 'express'


const app = express()
dotenv.config()

express.Router()

const exchangeCodeForToken = async (code) => {
  // try{
    // const data = {
    //   code: requestToken,
    //   client_id: process.env.CLIENT_ID,
    //   redirect_uri: process.env.REDIRECT_URI,
    //   grant_type: 'authorization_code',
    //   code_verifier: 'something'
    // };
    

    // const response = await axios.post('https://api.twitter.com/2/oauth2/token', JSON.stringify(data), {
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded',
    //     'Authorization' : 'Basic TVRKdVJsaHFkVEZmT0ZCSVkwMWljR1IxTmxjNk1UcGphUTpDUUZJaXJHQ2x5MTFyNVRtQTcta2lWUHg1OEtPLVhGYl9UTE1EX08xN2s0dWNCSzlfZg=='
    //   },
    // })
  
    // fs.writeFileSync('./data.json', response.data)
  // }catch(err) {
    // console.log(err)
  // }

//   const createFormParams = (params) => {
//     return Object.keys(params)
//         .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//         .join('&')
// }

const access_token_url = "https://api.twitter.com/2/oauth2/token";
const redirect_uri = 'http://localhost:6000/auth/discord/redirect';
// Make a POST request to request an access token
const response = await fetch(access_token_url, {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    Authorization: `Basic ${Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString("base64")}`,
  },
  body: `code_verifier=challenge&grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
});

const data = await response.json();
const access_token = data.access_token;
console.log(data, access_token)
const userResponse = await fetch('https://api.twitter.com/2/users/me', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${access_token}`
  }
})
const user = await userResponse.json()

const userDetailsResponse = await fetch(`https://api.twitter.com/2/users/${user.id}`, {
  method: 'GET',
  headers: {
    'authorization': `Bearer ${access_token}`,
    'X-API-KEY': 'eJeF1O6iHv9WpBlthMe9EET7M',
    'X-API-SECRET-KEY': 'uKgmUqTPSHOJDajsbCwh4zQggJNOqwe3xyUEB9lnx10xCU0ogE'
  }
})
console.log("HELLo")
console.log(await userDetailsResponse.json())
}


//   axios({
//     headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//         'X-API-Key': process.env.API_KEY,
//         'Authorization': 'Basic  TVRKdVJsaHFkVEZmT0ZCSVkwMWljR1IxTmxjNk1UcGphUTpDUUZJaXJHQ2x5MTFyNVRtQTcta2lWUHg1OEtPLVhGYl9UTE1EX08xN2s0dWNCSzlfZg==' 
//     },
//     method: 'POST',
//     url: process.env.TOKEN_URL,
//     data: createFormParams({
//         grant_type: 'authorization_code',
//         client_id: process.env.CLIENT_ID,
//         code: requestToken,
//         code_verifier: 'challenge'
//     })
// }).then(response => {
//     console.log(response);
// }).catch(err => {
//     console.error(err);
//  });
// }


const CLIENT_ID = '1100261812324286646';
const CLIENT_SECRET = 'YOUR_CLIENT_SECRET_HERE';
const REDIRECT_URI = 'http://localhost:5000/auth/discord/redirect';

// The Discord authorization endpoint
const authEndpoint = 'https://discord.com/api/oauth2/authorize';

// The Discord token endpoint
const tokenEndpoint = 'https://discord.com/api/oauth2/token';

// The scopes you want to request from the user
const scopes = ['identify', 'email'];

// Generates the authorization URL
const authorizeURL = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${scopes.join('%20')}`;

app.get('/auth/discord', (req, res) => {
    res.redirect(authorizeURL)
})

app.get('/auth/discord/redirect', (req, res) => {
  // console.group
  console.log(req.query.code)
    // exchangeCodeForToken(req.query.code)
    res.end()
})

app.listen(5000)
let url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=X3dDXzlWRVlyRE1hdG5ZSXlqdmc6MTpjaQ&redirect_uri=https://www.example.com&scope=tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain`

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
const redirect_uri = 'http://localhost:5000/auth/twitter/callback';
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

console.log(user)
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

app.get('/auth/twitter', (req, res) => {
    res.redirect(`https://twitter.com/i/oauth2/authorize?response_type=code&client_id=SWFuUmZtNDVtSXFJVXdnbzZQTnY6MTpjaQ
    &redirect_uri=http://localhost:5000/auth/twitter/callback&scope=tweet.read%20users.read%20follows.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`)
})

app.get('/auth/twitter/callback', (req, res) => {
  // console.group
  console.log(req.query.code)
    // exchangeCodeForToken(req.query.code)
    res.end()
})

app.listen(5000)
let url = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=X3dDXzlWRVlyRE1hdG5ZSXlqdmc6MTpjaQ&redirect_uri=https://www.example.com&scope=tweet.read%20users.read%20follows.read%20follows.write&state=state&code_challenge=challenge&code_challenge_method=plain`

const TWITTER_LOGIN_REDIRECT_URL = process.env.TWITTER_LOGIN_REDIRECT_URL;
const TWITTER_ACCOUNT_LINK_REDIRECT_URL =
  process.env.TWITTER_ACCOUNT_LINK_REDIRECT_URL;
const TWITTER_CLIENT_ID = process.env.TWITTER_CLIENT_ID;
const TWITTER_CLIENT_SECRET = process.env.TWITTER_CLIENT_SECRET;

async function exchangeTwitterCode(code: string, isLogin: boolean) {
  let redirect_uri = TWITTER_ACCOUNT_LINK_REDIRECT_URL;
  console.log({
    TWITTER_LOGIN_REDIRECT_URL: process.env.TWITTER_LOGIN_REDIRECT_URL,
    TWITTER_ACCOUNT_LINK_REDIRECT_URL:
      process.env.TWITTER_ACCOUNT_LINK_REDIRECT_URL,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
  });
  if (isLogin) {
    redirect_uri = TWITTER_LOGIN_REDIRECT_URL;
  }

  if (!TWITTER_CLIENT_ID || !TWITTER_CLIENT_SECRET || !redirect_uri) {
    console.log('exchangeTwitterCode failed.required env missing');
    console.log('client_id: ', TWITTER_CLIENT_ID);
    console.log('client_secret: ', TWITTER_CLIENT_SECRET);
    console.log('redirect_uri: ', redirect_uri);
    throw new Error('Internal Server Error');
  }

  const response = await fetch('https://api.twitter.com/2/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      Authorization: `Basic ${Buffer.from(
        `${TWITTER_CLIENT_ID}:${TWITTER_CLIENT_SECRET}`
      ).toString('base64')}`,
    },
    body: `code_verifier=challenge&grant_type=authorization_code&code=${code}&redirect_uri=${redirect_uri}`,
  });

  return await response.json();
}

async function twitterUserDetails(accessToken: string) {
  // get the twitter user
  const response = await fetch('https://api.twitter.com/2/users/me', {
    method: 'GET',
    headers: { authorization: `Bearer ${accessToken}` },
  });

  console.log(response);

  return (await response.json())?.data;
}

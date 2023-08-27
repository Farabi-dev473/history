const https = require('https');

const options = {
  hostname: 'api.twitter.com',
  path: '/1.1/users/show.json?id=<USER_ID>',
  headers: {
    Authorization: 'Bearer <YOUR_ACCESS_TOKEN_HERE>'
  }
};

const req = https.get(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', (d) => {
    process.stdout.write(d);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();

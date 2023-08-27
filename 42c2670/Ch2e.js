// fetch todays tweets of a single person by using his/her twitter username
function getTweets(username) {
  return new Promise((resolve, reject) => {
    const url = `https://twitter.com/Al_Farabi24`;
    request(url, (error, response, html) => {
      if (!error && response.statusCode === 200) {
        const $ = cheerio.load(html);
        const tweets = [];
        $('.tweet').each((i, elem) => {
          const tweet = $(elem).find('.tweet-text').text().trim();
          tweets.push(tweet);
        });
        resolve(tweets);
      } else {
        reject(error);
      }
    });
  });
}

// call the above function & print the tweets
getTweets('realDonaldTrump').then((twittets) => console.log(twittets))
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var twitter_api_sdk_1 = require("twitter-api-sdk");
var client = new twitter_api_sdk_1.Client("AAAAAAAAAAAAAAAAAAAAAB5SngEAAAAAzMlw8eePuKp%2Bf27Ftnmi7z4tJd8%3DF3UbaSv4rtiuDUAXEsFr5CtwCf8JQNnAJNeRaTU8vJx2WJxphZ");
(async() => {
    var data = await client.users.usersIdFollowers("1zYKbnvdprVKre");
console.log(data);

})()
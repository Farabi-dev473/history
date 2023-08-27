"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var twitter_api_sdk_1 = require("twitter-api-sdk");
var client = new twitter_api_sdk_1.Client("AAAAAAAAAAAAAAAAAAAAAK6sngEAAAAASTFiYiBL33XfXeelEKW88Pq5GpQ%3D6RworoF6qtK7lDDLDHfknMP8dkOxiA8Tnm1UE05ckocmEBsL5o");
(async() => {
    var data = await client.users.usersIdFollowers("1zYKbnvdprVKre");
console.log(data);

})()
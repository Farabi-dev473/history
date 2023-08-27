import { Client } from "twitter-api-sdk";

const client = new Client(
  "AAAAAAAAAAAAAAAAAAAAAB5SngEAAAAAzMlw8eePuKp%2Bf27Ftnmi7z4tJd8%3DF3UbaSv4rtiuDUAXEsFr5CtwCf8JQNnAJNeRaTU8vJx2WJxphZ"
);

const data = await client.users.usersIdFollowers("1zYKbnvdprVKre");

console.log(data);

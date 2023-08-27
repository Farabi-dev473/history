const  Queue  = require("bull");

const redisConfig = {
    host: '127.0.0.1',
    port: 6379,
}

const mailQueue = new Queue('mail', 'redis://127.0.0.1:6379')

const main = () => {
    mailQueue.add({message: 'Hello world!'})
}

main()
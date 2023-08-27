const { Queue } = require("bull");

const mailQueue = new Queue('mail', 'redis://127.0.0.1:6379');

mailQueue.process((job) => {
    console.log('Processing mail...', job);
})
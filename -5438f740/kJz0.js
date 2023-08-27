const {YoutubeTranscript} = require('youtube-transcript')

const youtubeTranscript = new YoutubeTranscript()

const videoUrl = 'https://www.youtube.com/watch?v=G0Cp7DrvNLQ&t=16s'
const transcripts = await YoutubeTranscript.fetchTranscript(videoUrl)
console.log(transcripts)

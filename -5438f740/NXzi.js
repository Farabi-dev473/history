const {YoutubeTranscript} = require('youtube-transcript')

const youtubeTranscript = new YoutubeTranscript()

const videoUrl = 'https://www.youtube.com/watch?v=G0Cp7DrvNLQ&t=16s'

const fetchTranscriptions = async(videoUrl) => {
    const transcripts = await YoutubeTranscript.fetchTranscript(videoUrl)
    transcripts = transcripts.map(({offset, duration, text}) => {
        const transcript = {
            text,
            offset: Math.floor(offset / 1000),
            duration: Math.floor(duration / 1000)
        }
        return transcript
    })

    for(let i = 0; i < 20; i++) {
        console.log(transcripts[i])
    }
}

fetchTranscriptions(videoUrl)
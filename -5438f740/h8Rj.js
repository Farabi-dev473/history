const {YoutubeTranscript} = require('youtube-transcript')

const youtubeTranscript = new YoutubeTranscript()

const videoUrl = 'https://www.youtube.com/watch?v=G0Cp7DrvNLQ&t=16s'

const fetchTranscriptions = async(videoUrl) => {
    let transcripts = await YoutubeTranscript.fetchTranscript(videoUrl)
    transcripts = transcripts.map(({offset, duration, text}) => {
        const transcript = {
            text,
            startTime: `${Math.floor(offset / 1000)} seconds`,
            duration: `${Math.floor(duration / 1000)} seconds`
        }
        return transcript
    })

    for(let i = 0; i < 20; i++) {
        console.log(transcripts[i])
    }

    const data = await fetch('https://www.youtube.com/watch?v=G0Cp7DrvNLQ&t=16s')
    console.log(await data.json())
}

fetchTranscriptions(videoUrl)


const {YoutubeTranscript} = require('youtube-transcript')
const youtubeTranscript = new YoutubeTranscript()
const fs = require('fs')
const videoUrl = 'https://www.youtube.com/watch?v=4pO-HcG2igk&t=247s&ab_channel=TheNetNinja'

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


    fs.writeFileSync('./data.json', JSON.stringify(transcripts))
    // const data = await fetch('https://www.youtube.com/watch?v=G0Cp7DrvNLQ&t=16s')
    // const innerTubeApiKey = (await data.text())
    //     .toString()
    //     .split('"INNERTUBE_API_KEY":"')[1]
    //     .split('"')[0];
    // console.log(innerTubeApiKey)
}

fetchTranscriptions(videoUrl)

"[1] hello, [2] next what you are gonna do [3]"

"what are you gonan do "
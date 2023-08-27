import {OpenAIApi} from 'openai'
import openaiAPIConfig from "../configs/openai.config.js";
import fs from 'node:fs'
import Discord from 'discord.js'

// write down js code which sends image to a discord bot

const getAIGeneratedImage = async(prompt: string) => {
    try{
        const openai = new OpenAIApi(openaiAPIConfig)
        const result = await openai.createImage({
            prompt,
            n: 1,
            size: "1024x1024",
        })

        const imageUrl = result?.data?.data[0]?.url

        // save image to file system
        const imgResult = await fetch(imageUrl as string)
        const blob = await imgResult.blob()
        const buffer = Buffer.from(await blob.arrayBuffer())
        const fileName = `/${Date.now()}.png`
        fs.writeFileSync(`./../../images`, buffer)
        console.log(fileName)
        return './../../images/' + fileName
        
    }catch(err) {
        return (err as Error).message
    }
}

export default getAIGeneratedImage
import {OpenAIApi} from 'openai'
import openaiAPIConfig from "../configs/openai.config.js";
import fs from 'node:fs'
import OpenAIImage from '../enums/OpenAIImage.js';

// write down js code which sends image to a discord bot

const getAIGeneratedImage = async(prompt: string) => {
    try{

        // initialize openai api
        const openai = new OpenAIApi(openaiAPIConfig)
        const result = await openai.createImage({
            prompt,
            n: OpenAIImage.NUMBER_OF_IMAGES as number,
            size: OpenAIImage.IMAGE_SIZE,
        })

        const imageUrl = result?.data?.data[0]?.url

        // save image to file system
        const imagesFilePath = process.cwd() + "/public/images"
        const imgResult = await fetch(imageUrl as string)
        const blob = await imgResult.blob()
        const buffer = Buffer.from(await blob.arrayBuffer())
        const fileName = `/${Date.now()}.png`
        fs.writeFileSync(`${imagesFilePath}${fileName}`, buffer)
        return imagesFilePath + fileName
        
    }catch(err) {
        return (err as Error).message
    }
}

export default getAIGeneratedImage

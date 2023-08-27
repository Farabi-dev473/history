import getAIGeneratedImage from "./services/getAIGeneratedImage.js"
import getAIGeneratedQuote from "./services/getAIGeneratedQuote.js"

type prompType = {prompt: string}

const resolvers = {
    getQuoteFromAI: async({prompt}: prompType) => {
        return await getAIGeneratedQuote(prompt)
    },
    getImageFromAI: async({prompt}: prompType) => {
        console.log(prompt)
        const url = await getAIGeneratedImage(prompt)
        console.log(url)
        return {
            url
        }
    },
}

export default resolvers
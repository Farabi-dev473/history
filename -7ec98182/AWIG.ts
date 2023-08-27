import getAIGeneratedImage from "./services/getAIGeneratedImage.js"
import getAIGeneratedQuote from "./services/getAIGeneratedQuote.js"

type prompType = {prompt: string}

const resolvers = {
    getQuoteFromAI: async({prompt}: prompType) => {
        return await getAIGeneratedQuote(prompt)
    },
    getImageFromAI: async({prompt}: prompType) => {
        const url = await getAIGeneratedImage(prompt)
        return {
            url
        }
    },
}

export default resolvers
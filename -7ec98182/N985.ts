import getAIGeneratedImage from "./services/getAIGeneratedImage.js"
import getAIGeneratedQuote from "./services/getAIGeneratedQuote.js"

const resolvers = {
    getAIGeneratedQuote: async({prompt}: {prompt: string}) => {
        const quote = await getAIGeneratedQuote(prompt)
        return {
            quote
        }
    },
    getAIGeneratedImage: async({prompt}: {prompt: string}) => {
        const url = await getAIGeneratedImage(prompt)
        return {
            url
        }
    },
}

export default resolvers
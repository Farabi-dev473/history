import getAIGeneratedImage from "./services/getAIGeneratedImage"
import getAIGeneratedQuote from "./services/getAIGeneratedQuote"

const resolvers = {
    getAIGeneratedQuote: async(prompt: string) => {
        const quote = await getAIGeneratedQuote(prompt)
        return {
            quote
        }
    },
    getAIGeneratedImage: async(prompt: string) => {
        const url = await getAIGeneratedImage(prompt)
        return {
            url
        }
    },
}

export default resolvers
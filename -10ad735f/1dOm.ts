import { buildSchema } from "graphql"

const schema = buildSchema(
    `
    type Image {
        url: String!
    }
    
    type Query {
        getAIGeneratedQuote(prompt: String!): String!
        getAIGeneratedImage(prompt: String!): Image!
    }

    `
) 

export default schema
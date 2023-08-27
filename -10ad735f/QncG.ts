import { buildSchema } from "graphql"

const schema = buildSchema(
    `   
    type Quote {
      quote: String!
    }

    type Image {
        url: String!
    }
    
    type Query {
        getQuoteFromAI(prompt: String!): Quote!
        getImageFromAI(prompt: String!): Image!
    }

    `
) 

export default schema
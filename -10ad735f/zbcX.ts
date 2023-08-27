import { buildSchema } from "graphql"

const schema = buildSchema(
    `
    type Quote {
        id: ID
        author: String!
        quote: String!
        category: String
    }
    
    type Image {
        id: ID!
        url: String!
    }
    
    type Query {
        getQuote(requestParam: QuoteRequestParam): Quote
        getAIGeneratedQuote(prompt: String!): Quote
        getAIGeneratedImage(prompt: String!): Image
    }
    
    type QuoteRequestParam {
        author: String!
        category: String
    }    

    `
) 

export default schema
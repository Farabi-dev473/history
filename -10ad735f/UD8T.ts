import { buildSchema } from "graphql"

const schema = buildSchema(
    `
    type Quote {
        id: ID!
        author: String!
        quote: String!
        category: String
    }

    type Image {
        id: ID!
        url: String!
    }

    type Query {
        getQuote(author: String!, category: String): Quote!
    }

    type Query {
        getAIGeneratedQuote(prompt: String!): Quote!
    }

    type Query {
        getAIGeneratedImage(prompt: String!): Image!
    }

    `
) 

export default schema
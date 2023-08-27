const express = require('express')
const {graphqlHTTP} = require('express-graphql')

const app = express()

app.use('/graphql', graphqlHTTP({
    rootValue: resolvers,
    schema: schema,
    graphiql: true
}))

app.listen(4000)
const express = require('express')
const {createClient} = require('redis')

const client = createClient()

client.on('error', (err) => {
    console.log('Redis Client Error: ', err)
})

( async () => {
    await client.connect()
    await client.set('name', 'Al Farabi')
})()

console.log(await client.get('name'))

const app = express()

app.get('/:key', async (req, res) => {
    res.send(await client.get(req.params.key))
})

app.listen(4000)
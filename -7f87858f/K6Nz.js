const express = require('express')
const {createClient} = require('redis')

const client = createClient()

// client.on('error', (err) => {
//     console.log('Redis Client Error: ', err)
// })

( async () => {
    await client.connect()
})()

const app = express()
app.use(express.json())

app.get('/:key', async (req, res) => {
    res.send(await client.get(req.params.key))
})


app.post('/', async (req, res) => {
    await client.set(req.body.key, req.body.value)
    res.send('done')
})

app.listen(4000)
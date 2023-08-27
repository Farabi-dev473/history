const express = require('express')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    // console.log(req.body.user)
    console.log('HTTP GET METHOD')
    res.send("GET")
})

app.post('/', (req, res) => {
    console.log(req.body.user)
    console.log('HTTP POST METHOD')
    res.send("POST")
})

app.listen(4000, () => console.log('Server 1 is listeing'))
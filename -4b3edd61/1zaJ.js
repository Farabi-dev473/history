const express = require('express')

const app = express()

app.get('/', (req, res) => {
    res.send('Welcome to Application Home')
})

app.get('/error', (req, res) => {
    process.exit(1)
})

app.listen(4000, () => console.log('Server listeinig on port 4000'))
import express from 'express'

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Welcome to Application Home')
})

app.listen(4000, () => console.log('server listening on port 4000'))
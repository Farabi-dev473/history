const app = require('express')()

app.get('/', (req, res) => {
    const start = req.query.start
    const end =  req.query.end

    const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
    res.status(200).send({data: randomNumber})
})

app.listen(4000)
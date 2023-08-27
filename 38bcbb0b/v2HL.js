const app = require('express')()

app.get('/', (request, response) => {
    const start = request.query.start
    const end =  response.query.end

    const randomNumber = Math.floor(Math.random() * (end - start + 1)) + start;
    res.status(200).send({data: randomNumber})
})

app.listen(4000)
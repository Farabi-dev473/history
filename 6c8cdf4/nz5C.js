const http = require('http')

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.write('Welcome To Application Home')
    }

    else {
        process.exit(1)
    }
})

server.listen(4000)
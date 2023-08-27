import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: ['http://localhost:']
    }
})

io.on('connection', socket => {
    console.log('Connected a user')
})

io.listen(4000)


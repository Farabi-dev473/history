import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: ['http://127.0.0.1:5500/']
    }
})

io.on('connection', socket => {
    console.log('Connected a user')
})

io.listen(4000)


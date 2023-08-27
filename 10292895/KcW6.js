import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: '*'
    }
})

io.on('connection', socket => {
    console.log('Connected a user')
    socket.on('message', message => {
        console.log(message)
        socket.broadcast.emit('message', message)
    })
})

io.listen(4000)


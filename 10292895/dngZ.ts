import { Server } from "socket.io";

const io = new Server({})

io.on('connection', socket => {
    console.log('Connected a user')
})

io.listen(4000)


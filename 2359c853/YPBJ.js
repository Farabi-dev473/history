const amqp = require('amqplib/callback_api')

const amqp = require('amqplib/callback_api')

const connectToRabbitMQ = async () => {
    const queue = 'tasks'
    const connection = await amqp.connect('amqp://localhost:5672')

    const ch = await connection.createChannel()
    await ch.assertQueue(queue)

    ch.consume(queue, (msg) => {
        console.log(msg)
        ch.ack(msg)
    })

}
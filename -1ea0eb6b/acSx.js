const amqp = require('amqplib')

const connectToRabbitMQ = async () => {
    const queue = 'tasks'
    const connection =  await amqp.connect('amqp://localhost:5672')

    const ch = await connection.createChannel()
    await ch.assertQueue(queue)

    setInterval(() => {
        ch.sendToQueue(queue, Buffer.from("Message"), 2000)
    })
}

connectToRabbitMQ()
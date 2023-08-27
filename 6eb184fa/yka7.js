import { PrismaClient } from '@prisma/client'
import express from 'express'


const app = express()
const prisma = new PrismaClient()


app.use(express.json())

app.get('/product/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const data = await prisma.product.findUnique({
        where: {
            id: id
        },
        include: {
           productName: {
            select: {
                id: true,
                name: true
            }
           },
           videos: true,
           Review: {
            include: {
                ReviewReply: {
                    include: {
                        user: true
                    }
                },
                user: true
            }
           },
           ProductStatistics: {
            include: {
                shop: true,
                specialDay: true,
            }
           },
           ProductPayment: {
            include: {
                shopPayment: {
                    include: {
                        deliveries: true,
                        deliveryMaxDay: true,
                        deliveryMinDay: true,
                        paymentServices: true,
                        shop: true,
                        ProductPayment: true
                    }
                },
            }
           }
        }
    })

    return res.json(data)
})

app.listen(4000)
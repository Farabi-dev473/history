import { PrismaClient } from '@prisma/client'
import express from 'express'


const app = express()
const prisma = new PrismaClient()


app.use(express.json())

app.get('/product/payment/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    const data = await prisma.productPayment.findFirst({
        where: {
            productId: id,
        },
        include: {
            shopPayment: true
        }
    })

    res.json(data)
})

app.listen(4000)
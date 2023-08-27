import { PrismaClient } from '@prisma/client'
import express from 'express'
import { updateDecorator } from 'typescript'


const app = express()
const prisma = new PrismaClient()


app.use(express.json())

app.get('/product/payment/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    await prisma.productPayment.findFirst({
        where: {
            productId: id,
        },
        include: {
            shopPayment: true
        }
    })
})

app.listen(4000)
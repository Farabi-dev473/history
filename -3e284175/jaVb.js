import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()

app.get('/', async(req, res) => {
    const id = req.params.id
    const data = await prisma.shopPaymentsOnPaymentServices.findMany({
        include: {
            paymentService: true,
            shopPayment: true
        }
    })
    res.json(data)
})

app.listen(4000, () => console.log('server listening on port 4000'))
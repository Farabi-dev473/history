import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
const app = express()

app.get('/:id', async(req, res) => {
    const id = req.params.id
    await prisma.shopPaymentsOnPaymentServices.findMany()
})

app.listen(4000, () => console.log('server listening on port 4000'))
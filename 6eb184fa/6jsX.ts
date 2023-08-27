import { PrismaClient } from '@prisma/client'
import express from 'express'


const app = express()
const prisma = new PrismaClient()


app.use(express.json())

app.get('/product/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    await prisma.product.findUnique({
        where: {
            id: id
        },
        
    })
})

app.listen
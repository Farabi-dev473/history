import {faker} from '@faker-js/faker'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

(async() => {
    await prisma.mainCategories.create({
        data: {
            name: faker.name.fullName()
        }
    })
})()
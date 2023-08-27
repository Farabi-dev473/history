import { PrismaClient } from '@prisma/client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
    const data = await prisma.user.findUnique({

        where: {
            id: 5
        },

        include: {
            posts: true
        }
    })
    console.log(data)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})

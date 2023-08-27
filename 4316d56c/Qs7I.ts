import { PrismaClient } from '@prisma/client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
    const data = await prisma.user.create({
        data: {
            email: faker.internet.email(),
            name: faker.name.fullName(),
            posts: {
                create: {
                    title: faker.lorem.words(20),
                }
            },
            profile: {
                create: {
                    bio: faker.lorem.words(10)
                }
            }
        },
        include: {
            posts: true,
            profile: true
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

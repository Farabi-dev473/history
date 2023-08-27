import { PrismaClient } from '@prisma/client'
import {faker} from '@faker-js/faker'

const prisma = new PrismaClient()

async function main() {
  // ... you will write your Prisma Client queries here
  await prisma.user.create({
    data: {
        name: faker.name.fullName(),
        country: faker.address.country(),
        expert: faker.datatype.boolean(),
        products: {
            create: {
                love: faker.datatype.boolean(),
                product_id: 1,
            }
        }
    }
  })

  await prisma.product.create({
    data: {
        name: faker.commerce.productName(),
        brand: faker.company.name(),
        description: {
            short_description: faker.lorem.words(20),
            full_description: {
                first: faker.lorem.lines(3),
                mid: [
                    faker.lorem.words(10),
                    faker.lorem.words(10),
                    faker.lorem.words(10),
                    faker.lorem.words(10),
                    faker.lorem.words(10),
                    faker.lorem.words(10),
                    faker.lorem.words(10),
                    faker.lorem.words(10),
                    faker.lorem.words(10)
                ],
                last: faker.lorem.lines(6),
            }
        },
        rating: faker.datatype.float({max: 5, min: 0}),
        reviews: 100,
        product_additional_info: {
            info: [
                {
                    header: 'Product Properties',
                    operatingSystem: 'MacOS',
                    series: 'Apple Macbook Air',
                    colors: ['Gold', 'Gray', 'Silver'],
                },
                {
                    header: 'Camera',
                    webcam: true,
                    webcamResolution: '720(HD)'
                },
                {
                    header: 'Display',
                    hardDrive: 'SSD',
                    memoryCardReader: false,
                    optionalDriver: 'none'
                }
            ],
        },
        categories: ['Start', 'Computing', 'Computers', 'Laptops'],
    }
})

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

import { PrismaClient} from "@prisma/client";
import {faker} from '@faker-js/faker'
import {v4} from 'uuid'

const prisma = new PrismaClient()

const fn = async() => {
    // // await prisma.shop.create({
    //     data: {
    //         name: faker.company.name(),
    //         logoId: v4(),
    //         siteLink: faker.internet.url(),
    //     }
    // // })

    // // await prisma.user.create({
    //     data: {
    //         name: faker.name.fullName(),
    //         country: faker.address.country(),
    //         expert: faker.datatype.boolean(),
    //         image_id: v4()
    //     }
    // // })

    // // await prisma.productName.create({
    //     data: {
    //         name: faker.commerce.productName(),
    //         products: {
    //             create: {
    //                 brand: faker.company.name(),
    //                 description: {
    //                     smallDescription: faker.lorem.lines(2),
    //                     fullDescription: {
    //                         first: faker.lorem.lines(3),
    //                         mid: [faker.lorem.words(7), faker.lorem.words(8)],
    //                         last: faker.lorem.lines(5)
    //                     }
    //                 },
    //                 additionalInfo: faker.datatype.array(faker.datatype.number({min: 4, max: 8})).map(() => {
    //                    let result = {
    //                       header: faker.lorem.word(),
    //                       properties: [faker.datatype.array(faker.datatype.number({min: 3, max: 11}))].map(() => faker.lorem.word()).flat(),
    //                    }

    //                    result.values = faker.datatype.array(result.properties.length).map(() => faker.lorem.word()).flat()
    //                    return result
    //                 }).flat(),

    //                 categoryLevel: faker.datatype.array(faker.datatype.number({min: 2, max: 4})).map(() => {
    //                     return {
    //                         name: faker.lorem.word(),
    //                         link: faker.internet.url(),
    //                     }
    //                 }).flat(),
    //                 images: faker.datatype.array(faker.datatype.number({min: 2, max: 100})).map(() => v4()).flat(),
    //                 watching: faker.datatype.number(),
    //                 trending: faker.datatype.boolean(),
    //                 editon: faker.name.fullName(),
    //             }
    //         }
    //     }
    // // })

    // for(let i = 0; i < 10; i++) {
    //     await prisma.paymentService.create({
    //         data: {
    //             name: faker.lorem.word(),
    //             logoId: v4
    //         }
    //     })
    // }

    // for(let i = 0; i < 10; i++) {
    //     await prisma.deliveryService.create({
    //         data: {
    //             name: faker.name.fullName(),
    //             logoId: v4(),
    //         }
    //     })
    // }

    // await prisma.product.create({
    //     data: {
    //         productNameId: faker.datatype.number({min: 1, max: 5}),
    //         brand: faker.company.name(),
    //                 description: {
    //                     smallDescription: faker.lorem.lines(2),
    //                     fullDescription: {
    //                         first: faker.lorem.lines(3),
    //                         mid: [faker.lorem.words(7), faker.lorem.words(8)],
    //                         last: faker.lorem.lines(5)
    //                     }
    //                 },
    //                 additionalInfo: faker.datatype.array(faker.datatype.number({min: 4, max: 8})).map(() => {
    //                    let result = {
    //                       header: faker.lorem.word(),
    //                       properties: [faker.datatype.array(faker.datatype.number({min: 3, max: 11}))].map(() => faker.lorem.word()).flat(),
    //                    }

    //                    result.values = faker.datatype.array(result.properties.length).map(() => faker.lorem.word()).flat()
    //                    return result
    //                 }).flat(),

    //                 categoryLevel: faker.datatype.array(faker.datatype.number({min: 2, max: 4})).map(() => {
    //                     return {
    //                         name: faker.lorem.word(),
    //                         link: faker.internet.url(),
    //                     }
    //                 }).flat(),
    //                 images: faker.datatype.array(faker.datatype.number({min: 2, max: 100})).map(() => v4()).flat(),
    //                 watching: faker.datatype.number(),
    //                 trending: faker.datatype.boolean(),
    //                 editon: faker.name.fullName(),
    //     }
    // })

    for(let i = 1; i <= 20; i++) {
      await prisma.shopProduct.create({
        data: {
            link: faker.internet.url(),
            name: faker.lorem.words(8),
            price: faker.datatype.float(),
            productPaymentId: faker.datatype.number({min:1, max: 20}),
        }
      })    
    }

    // await prisma.productPayment.create({
    //     data: {
    //         add: faker.datatype.boolean(),
    //         productId: i,
    //         shopPaymentId:  faker.datatype.number({min: 1, max: 5}),
    //     }
    //  })  
    // await prisma.productsOnVideos.create({
    //     data: {
    //         vidoeId: i,
    //         productId: faker.datatype.number({min: 1, max: 20})
    //     }
    //   })
    // await prisma.usersOnProducts.create({
    //     data: {
    //         userId: faker.datatype.number({min: 1, max: 20}),
    //         productId: faker.datatype.number({min: 1, max: 20}),
    //         love: faker.datatype.boolean(),
    //     }
    //    })

    // await prisma.video.create({
        //     data: {
        //         embadedLink: v4()
        //     }
        //  })

    // await prisma.popularSearchesOnCategories.create({
    //     data: {
    //         categoryId: faker.datatype.number({min: 1, max: 5}),
    //         popularSearchId: i+30
    //     }
    //  })

    // await prisma.popularSearch.create({
    //     data: {
    //         text: faker.lorem.words(faker.datatype.number({min: 1, max: 5})),
    //     }
    // })

    // await prisma.category.create({
    //     data: {
    //         name: faker.lorem.word(),
            
    //     }
    // }) 
    // await prisma.shopPaymentsOnPaymentServices.create({
    //     data: {
    //         paymentServiceId: faker.datatype.number({min: 1, max: 5}),
    //         shopPaymentId: faker.datatype.number({min: 1, max: 5}),
    //     }
    //    })
    // await prisma.shopPayment.create({
    //     data: {
    //         buyerProtection: faker.datatype.boolean(),
    //         freeShiping: faker.datatype.boolean(),
    //         shopId: i,
    //         deliveryMinDayId: faker.datatype.number({min: 1, max: 7}),
    //         deliveryMaxDayId: faker.datatype.number({min: 1, max: 7}),
            
    //     }
    //    }) 

    // await prisma.paymentService.create({
    //     data: {
    //         name: faker.lorem.word(),
    //         logoId: v4(),
    //     }
    // })

    // for(let i = 1; i <= 10; i++) {
    //     await prisma.delivery.create({
    //         data: {
    //             deliveryCharge: faker.datatype.number(),
    //             deliveryMaxDayId: faker.datatype.number({min: 1, max: 7}),
    //             deliveryMinDayId: faker.datatype.number({min: 1, max: 7}),
    //             deliveryOptionId: faker.datatype.number({min: 1, max: 15}),
    //             deliveryServiceId: faker.datatype.number({min: 1, max: 10}),
    //             deliveryTypeId: faker.datatype.number({min: 1, max: 6}),
    //         }
    //     })
    // }
    // await prisma.dei.create({
    //     data: {
    //         day: i,

    //     }
    // })
    // await prisma.deliveryOption.create({
    //     data: {
    //         name: faker.name.fullName(),
    //     }
    // })

    // await prisma.deliveryType.create({
    //     data: {
    //         name: faker.name.fullName()
    //     }
    // })




}

fn()
import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import PQueue from "p-queue"
import getSpaceData from "../services/getSpaceData.js"


const prisma = new PrismaClient()
const spaceQueue = new PQueue()


// const spaceController2 = async (req: Request, res: Response) => {

//     const isValid = req.body.spaceIds instanceof Array
//     if(!isValid) return "Invalid request body"

//     const {spaceIds} = req.body
//     const spaceQueue = new PQueue({concurrency: spaceIds.length})

    

//     spaceIds.forEach(async(spaceId: string) => {

//         const data = await getSpaceData(spaceId)
//         const state = data?.data?.audioSpace?.metadata?.state
        
//         if(typeof state !== "string") {
//            res.status(400).send({message: "There is no space"})
//         }

//         if(state.toLowerCase() !== "running") {
//            res.status(200).send({message: "Space has been already closed"})
//         }

        
//         const {title, started_at} = data?.data?.audioSpace?.metadata
//         const {data: {audioSpace}} = data
//         const {admins, speakers, listeners} = audioSpace?.participants
//         const admin = admins[0]
//         admins?.shift()


//         const liveListeners = listeners.map(({display_name, twitter_screen_name}: any) => {
//             return {
//                 spaceId,
//                 display_name,
//                 user_name: twitter_screen_name,
//                 role: 'LISTENER',
//             }
//         })
//         const liveSpeakers = speakers.map(({display_name, twitter_screen_name}: any) => {
//             return {
//                 spaceId,
//                 display_name,
//                 user_name: twitter_screen_name,
//                 role: 'SPEAKER',
//             }
//         })
//         const liveCoHosts = admins.map(({display_name, twitter_screen_name}: any) => {
//             return {
//                 spaceId,
//                 display_name,
//                 user_name: twitter_screen_name,
//                 role: 'CO_HOST',
//             }
//         })
//         const liveAdmin = {
//             spaceId,
//             display_name: admin.display_name,
//             user_name: admin.twitter_screen_name,
//             role: 'HOST',
//         }
       
//         const liveMembers = [liveAdmin, ...liveCoHosts, ...liveListeners, ...liveSpeakers]
//         // insert data into space
//         // await prisma.space.create({
//         //     data: {
//         //         id: spaceId,
//         //         started_at,
//         //         title,
//         //         members: {
//         //             createMany: {
//         //                 data: liveMemberNames.map((member) => {
//         //                     return {
//         //                         name: member.name,
//         //                         role: member.role.toUpperCase(),
//         //                         time: member.start || new Date(),
//         //                         spaceId
//         //                     }
//         //                 })
//         //             }
//         //         } 
//         //     }
//         // })

//         await prisma.space.create({
//             data: {
//                 id: spaceId,
//                 title,
//                 started_at: new Date(started_at)
//             }
//         })
       
//         await prisma.members.createMany({
//             data: liveMembers,
//             skipDuplicates: true
//         })

//         const handleSpace = (spaceId: string) => {
//             const intervalId = setInterval( async () => {

//                   const space = await getSpaceData(spaceId)
//                   const audioSpace = space?.data?.audioSpace
//                   const {state, endeded_at} = audioSpace?.metadata

//                   if(state.toLowerCase() !== 'running') {
//                     await prisma.space.update({
//                         where: {
//                             id: spaceId,
//                         },
//                         data: {
//                             endeded_at
//                         }
//                     })
//                     clearInterval(intervalId)
//                   }

//                   const memberNames = (await prisma.members.findMany({
//                     where: {
//                         spaceId
//                     },
//                     select: {
//                         display_name: true,
//                     }
//                   })).map(({display_name}) => display_name)

//                   const {admins, speakers, listeners} = audioSpace?.participants
//                   const admin = admins[0]?.display_name
//                   admins.shift()

//                   const liveMemberNames = [
//                     admin,
//                     ...admins.map(({display_name}: any) => display_name),
//                     ...speakers.map(({display_name}: any) => display_name),
//                     ...listeners.map(({display_name}: any) => display_name),   
//                   ]

//                   const liveMembersData = [
//                     ...speakers.map(({display_name,twitter_screen_name}: any) => {
//                         return {
//                             display_name,
//                             role: 'SPEAKER',
//                             user_name: twitter_screen_name,
//                             spaceId,
//                         }
//                     }),
//                     ...listeners.map(({display_name,twitter_screen_name}: any) => {
//                         return {
//                             display_name,
//                             role: 'LISTENER',
//                             user_name: twitter_screen_name,
//                             spaceId,
//                         }
//                     }),
                    
//                     ...admins.map(({display_name,twitter_screen_name}: any) => {
//                         return {
//                             display_name,
//                             role: 'CO_HOST',
//                             user_name: twitter_screen_name,
//                             spaceId
//                         }
//                     })
                    
//                   ]


//                   const membersToUpdate: string[] = []

//                   memberNames.forEach((name) => {
//                     if(liveMemberNames.includes(name)) {
//                         membersToUpdate.push(name)
//                     }
//                   })

//                   const newMembersData = liveMembersData.filter(({name}) => !memberNames.includes(name))

//                   // update time who were still in the space
//                   if(membersToUpdate.length > 0) {
//                     await prisma.members.updateMany({
//                         where: {
//                             name: {
//                                 in: membersToUpdate
//                             }
//                         },
//                         data: {
//                            time: {
//                             increment: parseInt(process.env.INTERVAL_TIME as string)
//                            }
//                         }
//                     })
//                   }



//                   // create new members data 
//                   if(newMembersData.length > 0) {
//                     await prisma.members.createMany({
//                         data: newMembersData,
//                         skipDuplicates: true
//                     })
//                   }
                  
//             }, parseInt(process.env.INTERVAL_TIME as string) * 60000)
//         }

//         res.status(200).send({message: "Started"})
//         // spaceQueue.add(() => {
//         //     const intervalId = setInterval(async() => {

//         //         const membersToUpdate: string[] = []
//         //         const newMembers: string[] = []
//         //         const updatedTime = new Date((new Date().getTime() - parseInt(process.env.INTERVAL_TIME as string)))
//         //         const spaceData = await getSpaceData(spaceId)

//         //         const memberNames = await prisma.members.findMany({
//         //             where: {
//         //               spaceId
//         //             },
//         //             select: {
//         //               name: true
//         //             }
//         //         })


//         //         const names = liveMemberNames.map(({name}) => name)

//         //         memberNames.forEach(({name}: any) => {
//         //             if(!names.includes(name)) {
//         //                 membersToUpdate.push(name)
//         //             }else{
//         //                 membersToCreate.push(name)
//         //             }
//         //         })

//         //         if(membersToUpdate.length > 0) {
//         //             await prisma.members.updateMany({
//         //                 where: {
//         //                   name: {
//         //                     in: membersToUpdate
//         //                   }
//         //                 } ,
//         //                 data: {
//         //                   time: updatedTime
//         //                 }
//         //             })
//         //         }

//         //         if(membersToCreate.length > 0) {

//         //         }

                
//         //     }, parseInt(process.env.INTERVAL_TIME as string))
//         // })

//         spaceQueue.add(() => {
//             handleSpace(spaceId)
//         })
        
//     })
// }

const getLiveMembers = ({spaceId, listeners, speakers, admins: coHosts, admin}: any) => {

    return [
        {
            display_name: admin?.display_name,
            user_name: admin?.twitter_screen_name,
            role: 'HOST',
            spaceId
        },
        ...speakers.map(({display_name,twitter_screen_name}: any) => {
            return {
                display_name,
                role: 'SPEAKER',
                user_name: twitter_screen_name,
                spaceId,
            }
        }),
        ...listeners.map(({display_name,twitter_screen_name}: any) => {
            return {
                display_name,
                role: 'LISTENER',
                user_name: twitter_screen_name,
                spaceId,
            }
        }),
        
        ...coHosts.map(({display_name,twitter_screen_name}: any) => {
            return {
                display_name,
                role: 'CO_HOST',
                user_name: twitter_screen_name,
                spaceId
            }
        })
        
      ]

}

const handleSpace = (spaceId: string) => {

    const intervalId = setInterval(async () => {

        const spaceData = await getSpaceData(spaceId)
        const audioSpace = spaceData?.data?.audioSpace
        const {state, endeded_at} = audioSpace?.metadata
        

        if(state.toLowerCase() !== 'running') {
            await prisma.space.update({
                where: {
                    id: spaceId,
                },
                data: {
                    endeded_at
                }
            })
            clearInterval(intervalId)
        }

        const memberNames = (await prisma.members.findMany({
            where: {
                spaceId
            },
            select: {
                display_name: true,
            }
        })).map(({display_name}) => display_name)

        const {listeners, speakers, admins} = audioSpace?.participants
        const admin = admins[0]
        admins.shift()

        const liveMemberNames = [
            admin.display_name,
            ...admins.map(({display_name}: any) => display_name),
            ...speakers.map(({display_name}: any) => display_name),
            ...listeners.map(({display_name}: any) => display_name),   
        ]

        const liveMembersData = getLiveMembers({spaceId, listeners ,speakers, admins, admin})

        const membersToUpdate: string[] = []

        memberNames.forEach((name) => {
          if(liveMemberNames.includes(name)) {
              membersToUpdate.push(name)
          }
        })

        const newMembersData = liveMembersData.filter(({name}) => !memberNames.includes(name))

        // update time who were still in the space
        if(membersToUpdate.length > 0) {
            
          await prisma.members.updateMany({
              where: {
                  display_name: {
                      in: membersToUpdate
                  }
              },
              data: {
                 time: {
                  increment: parseInt(process.env.INTERVAL_TIME as string)
                 }
              }
          })
        }

        // create new members data 
        if(newMembersData.length > 0) {
            await prisma.members.createMany({
                data: newMembersData,
                skipDuplicates: true
            })
          }

    }, parseInt(process.env.INTERVAL_TIME as string) * 6000)
}


const spaceController = async (req: Request, res: Response) => {

    const shouldProcess = req.body.spaceIds instanceof Array
    if(!shouldProcess) res.sendStatus(400).send({err: 'Request body is invalid'})

    const {spaceIds} = req.body
    spaceQueue.concurrency = spaceIds.length
    
    spaceIds.forEach(async (spaceId: string) => {
      
        const spaceData = await getSpaceData(spaceId)

        const {data: {audioSpace}} = spaceData
        const {title, state, started_at} = audioSpace?.metadata
        const {admins, speakers, listeners} = audioSpace?.participants
        const admin = admins[0]
        admins?.shift()

        if(state.toLowerCase() !== "running") {
            res.status(200).send({message: "Space has been already closed"})
        }

        const liveMembers = getLiveMembers({spaceId, listeners, speakers, admins, admin})
        const space = await prisma.space.findFirst({where: {id: spaceId}})

        if(!space?.id) {
            await prisma.space.create({
                data: {
                    id: spaceId,
                    title,
                    started_at: new Date(started_at)
                }
            })

            await prisma.members.createMany({
                data: liveMembers,
                skipDuplicates: true
            })

        }

        spaceQueue.add(() => {
            handleSpace(spaceId)
        })
    })
}

export default spaceController
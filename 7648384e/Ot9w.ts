import { Prisma, PrismaClient } from "@prisma/client"
import { Request, Response } from "express"
import PQueue from "p-queue"
import getSpaceData from "../services/getSpaceData.js"

const prisma = new PrismaClient()

const spaceController = async (req: Request, res: Response) => {

    const isValid = req.body.spaceIds instanceof Array
    if(!isValid) return "Invalid request body"

    const {spaceIds} = req.body
    const spaceQueue = new PQueue({concurrency: spaceIds.length})

    

    spaceIds.forEach(async(spaceId: string) => {

        const data = await getSpaceData(spaceId)
        const state = data?.data?.audioSpace?.metadata?.state
        
        if(typeof state !== "string") {
           res.status(400).send({message: "There is no space"})
        }

        if(state.toLowerCase() !== "running") {
           res.status(200).send({message: "Space has been already closed"})
        }

        
        const {title, started_at} = data?.data?.audioSpace?.metadata
        const {data: {audioSpace}} = data
        const {admins, speakers, listeners} = audioSpace?.participants
        const admin = admins[0]
        admins?.shift()


        const liveListeners = listeners.map(({display_name, twitter_screen_name}: any) => {
            return {
                spaceId,
                display_name,
                username: twitter_screen_name,
                role: 'LISTENER',
            }
        })
        const liveSpeakers = speakers.map(({display_name, twitter_screen_name}: any) => {
            return {
                spaceId,
                name: display_name,
                username: twitter_screen_name,
                role: 'SPEAKER',
            }
        })
        const liveCoHosts = admins.map(({display_name, twitter_screen_name}: any) => {
            return {
                spaceId,
                name: display_name,
                username: twitter_screen_name,
                role: 'CO_HOST',
            }
        })
        const liveAdmin = {
            spaceId,
            display_name: admin.display_name,
            username: admin.twitter_screen_name,
            role: 'HOST',
        }
       
        const liveMembers = [liveAdmin, ...liveCoHosts, ...liveListeners, ...liveSpeakers]
        // insert data into space
        // await prisma.space.create({
        //     data: {
        //         id: spaceId,
        //         started_at,
        //         title,
        //         members: {
        //             createMany: {
        //                 data: liveMemberNames.map((member) => {
        //                     return {
        //                         name: member.name,
        //                         role: member.role.toUpperCase(),
        //                         time: member.start || new Date(),
        //                         spaceId
        //                     }
        //                 })
        //             }
        //         } 
        //     }
        // })

        await prisma.space.create({
            data: {
                id: spaceId,
                title,
                started_at: new Date(started_at)
            },
        })
       
        await prisma.members.createMany({
            data: liveMembers,
            skipDuplicates: true
        })

        const handleSpace = (spaceId: string) => {
            const intervalId = setInterval( async () => {

                  const space = await getSpaceData(spaceId)
                  const audioSpace = space?.data?.audioSpace
                  const {state, endeded_at} = audioSpace?.metadata

                  if(state.toLowerCase() !== 'running') {
                    console.log('Space has been ended')

                    await prisma.space.update({
                        where: {
                            id: spaceId,
                        },
                        data: {
                            endeded_at
                        }
                    })
                    clearInterval(intervalId)
                    console.log('Space has been ended')

                  }

                  const memberNames = (await prisma.members.findMany({
                    where: {
                        spaceId
                    },
                    select: {
                        name: true,
                    }
                  })).map(({name}) => name)

                  const {admins, speakers, listeners} = audioSpace?.participants
                  const admin = admins[0]?.display_name
                  admins.shift()

                  const liveMemberNames = [
                    admin,
                    ...admins.map(({display_name}: any) => display_name),
                    ...speakers.map(({display_name}: any) => display_name),
                    ...listeners.map(({display_name}: any) => display_name),   
                  ]

                  const liveMembersData = [
                    ...speakers.map(({display_name}: any) => {
                        return {
                            name: display_name,
                            role: 'SPEAKER',
                            spaceId,
                        }
                    }),
                    ...listeners.map(({display_name}: any) => {
                        return {
                            name: display_name,
                            role: 'LISTENER',
                            spaceId,
                        }
                    }),
                    
                    ...admins.map(({display_name}: any) => {
                        return {
                            name: display_name,
                            role: 'CO_HOST',
                            spaceId,
                        }
                    })
                    
                  ]


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
                            name: {
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
                  
            }, parseInt(process.env.INTERVAL_TIME as string) * 60000)
        }

        res.status(200).send({message: "Started"})
        // spaceQueue.add(() => {
        //     const intervalId = setInterval(async() => {

        //         const membersToUpdate: string[] = []
        //         const newMembers: string[] = []
        //         const updatedTime = new Date((new Date().getTime() - parseInt(process.env.INTERVAL_TIME as string)))
        //         const spaceData = await getSpaceData(spaceId)

        //         const memberNames = await prisma.members.findMany({
        //             where: {
        //               spaceId
        //             },
        //             select: {
        //               name: true
        //             }
        //         })


        //         const names = liveMemberNames.map(({name}) => name)

        //         memberNames.forEach(({name}: any) => {
        //             if(!names.includes(name)) {
        //                 membersToUpdate.push(name)
        //             }else{
        //                 membersToCreate.push(name)
        //             }
        //         })

        //         if(membersToUpdate.length > 0) {
        //             await prisma.members.updateMany({
        //                 where: {
        //                   name: {
        //                     in: membersToUpdate
        //                   }
        //                 } ,
        //                 data: {
        //                   time: updatedTime
        //                 }
        //             })
        //         }

        //         if(membersToCreate.length > 0) {

        //         }

                
        //     }, parseInt(process.env.INTERVAL_TIME as string))
        // })

        spaceQueue.add(() => {
            handleSpace(spaceId)
        })
        
    })
}

export default spaceController
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


        const liveListeners = listeners.map(({display_name, start}: any) => {
            return {
                name: display_name,
                role: 'listener',
            }
        })
        const liveSpeakers = speakers.map(({display_name, start}: any) => {
            return {
                name: display_name,
                role: 'speaker',
            }
        })
        const liveCoHosts = admins.map(({display_name, start}: any) => {
            return {
                name: display_name,
                role: 'co_host',
            }
        })
        const liveAdmin = {
            name: admin.display_name,
            role: 'host',
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
            }
        })
       
        await prisma.members.createMany({
            data: liveMembers
        })

        const handleSpace = (spaceId: string) => {
            const intervalId = setInterval( async () => {

                  const space = await getSpaceData(spaceId)
                  const audioSpace = space?.data?.audioSpace
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
                            role: 'speaker',
                            spaceId,
                        }
                    }),
                    ...listeners.map(({display_name}: any) => {
                        return {
                            name: display_name,
                            role: 'listener',
                            spaceId,
                        }
                    }),
                    
                    ...admins.map(({display_name}: any) => {
                        return {
                            name: display_name,
                            role: 'co_host',
                            spaceId,
                        }
                    })
                    
                  ]


                  const membersToUpdate: string[] = []
                  const membersToCreate: string[] = []

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
                            increment: parseInt(process.env.INTERVAL_TIME_MS as string)
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
                  
            })
        }

        res.status(200).send({message: "Started"})
        // spaceQueue.add(() => {
        //     const intervalId = setInterval(async() => {

        //         const membersToUpdate: string[] = []
        //         const newMembers: string[] = []
        //         const updatedTime = new Date((new Date().getTime() - parseInt(process.env.INTERVAL_TIME_MS as string)))
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

                
        //     }, parseInt(process.env.INTERVAL_TIME_MS as string))
        // })

        spaceQueue.add(() => {
            handleSpace(spaceId)
        })
        
    })
}

export default spaceController
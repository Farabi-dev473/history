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


        const liveListenerNames = listeners.map(({display_name, start}: any) => {
            return {
                name: display_name,
                role: 'listener',
                start
            }
        })
        const liveSpeakerNames = speakers.map(({display_name, start}: any) => {
            return {
                name: display_name,
                role: 'speaker',
                start
            }
        })
        const liveCoHostNames = admins.map(({display_name, start}: any) => {
            return {
                name: display_name,
                role: 'co_host',
                start
            }
        })
    
       
        const liveMemberNames = [{name: admin.display_name, role: 'host'},...liveCoHostNames, ...liveListenerNames, ...liveSpeakerNames]
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

        const membersToCreate = liveMemberNames.map((member) => {
            return {
                name: member.name,
                role: member.role.toUpperCase(),
                time: new Date(),
                spaceId
            }
        })

        console.log(membersToCreate)

        await prisma.members.createMany({
            data: membersToCreate
        })

        res.status(200).send({message: "Started"})
        spaceQueue.add(() => {
            const intervalId = setInterval(async() => {

                const membersToUpdate: string[] = []
                const newMembers: string[] = []
                const updatedTime = new Date((new Date().getTime() - parseInt(process.env.INTERVAL_TIME_MS as string)))
                const spaceData = await getSpaceData(spaceId)

                const memberNames = await prisma.members.findMany({
                    where: {
                      spaceId
                    },
                    select: {
                      name: true
                    }
                })

                memberNames.forEach(({name}) => {
                    if(!liveMemberNames.includes(name)) membersToUpdate.push(name)
                    else newMembers.push(name)
                } )

                if(membersToUpdate.length > 0) {
                    await prisma.members.updateMany({
                        where: {
                          name: {
                            in: membersToUpdate
                          }
                        } ,
                        data: {
                          time: updatedTime
                        }
                    })
                }

                
            }, parseInt(process.env.INTERVAL_TIME_MS as string))
        })
    })
}

export default spaceController
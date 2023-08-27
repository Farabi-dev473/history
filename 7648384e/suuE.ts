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
        const state = data?.audioSpace?.metadata?.state

        if(typeof state !== "string") {
           res.status(400).send({message: "There is no space"})
        }

        if(state.toLowerCase() !== "running") {
           res.status(200).send({message: "Space has been already closed"})
        }

        
        const {title, started_at} = data?.audioSpace?.metadata
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
    
       
        const liveMemberNames = [...liveCoHostNames, ...liveListenerNames, ...liveSpeakerNames]
        // insert data into space
        await prisma.space.create({
            data: {
                id: spaceId,
                started_at,
                title,
                members: {
                    createMany: {
                        data: liveMemberNames.map((member) => {
                            return {
                                name: member.name,
                                role: member.role,
                                time: member.start || new Date(),
                                spaceId
                            }
                        })
                    }
                } 
            }
        })

        spaceQueue.add(() => {
            const intervalId = setInterval(() => {
                
            })
        })
    })
}

export default spaceController
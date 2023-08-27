
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getWinners = async (spaceId: string) => {

    const members = await prisma.members.findMany({
        where: {spaceId, AND: {
            role: {
                not: {equals: 'HOST'}
            }
        }}
    })


}
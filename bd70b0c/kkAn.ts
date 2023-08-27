
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getWinners = async (spaceId: string, options: any) => {
    
    const {numOfWinners, exceptedRoles} = options
    const winners = new Set()

    const members = await prisma.members.findMany({
        where: {spaceId, AND: {
            role: {
                not: {notIn: exceptedRoles}
            }
        }}
    })

    if(members.length >= numOfWinners) {
        while(winners.size != numOfWinners)  {
            const randomIndex = Math.floor(Math.random() * members.length)
            winners.add(members[randomIndex])
        }
    }

    return winners
}
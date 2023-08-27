
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const getWinners = async (spaceId: string, options: any) => {
    
    const {numOf}
    const members = await prisma.members.findMany({
        where: {spaceId, AND: {
            role: {
                not: {notIn: options.exceptRoles}
            }
        }}
    })

    
}
import { prisma } from '@/library/third-party/global-prisma-client'
import { User } from '@prisma/client'

export async function getUserByEmail(userEmail: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
        where: { email: userEmail },
    })
    return user
}

import { prisma } from '../../third-party/global-prisma-client'

export async function getCustomerStripeIdByEmail(email: string): Promise<string | undefined> {

    const user = await prisma.user.findUnique({
        where: { email: email },
    })

    if (user && user.stripeId) {
        return user.stripeId
    }
    return undefined
}

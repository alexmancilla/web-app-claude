import { prisma } from '@/library/third-party/global-prisma-client'

// Invalidates previous tokens and generates & returns new Verification Token
export async function generateVerificationToken(email: string): Promise<string> {
    
    await deactivePreviousTokens(email)
    const token = await prisma.verificationToken.create({
        data: {
            email: email,
        },
    })
    return token.id
}

async function deactivePreviousTokens(email: string): Promise<void> {
    // Find and deactivate any previous tokens for the user before creating new token
    const userTokens = await prisma.verificationToken.findMany({
        where: {
            email: email,
            activatedAt: null,
        },
    })

    if (userTokens.length > 0) {
        // Deactivate previous tokens by setting the activation date to now (as only activatedAt:null are valid tokens)
        for (const token of userTokens) {
            await prisma.verificationToken.update({
                where: { id: token.id },
                data: { activatedAt: new Date() },
            })
        }
    }
}

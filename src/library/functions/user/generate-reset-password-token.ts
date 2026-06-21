import { prisma } from "@/library/third-party/global-prisma-client"

// Invalidates previous tokens and generates & returns new Password Reset Token
export async function generateResetPasswordToken(email: string): Promise<string> {

    await deactivatePreviousTokens(email);
    const resetToken = await prisma.passwordResetToken.create({
        data: {
            email: email,
        },
    });
    return resetToken.id;
}

async function deactivatePreviousTokens(email: string): Promise<void> {
    // Find and deactivate any previous tokens for the user before creating new token
    const userTokens = await prisma.passwordResetToken.findMany({
        where: {
            email: email,
            resetAt: null,
        },
    });
    if (userTokens.length > 0) {
        // Deactivate previous tokens by setting the activation date to now (as only activatedAt:null are valid tokens)
        for (const token of userTokens) {
            await prisma.passwordResetToken.update({
                where: { id: token.id },
                data: { resetAt: new Date() },
            });
        }
    }
}

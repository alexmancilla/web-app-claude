import { getServerSession } from "next-auth"
import { prisma } from "@/library/third-party/global-prisma-client"
import { VERIFICATION_RESULT } from "../../types"
import { User } from "@prisma/client";

// Check if user not logged in and token exits -->
// Find valid user from token in database --> 
// If valid token/user - verify user in database and invalidate token .
export async function checkAccountVerification(tokenId: string): Promise<{ success: boolean, data: string }> {

    // Check session and token 
    const session = await getServerSession()
    if (session) {
        return { success: false, data: VERIFICATION_RESULT.ALREADY_LOGGED_IN } // Already verified if you can log in
    }
    if (!tokenId) {
        return { success: false, data: VERIFICATION_RESULT.MISSING_TOKEN }
    }

    // Find valid user/token combo
    const user = await findUserFromToken(tokenId)
    if (!user) {
        const reason = await checkReasonForInvalidToken(tokenId)
        return { success: false, data: reason }
    }
    console.log("Check verify token: Found user", { email: user.email })

    // verify user and invalidate token simultaneously
    await updateUserAndInvalidateToken(user.email, tokenId)
    return { success: true, data: user.email }
}

async function findUserFromToken(tokenId: string): Promise<User | null> {

    // find user associated to valid token (VALID TOKEN = not activated yet + created within 4hrs + matching token passed in)
    const user = await prisma.user.findFirst({
        where: {
            VerificationToken: {
                some: {
                    AND: [
                        {
                            activatedAt: null,
                        },
                        {
                            createdAt: {
                                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
                            },
                        },
                        {
                            id: tokenId
                        },
                    ],
                },
            },
        },
    })
    return user
}

async function checkReasonForInvalidToken(tokenId: string): Promise<string> {

    // try to find user associated with token (regardless of validity)
    const activeUser = await prisma.user.findFirst({
        where: {
            VerificationToken: {
                some: {
                    AND: [
                        {
                            id: tokenId
                        },
                    ],
                },
            },
        },
    })

    if (!activeUser) {
        return VERIFICATION_RESULT.INVALID_TOKEN
    }

    if (activeUser.verified == true) {
        return VERIFICATION_RESULT.ALREADY_VERIFIED
    }

    return VERIFICATION_RESULT.INVALID_TOKEN
}

async function updateUserAndInvalidateToken(email: string, tokenId: string): Promise<void> {

    await prisma.$transaction([
        prisma.user.update({
            where: {
                email: email,
            },
            data: {
                verified: true,
            },
        }),
        prisma.verificationToken.update({
            where: {
                id: tokenId,
            },
            data: {
                activatedAt: new Date(),
            },
        }),
    ]);
    return
}
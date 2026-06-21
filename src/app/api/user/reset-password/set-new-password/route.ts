import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/library/third-party/global-prisma-client'
import { PasswordResetToken } from '@prisma/client'
import { RESET_PASSWORD_RESULT } from '@/library/types'

// Pull token from request query param and user's new password from request body ->
// Check token validity in database ->
// Reset the password in the database .
export async function POST(req: NextRequest) {

    // Get details from request
    const body = await req.json()
    const newPassword = body.password
    const { searchParams } = new URL(req.url)
    const resetTokenId = searchParams.get('token')
    if (!newPassword || !resetTokenId) {
        console.warn("Missing details to continue setting a new password", { newPassword, resetTokenId })
        return NextResponse.json({ message: RESET_PASSWORD_RESULT.MISSING_DETAILS }, { status: 400 })
    }

    try {
        // Check if token is valid 
        const tokenObject = await tokenValidCheck(resetTokenId)
        if (!tokenObject) {
            return NextResponse.json({ message: RESET_PASSWORD_RESULT.INVALID_TOKEN }, { status: 401 })
        }

        // Reset password
        await resetPassInDb(newPassword, tokenObject)
        return NextResponse.json({ message: RESET_PASSWORD_RESULT.RESET_SUCCESSFUL, status: 200 })

    } catch (error) {
        console.error('Error processing password reset request:', { error })
        return NextResponse.json({ message: RESET_PASSWORD_RESULT.INTERNAL_ERROR }, { status: 500 })
    }
}

async function tokenValidCheck(resetTokenId: string): Promise<PasswordResetToken | null> {

    // find matching token in the database
    const databaseToken = await prisma.passwordResetToken.findFirst({
        where: {
            id: resetTokenId,
            createdAt: {
                gt: new Date(Date.now() - 1000 * 60 * 60 * 4), // Filter by createdAt within the last 4 hours
            },
            resetAt: null, // Filter for tokens where resetAt is null
        },
    })

    return databaseToken //will be null if nothing matching
}

async function resetPassInDb(newPassword: string, resetToken: PasswordResetToken): Promise<void> {

    const hashedNewPassword = await bcrypt.hash(newPassword, +process.env.SALT_ROUNDS!)

    await prisma.$transaction([
        // update password
        prisma.user.update({
            where: { email: resetToken.email },
            data: { password: hashedNewPassword },
        }),
        // invalidate token
        prisma.passwordResetToken.update({
            where: { id: resetToken.id },
            data: { resetAt: new Date() },
        }),
    ])

    console.log('Password reset successful for user:', { email: resetToken.email })
    return
}

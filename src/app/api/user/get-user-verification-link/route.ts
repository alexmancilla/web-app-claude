import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/library/third-party/global-prisma-client'
import { generateVerificationToken } from '../../../../library/functions/user/generate-verify-token'
import { sendVerificationEmail } from '@/library/functions/email/send-verification-email'
import { VERIFICATION_RESULT } from '@/library/types'

// Get email from request ->
// Check existing user exists and is not already verified ->
// Generate token and send verification email .
export async function POST(req: NextRequest) {

    const body = await req.json()
    const email = body.email
    if (!email) {
        console.warn("Missing email to send a password reset link", { email })
        return NextResponse.json({ message: VERIFICATION_RESULT.BAD_REQUEST }, { status: 400 })
    }

    try {
        // Check of the existing user
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });
        if (!existingUser) {
            return NextResponse.json({ message: VERIFICATION_RESULT.NO_USER, status: 404 })
        }
        if (!existingUser.verified) {
            return NextResponse.json({ message: VERIFICATION_RESULT.ALREADY_VERIFIED, status: 200 })
        }

        // Generate token and send verification email
        const tokenId = await generateVerificationToken(email)
        await sendVerificationEmail(email, tokenId) //true or error
        console.log("Sent verification email link successfully", { email, token: tokenId })

        // Success response
        return NextResponse.json(
            { message: VERIFICATION_RESULT.VERIFY_SUCCESSFUL },
            { status: 200 }
        );
    }
    catch (error) {
        console.error(`Failed to send user an account verification email`, { email, error })
        return NextResponse.json(
            { message: VERIFICATION_RESULT.INTERNAL_ERROR },
            { status: 500 }
        );
    }
}

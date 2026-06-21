import { prisma } from "@/library/third-party/global-prisma-client"
import { NextRequest, NextResponse } from 'next/server';
import { AUTH_RESULT, RESET_PASSWORD_RESULT } from "@/library/types";
import { generateResetPasswordToken } from "@/library/functions/user/generate-reset-password-token";
import { sendResetPasswordRequestEmail } from "@/library/functions/email/send-reset-pass-request-email";

// Get email from request ->
// Check user exists and is verified ->
// Generate reset token and send email .
export async function POST(req: NextRequest) {

    const body = await req.json()
    const userEmail: string = body.email
    if (!userEmail) {
        return NextResponse.json(
            { message: RESET_PASSWORD_RESULT.BAD_REQUEST },
            { status: 400 }
        )
    }

    try {
        // Check if user exists and is verified
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        if (!existingUser) {
            return NextResponse.json({ message: AUTH_RESULT.NO_USER }, { status: 404 })
        }
        if (!existingUser.verified) {
            return NextResponse.json({ message: AUTH_RESULT.UNVERIFIED_USER }, { status: 401 })
        }

        // Generate reset token and send email
        const newResetPasswordTokenId = await generateResetPasswordToken(userEmail)
        await sendResetPasswordRequestEmail(userEmail, newResetPasswordTokenId)
        console.log("Sent password reset email link successfully", { userEmail, tokenId: newResetPasswordTokenId })

        // Success response
        return NextResponse.json(
            { message: AUTH_RESULT.RESET_PASS_SUCCESS },
            { status: 200 }
        );
    } catch (error) {
        console.error(`Password reset request failed`, { userEmail, error })
        return NextResponse.json(
            { message: RESET_PASSWORD_RESULT.INTERNAL_ERROR },
            { status: 500 }
        )
    }

}

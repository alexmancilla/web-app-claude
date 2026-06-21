import { sendEmail } from "./send-email";
import { GenericEmail } from '@prisma/client';
import { isProduction } from "../get-node-env";
import { getUserByEmail } from "../user/get-user-by-email";

export async function sendResetPasswordRequestEmail(email: string, tokenId: string): Promise<void> {

    // Get user's name or default
    const user = await getUserByEmail(email);
    const nameInEmail = user?.name ?? "User";

    const resetUrl = isProduction() ? process.env.PROD_URL : process.env.LOCAL_URL;

    const resetEmail = {
        subject: 'Reset Password Request',
        body: ` 
            <html>
            <body>
            Hello ${nameInEmail},<br><br>
            Someone (hopefully you) requested a password reset for this account.<br><br>
            If you did want to reset your password, please click here:<br>
            ${resetUrl}/reset-password/${tokenId}<br><br>
            For security reasons, this link is only valid for 4 hours.<br>
            If you did not request this reset, please ignore this email or let us know.<br><br>
            Thanks,<br>
            ${process.env.APP_NAME}
            </body>
            <html>
            `
    } as GenericEmail

    await sendEmail(resetEmail, email);
    return
}
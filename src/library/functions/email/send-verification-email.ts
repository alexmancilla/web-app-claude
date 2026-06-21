import { GenericEmail } from "@prisma/client";
import { sendEmail } from "./send-email";
import { isProduction } from "../get-node-env";
import { getUserByEmail } from "../user/get-user-by-email";

export async function sendVerificationEmail(email: string, token: string): Promise<void> {

    const verificationUrl = isProduction() ? process.env.PROD_URL : process.env.LOCAL_URL;

    // Get user's name or default
    const user = await getUserByEmail(email);
    const nameInEmail = user?.name ?? "User";

    const resetEmail = {
        subject: 'Verify your account',
        body: ` 
            <html>
            <body>
            Hello ${nameInEmail},<br><br>
            Thanks for joining!<br><br>
            Please activate your account by clicking the link below:<br>
            ${verificationUrl}/activate-account/${token}<br><br>
            If you did not want create and verify an account with us, please ignore this email or let us know.<br><br>
            Thanks,<br>
            ${process.env.APP_NAME}
            </body>
            <html>
            `
    } as GenericEmail

    await sendEmail(resetEmail, email);
    return
}
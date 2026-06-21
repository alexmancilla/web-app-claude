import { SendEmailCommandInput } from '@aws-sdk/client-sesv2'
import { GenericEmail } from '@prisma/client'

export async function formatEmail(emailContent: GenericEmail, recipientEmail: string): Promise<SendEmailCommandInput> {
    if (!emailContent.subject || !emailContent.body) {
        console.error('Format Email: Invalid email content: Subject and body must be non-empty strings', emailContent)
        throw new Error('Format Email: Invalid email content: Subject and body must be non-empty strings')
    }

    const fromEmailAddress = process.env.SES_FROM_EMAIL_ADDRESS
    if (!fromEmailAddress) {
        console.error('Format Email: Undefined from email address')
        throw new Error('Format Email: Undefined from email address')
    }

    const emailCommandInput: SendEmailCommandInput = {
        FromEmailAddress: fromEmailAddress,
        Destination: {
            ToAddresses: [recipientEmail],
        },
        Content: {
            Simple: {
                Subject: { Data: emailContent.subject as string },
                Body: {
                    Html: { Data: emailContent.body as string },
                },
            },
        },
    }
    return emailCommandInput
}

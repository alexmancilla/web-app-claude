import { GenericEmail } from '@prisma/client'
import { formatEmail } from '@/library/functions/email/format-email'
import { SendEmailCommand } from '@aws-sdk/client-sesv2'
import { sesv2client } from '../../third-party/get-ses'

export async function sendEmail(emailToSend: GenericEmail, recipientEmail: string): Promise<void> {

    const formattedEmail = await formatEmail(emailToSend, recipientEmail)

    const command = new SendEmailCommand(formattedEmail) // Composes an email message and immediately queues it for sending.

    await sesv2client.send(command) // Response: a unique identifier for the message that is generated when the message is accepted

    console.log('Send Email: Success in sending email', {subject: formattedEmail.Content?.Simple?.Subject?.Data, recipientEmail})
    
    return
}

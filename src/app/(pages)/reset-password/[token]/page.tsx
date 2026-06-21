import { ResetPasswordSubmissionForm } from '@/app/components/Forms/ResetPasswordForms/ResetPasswordSubmissionForm'
import { getMetadata } from '@/library/functions/getMetadata'

export const metadata = getMetadata({ title: "New Password" })

export default function ResetPasswordSubmissionPage({ params }: { params: { token: string } }) {
    const token = params.token

    return (
        <ResetPasswordSubmissionForm token={token} />
    )
}

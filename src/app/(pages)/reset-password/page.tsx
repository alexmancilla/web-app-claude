import { ResetPasswordRequestForm } from '@/app/components/Forms/ResetPasswordForms/ResetPasswordRequestForm'
import { getMetadata } from '@/library/functions/getMetadata'

export const metadata = getMetadata({ title: "Reset Password" })

export default function ResetPasswordPage() {
    return (
        <ResetPasswordRequestForm />
    )
}

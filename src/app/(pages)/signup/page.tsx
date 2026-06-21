import { getMetadata } from '@/library/functions/getMetadata'
import { SignUpForm } from '@/app/components/Forms/AuthForms/SignUpForm'

export const metadata = getMetadata({ title: 'Sign up' })

export default function SignupPage() {
    return (
        <SignUpForm />
    )
}

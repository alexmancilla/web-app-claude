import { getMetadata } from "@/library/functions/getMetadata";
import { LogInForm } from "@/app/components/Forms/AuthForms/LogInForm";

export const metadata = getMetadata({ title: "Log in" })

export default function LogInPage() {
    return (
        <LogInForm />
    )
}
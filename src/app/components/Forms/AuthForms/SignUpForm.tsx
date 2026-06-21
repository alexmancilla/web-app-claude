'use client'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { EmailInput } from '../ReusableFormComponents/EmailInput'
import { FormTitle } from '../ReusableFormComponents/FormTitle'
import { PasswordInput } from '../ReusableFormComponents/PasswordInput'
import { useState } from 'react'
import { SubmitFormButton } from '../ReusableFormComponents/SubmitFormButton'
import { ResponseHandler } from '../ReusableFormComponents/ResponseHandler'
import { NameInput } from '../ReusableFormComponents/NameInput'
import { AUTH_RESULT, SignupInfo } from '@/library/types'
import { Card } from '../../Card'
import { SwitchMode } from '../ReusableFormComponents/SwitchMode'
import { GoogleSignInButton } from '../ReusableFormComponents/GoogleSignInButton'

export function SignUpForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>()
    const methods = useForm<SignupInfo>()

    const onSubmit: SubmitHandler<SignupInfo> = async (data) => {
        setIsLoading(true)
        setResult('')

        try {
            //response = { message: string , status:200 }
            const response = await fetch('/api/user/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const responseBody = await response.json()

            setResult(responseBody.message) // passed to responsehandler to display the error (passed back from next-auth route)
            setUserEmail(data.email) // passed to auth response handler - might be used
        } catch (error) {
            console.error("Sign up failed:", error.message)
            setResult(AUTH_RESULT.INTERNAL_ERROR)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
                    <FormTitle heading={'Create an account'} subtext={'Join to access all our features'} />
                    <NameInput />
                    <EmailInput />
                    <PasswordInput withForgotOption={false} />
                    <SubmitFormButton text={'Sign up today'} isLoading={isLoading} />
                    {result && <ResponseHandler msg={result} email={userEmail} />}
                    <SwitchMode currentMode={'signup'} />
                </form>
                <GoogleSignInButton/>
            </FormProvider>
        </Card>
    )
}

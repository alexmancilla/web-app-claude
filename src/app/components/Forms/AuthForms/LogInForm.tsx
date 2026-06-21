'use client'
import { useState } from 'react'
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { EmailInput } from '../ReusableFormComponents/EmailInput'
import { PasswordInput } from '../ReusableFormComponents/PasswordInput'
import { SubmitFormButton } from '../ReusableFormComponents/SubmitFormButton'
import { FormTitle } from '../ReusableFormComponents/FormTitle'
import { signIn } from 'next-auth/react'
import { ResponseHandler } from '../ReusableFormComponents/ResponseHandler'
import { AUTH_RESULT, StandardLoginInfo } from '@/library/types'
import { useRouter } from 'next/navigation'
import { Card } from '../../Card'
import { SwitchMode } from '../ReusableFormComponents/SwitchMode'
import { GoogleSignInButton } from '../ReusableFormComponents/GoogleSignInButton'

export function LogInForm() {
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>()

    const methods = useForm<StandardLoginInfo>()
    const router = useRouter()

    const onSubmit: SubmitHandler<StandardLoginInfo> = async (data) => {
        setIsLoading(true)
        setResult('')

        try {
            //response success = { error: null, ok: true, status: 200, url: current/redirect url}
            //reponse error = { error: "err msg", ok:false, status: 401, url: null"}
            const response = await signIn('credentials', {
                data: JSON.stringify(data),
                signInMode: 'login',
                redirect: false,
            })

            if (response) {
                if (response.error == null) {
                    router.push('/?login=success') //successful log in - reroute home
                } else {
                    setResult(response.error) // passed to responsehandler to display the error (passed back from next-auth route)
                    setUserEmail(data.email) // passed to auth response handler
                }
            } else {
                setResult(AUTH_RESULT.INTERNAL_ERROR)
            }
        } catch (error) {
            console.error("Log in failed:", error.message)
            setResult(AUTH_RESULT.INTERNAL_ERROR)
        } finally {
            setIsLoading(false)
        }
    }

    return (

        <Card>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-8">
                    <FormTitle heading={'Log in'} subtext={'Continue to the app'} />
                    <EmailInput />
                    <PasswordInput withForgotOption={true} />
                    <SubmitFormButton text={'Log into your account'} isLoading={isLoading} />
                    {result && <ResponseHandler msg={result} email={userEmail} />}
                    <SwitchMode currentMode={'login'} />
                </form>
                <GoogleSignInButton/>
            </FormProvider>
        </Card>

    )
}

'use client'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FormTitle } from '../ReusableFormComponents/FormTitle'
import { EmailInput } from '../ReusableFormComponents/EmailInput'
import { SubmitFormButton } from '../ReusableFormComponents/SubmitFormButton'
import { useState } from 'react'
import { ResponseHandler } from '../ReusableFormComponents/ResponseHandler'
import { Card } from '../../Card'
import { RESET_PASSWORD_RESULT } from '@/library/types'

type ResetPassRequest = {
    email: string
}

export function ResetPasswordRequestForm() {
    const methods = useForm<ResetPassRequest>()
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>()

    const onSubmit: SubmitHandler<ResetPassRequest> = async (data) => {
        setIsLoading(true) 
        setResult('')
        
        try {
            // {message: string, status: 200}
            const response = await fetch('/api/user/reset-password/get-password-reset-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
            const responseBody = await response.json()

            setResult(responseBody.message)
            setUserEmail(data.email)
        } catch (error) {
            console.error('Error requesting password reset:', error.message)
            setResult(RESET_PASSWORD_RESULT.INTERNAL_ERROR)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
                    <FormTitle heading={'Reset Password'} subtext={'Enter your details to receive a reset email'} />
                    <EmailInput />
                    <SubmitFormButton text={'Request Reset Password Email'} isLoading={isLoading} />
                    {result && <ResponseHandler msg={result} email={userEmail} />}
                </form>
            </FormProvider>
        </Card>
    )
}

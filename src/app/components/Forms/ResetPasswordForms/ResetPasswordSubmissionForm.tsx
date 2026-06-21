'use client'

import { FormProvider, SubmitHandler, useForm } from 'react-hook-form'
import { FormTitle } from '../ReusableFormComponents/FormTitle'
import { SubmitFormButton } from '../ReusableFormComponents/SubmitFormButton'
import { useState } from 'react'
import { ResponseHandler } from '../ReusableFormComponents/ResponseHandler'
import { PasswordInput } from '../ReusableFormComponents/PasswordInput'
import { Card } from '../../Card'
import { RESET_PASSWORD_RESULT } from '@/library/types'

type ResetPassSubmit = {
    password: string
}

export function ResetPasswordSubmissionForm({ token }: { token: string }) {
    const methods = useForm<ResetPassSubmit>()
    const [isLoading, setIsLoading] = useState(false)
    const [result, setResult] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>()

    const onSubmit: SubmitHandler<ResetPassSubmit> = async (data) => {
        setResult('')
        setIsLoading(true)

        try {
            // {message: string, status: 200}
            const response = await fetch(`/api/user/reset-password/set-new-password?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const responseBody = await response.json()

            setResult(responseBody.message)
            setUserEmail(data.password)
        } catch (error) {
            console.error('Error setting new password:', error.message)
            setResult(RESET_PASSWORD_RESULT.INTERNAL_ERROR)

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col space-y-8 ">
                    <FormTitle heading={'Set Password'} subtext={'Enter your new password'} />
                    <PasswordInput withForgotOption={false} />
                    <SubmitFormButton text={'Reset password'} isLoading={isLoading} />
                    {result && <ResponseHandler msg={result} email={userEmail} />}
                </form>
            </FormProvider>
        </Card>
    )
}

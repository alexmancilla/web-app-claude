import { AUTH_RESULT, RESET_PASSWORD_RESULT } from '@/library/types'
import { Dispatch, SetStateAction, useState } from 'react'
import Link from 'next/link'

interface ResponseHandlerProps {
    msg: string
    email?: string 
}

export function ResponseHandler(props: ResponseHandlerProps) {
    const authMsg = props.msg
    const [resendMsg, setResendMsg] = useState<string>('Resend verification email')
    const [buttonTimeout, setButtonTimeout] = useState<boolean>(false)

    let content
    let messageColor = 'text-red-600'
    
    // FORM RESULTS: 
    // Standard case: show error msg passed in - red 
    // Unverified: standard + resend verification link btn
    // Invalid reset pass link: standard + link to reset password page
    // Successful cases: show msg in green 

    switch (authMsg) {
        case AUTH_RESULT.UNVERIFIED_USER:
            content = (
                <>
                    {authMsg}
                    <span>
                        :&nbsp;
                        <button
                            type="button"
                            id="resendLink"
                            onClick={(e) => {
                                e.preventDefault()
                                resendLink(props.email!, setResendMsg, setButtonTimeout)
                            }}
                            className={`underline ${buttonTimeout ? 'cursor-not-allowed text-blue-800' : 'text-blue-500 hover:text-blue-600'}`}
                            disabled={buttonTimeout}
                        >
                            {resendMsg}
                        </button>
                    </span>
                </>
            )
            break

        case RESET_PASSWORD_RESULT.INVALID_TOKEN:
            content = (
                <>
                    {authMsg}
                    <span>
                        :&nbsp;
                        <Link href={'/reset-password'} className="text-blue-500 underline hover:text-blue-600">
                            Reset Password
                        </Link>
                    </span>
                </>
            )
            break

        case AUTH_RESULT.RESET_PASS_SUCCESS:
        case RESET_PASSWORD_RESULT.RESET_SUCCESSFUL:
            content = authMsg
            messageColor = 'text-green-600'
            break

        default:
            content = authMsg
            break
    }

    return <p className={`text-center text-sm ${messageColor}`}>{content}</p>
}

async function resendLink(email: string, setResendMsg: Dispatch<SetStateAction<string>>, setButtonTimeout: Dispatch<SetStateAction<boolean>>) {
    await fetch('/api/user/get-user-verification-link/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email }),
    })

    // Update message every second until countdown reaches 0
    let countdown = 30
    setButtonTimeout(true)

    const countdownInterval = setInterval(() => {
        countdown--

        if (countdown > 0) {
            setResendMsg(`Send Again? Wait ${countdown} seconds`)
        } else {
            // Reset state after countdown is over
            setButtonTimeout(false)
            setResendMsg('Resend verification email')

            // Clear the interval
            clearInterval(countdownInterval)
        }
    }, 1000)
}

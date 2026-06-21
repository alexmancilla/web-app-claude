'use client'
import { signIn } from 'next-auth/react'
import { VERIFICATION_RESULT } from '../../../../library/types'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export type VerifyAccountResult = { status: number; message: string; userEmail: string }

export function VerificationHandler({ result }: { result: { success: boolean, data: string } }) {
    const router = useRouter()

    async function verifyAccountRedirect() {
        if (!result) {
            toast.error(VERIFICATION_RESULT.INTERNAL_ERROR)
        }

        try {
            if (result.success) {
                await signIn('credentials', {
                    data: JSON.stringify({ email: result.data }),
                    signInMode: 'auto',
                    redirect: false,
                })
                // show success toast with msg
                toast.success(VERIFICATION_RESULT.VERIFY_SUCCESSFUL)
            }
            else {
                // assign error msg to error toast
                toast.error(result.data)
            }
        } catch (error) {
            toast.error('Internal error - please try again later.')
        } finally {
            // redirect home
            router.push('/')
        }
    }

    useEffect(() => {
        ; (async () => {
            await verifyAccountRedirect()
        })()
    }, []) // The empty dependency array ensures that this effect runs only once when the component mounts

    return <></>
}

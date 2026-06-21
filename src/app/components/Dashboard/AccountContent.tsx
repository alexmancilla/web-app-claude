'use client'
import { useRouter } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'
import { FingerPrintIcon } from '@heroicons/react/20/solid'
import { XCircleIcon } from '@heroicons/react/20/solid'
import { signOut, useSession } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { Session } from 'next-auth'

export function AccountContent() {
    const [deleteUser, setDeleteUser] = useState(false)
    const { data: session } = useSession()
    const isCredentialsUser = session?.user.signInMethod === 'Credentials';

    return (
        <div className="flex flex-col space-y-2">
            {isCredentialsUser && <ChangePasswordBtn />}

            {deleteUser === false ? <DeleteAccountButton1 setDeleteUser={setDeleteUser} /> : <DeleteAccountConfirm setDeleteUser={setDeleteUser} session={session} />}
        </div>
    )
}

function ChangePasswordBtn() {
    const router = useRouter()

    return (
        <button className="flex w-full items-center space-x-2 rounded-lg p-2 hover:bg-gray-100/80" id="change-password-btn" onClick={() => router.push('/reset-password')}>
            <FingerPrintIcon className="h-4 w-4" />
            <span>Change Password</span>
        </button>
    )
}

function DeleteAccountButton1({ setDeleteUser }: { setDeleteUser: Dispatch<SetStateAction<boolean>> }) {
    return (
        <button className="flex w-full items-center space-x-2 rounded-lg p-2 text-left text-red-600 hover:bg-red-50" id="delete-account-btn-open" onClick={() => setDeleteUser(true)}>
            <XCircleIcon className="h-4 w-4" />
            <span>Delete Account</span>
        </button>
    )
}

function DeleteAccountConfirm({ setDeleteUser, session }: { setDeleteUser: Dispatch<SetStateAction<boolean>>; session: Session | null }) {
    return (
        <div>
            <span className="p-2">Are you sure you want to delete your account?</span>
            <div className="flex flex-row items-start space-x-4 space-y-4 pl-2">
                <button className="mt-4 rounded-lg border-[1px] border-red-200 p-2 text-red-600 shadow-sm hover:bg-red-50" id="delete-account-btn-final" onClick={() => deleteAccount(session)}>
                    Delete Account
                </button>
                <button className=" rounded-lg border-[1px] p-2 shadow-sm hover:bg-gray-100" onClick={() => setDeleteUser(false)}>
                    No, take me back
                </button>
            </div>
        </div>
    )
}

async function deleteAccount(session: Session | null): Promise<void> {
    if (!session || !session.user) {
        console.error('User is not authenticated or session user is missing.')
        return
    }

    try {
        // Send a request to your server to delete the user's account
        const response = await fetch('/api/user/delete-user', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: session.user.email }),
        })

        const responseBody = await response.json()
        const responseMessage = responseBody.message

        if (response.ok) {
            signOut({ callbackUrl: '/' })
            toast.success('Account deleted successfully')
        } else {
            toast.error(responseMessage)
        }
    } catch (error) {
        console.error('Error deleting account:', { error })
        toast.error('Failed to delete account - please try again later')
    }
}

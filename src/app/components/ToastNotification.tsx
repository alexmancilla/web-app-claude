'use client'

import { SearchParamsType } from '@/library/types'
import { useEffect } from 'react'
import { toast } from 'react-hot-toast'

export function ToastNotification({ searchParams }: { searchParams: SearchParamsType }) {
    useEffect(() => {
        if (searchParams.success === 'true') {
            toast.success('Payment successful! Please check your email for confirmation.')
        }
        if (searchParams.login === 'success') {
            toast.success('Successfully logged in')
        }

        // handle other params cases...
    }, [searchParams])
    return <></>
}

'use client'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useState } from 'react'
import { isProduction } from '@/library/functions/get-node-env';
import { livePriceId, testPriceId } from '@/library/functions/stripe/get-price-id';

const priceId = isProduction() ? livePriceId : testPriceId;

export function CheckoutBtn() {
    const router = useRouter()
    const [isButtonClicked, setButtonClicked] = useState(false)

    const handleCheckout = async (): Promise<void> => {
        setButtonClicked(true)

        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId: priceId }),
            })

            if (response.ok) {
                const data = await response.json()
                const sessionURL = data.message //stripe check out page returned from our checkout route
                if (sessionURL) {
                    router.push(sessionURL)
                }
            } else {
                console.error('Stripe checkout session url redirect fail')
                toast.error('Failed to redirect to checkout, please try again later')
                setButtonClicked(false)
            }
        } catch (error) {
            console.error('Error creating checkout session:', error.message)
            toast.error('Failed to create checkout, please try again later')
            setButtonClicked(false)
        }
    }

    return (
        <div className="flex justify-center text-center">
            <button id='buy-btn' onClick={handleCheckout} disabled={isButtonClicked} className={`text-md rounded-md px-3.5 py-2.5 text-white shadow-lg transition ease-in-out hover:bg-gray-700 lg:w-[150px] ${isButtonClicked ? 'cursor-not-allowed bg-gray-700' : 'bg-gray-900'} `}>
                Buy now
            </button>
        </div>
    )
}

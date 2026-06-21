'use client'
import { CheckCircleIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-hot-toast'

export function PricingPlanSingle() {
    const [isButtonClicked, setButtonClicked] = useState(false)
    const router = useRouter()

    const handleCheckout = async () => {
        setButtonClicked(true)
        try {
            const response = await fetch('/api/stripe/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ priceId: 'your_price_id' }),
            })

            if (response.ok) {
                const data = await response.json()
                const sessionURL = data.redirectUrl
                if (sessionURL) {
                    router.push(sessionURL)
                }
            } else {
                console.error('Stripe checkout session url redirect fail')
                toast.error(
                    'Failed to redirect to checkout, please try again later'
                )
                setButtonClicked(false)
            }
        } catch (error) {
            console.error('Error creating checkout session:', error.message)
            toast.error('Failed to create checkout, please try again later')
            setButtonClicked(false)
        }
    }

    return (
        <section className="flex" id="pricing">
            {pricingPlan.map((plan) => (
                <button
                    key = {`${plan.title}-plan`}
                    onClick={() => { handleCheckout() }}
                    id={`${plan.title}-plan`}
                    className={`group mx-auto mb-6 flex w-full flex-col justify-between rounded-xl border-[1px] bg-white p-8 text-left shadow-lg hover:border-gray-300 hover:bg-gray-50 sm:w-[420px] ${isButtonClicked
                        ? 'cursor-not-allowed bg-gray-50/90 ring-gray-300'
                        : ''
                        }`}
                >
                    <div id={`${plan.title}-plan-details`}>
                        <div id={`${plan.title}-plan-head`}>
                            <h2 className="mb-1 text-xl font-semibold">
                                {plan.title}
                            </h2>

                            <p className="mb-1 text-2xl font-bold">
                                {plan.price}
                            </p>

                            <p className="mb-8 w-fit text-wrap text-sm font-normal text-gray-600">
                                {plan.description}
                            </p>
                        </div>

                        <ul id={`${plan.title}-plan-features`}>
                            {plan.features.map((feature, featureIndex) => (
                                <li
                                    key={featureIndex}
                                    className="mb-4 flex items-center space-x-4"
                                >
                                    <span>
                                        {' '}
                                        <CheckCircleIcon
                                            width={18}
                                            height={18}
                                        />
                                    </span>
                                    <span className="text-gray-600">
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <CallToAction text={plan.title} />
                </button>
            ))}
        </section>
    )
}
const pricingPlan = [
    {
        title: 'Free',
        price: '$0',
        description: 'For people looking to try first',
        features: [
            'Feature 1',
            'Feature 2',
            'Feature 3',
            'Feature 4',
            'Feature 5',
        ],
        link: '/checkout',
    },
]

function CallToAction({ text }: { text: string }) {
    return (
        <div
            className="mt-10 flex w-full text-center"
            id={`${text}-plan-buy-btn`}
        >
            <p className="text-md w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-white shadow-md group-hover:bg-gray-700">
                {text}
            </p>
        </div>
    )
}

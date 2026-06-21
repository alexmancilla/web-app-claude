import { CheckCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export function PricingPlanMultiple() {
  return (
    <section className="container mx-auto mt-32" id="pricing">

      <h2 className="text-center text-4xl font-medium tracking-tight sm:text-5xl">
        Flexible pricing plans
      </h2>

      <div className="mt-12 flex flex-col items-center justify-center sm:mt-24 lg:flex-row lg:items-stretch lg:space-x-6">
        {pricingPlans.map((plan) => (
          <Link
            key={`${plan.title}-plan`}
            id={`${plan.title}-plan`}
            href={plan.link}
            className="group mb-6 flex w-full flex-col justify-between rounded-xl border-[1px] bg-white p-8 shadow-lg hover:border-gray-300 hover:bg-gray-50 sm:w-[420px]"
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
                  <li key={featureIndex} className="mb-4 flex items-center space-x-4">
                    <span>
                      {' '}<CheckCircleIcon width={18} height={18} />
                    </span>
                    <span className="text-gray-600">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <CallToAction text={plan.btn_text} id={`${plan.title}-plan-buy-btn`} />

          </Link>
        ))}
      </div>
    </section>
  )
}

const pricingPlans = [
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
    btn_text: 'Join free',
    link: '/plan1',
  },
  {
    title: 'Individuals',
    price: '$20 per month',
    description: 'Everything in free tier, plus more',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
      'Feature 4',
      'Feature 5',
      'Feature 6 - No limit on for paid users',
    ],
    btn_text: 'Get started',
    link: '/plan2',
  },
  {
    title: 'Businesses',
    price: 'Contact us',
    description: 'For teams larger than 10 people',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
      'Feature 4',
      'Feature 5',
      'Feature 6 - No limit on for paid users',
      'Feature 7 - Extra support for teams',
    ],
    btn_text: 'Contact sales',
    link: '/plan3',
  },
]

function CallToAction({ text, id }: { text: string; id: string }) {
  return (
    <div className="mt-10 flex text-center" id={id}>
      <p className="text-md w-full rounded-md bg-gray-900 px-3.5 py-2.5 text-white shadow-md group-hover:bg-gray-700">
        {text}
      </p>
    </div>
  )
}

import { stripe } from '../../third-party/get-stripe'
import { Mode } from '../../types'

export async function getPriceMode(priceId: string): Promise<Mode> {
    const price = await stripe.prices.retrieve(priceId)

    if (price.recurring) {
        return 'subscription'
    } else {
        return 'payment'
    }
}

import Cors from 'micro-cors';
import { stripe } from '../../../../library/third-party/get-stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { STRIPE_EVENTS } from '@/library/types'
import { processCheckoutCompleteEvent } from '../../../../library/functions/stripe/events/process-checkout-complete';

// By default, Next.js API routes are same-origin only. To allow Stripe webhook event requests to reach your API route, add micro-cors:
// eslint-disable-next-line
const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});


// Get stripe signature from request ->
// Verify the signature with our webhook ->
// Process the event .
export async function POST(req: NextRequest) {

    const body = await req.text();
    const stripeSignature = req.headers.get('stripe-signature');
    if (!stripeSignature) {
        return NextResponse.json({ message: `Missing signature` }, { status: 400 });
    }

    try {
        
        const event = verifyStripeWebhook(body, stripeSignature);
        await processStripeEvent(event);

        return NextResponse.json({ message: `Webhook success. Event: ${event.type}` }, { status: 200 });    
    } catch (error) {
        console.error('Stripe Webhook Error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

function verifyStripeWebhook(body: string, signature: string | null): Stripe.Event {

    const stripeWebhookKey = process.env.STRIPE_WEBHOOK_KEY as string;
    if (!stripeWebhookKey) {
        throw new Error('Missing stripe webhook key');
    }

    const event = stripe.webhooks.constructEvent(body, signature!, stripeWebhookKey);
    console.log('Stripe webhook: Event:', event.type);
    return event
}

async function processStripeEvent(event: Stripe.Event) {
    switch (event.type) {
        case STRIPE_EVENTS.CHECKOUT_COMPLETE:
            await processCheckoutCompleteEvent(event);
            break;
        // Handle other types of events...
        default:
            console.log(`Stripe event: ${event}, unhandled.`)
            break;
    }
}
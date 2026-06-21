
import { updateOrderPaid } from "@/library/functions/order/update-order-paid";
import { sendOrderConfirmationEmail } from "@/library/functions/email/send-order-confirmation-email";
import Stripe from "stripe";

// Check if paid ->
// Get order id from checkout object in the event ->
// Get email from checkout session ->
// Update order in database to paid ->
// Send order confirmation email .
export async function processCheckoutCompleteEvent(event: Stripe.Event) {
    
    // Check if paid  
    const checkoutSession = event.data.object as Stripe.Checkout.Session;
    if (checkoutSession.payment_status !== 'paid') {
        return
    }
    
    // Get orderId
    const orderId = checkoutSession.client_reference_id;
    if (!orderId) {
        throw new Error(`Stripe webhook: Checkout session paid - unable to continue - missing order id (client_reference_id). Stripe order ID: ${checkoutSession.id}`);
    }
    
    // Get email
    const sessionEmail = checkoutSession?.customer_details?.email;
    if (!sessionEmail) {
        throw new Error(`Email missing from checkout session ${checkoutSession.id}`);
    }
    
    // Update order with paid and session email
    const order = await updateOrderPaid(orderId, sessionEmail);

    // Send confirmation
    await sendOrderConfirmationEmail(sessionEmail, order);
} 

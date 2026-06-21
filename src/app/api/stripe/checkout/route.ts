import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { getCustomerStripeIdByEmail } from "../../../../library/functions/user/get-customer-stripe-id-by-email";
import { stripe } from "../../../../library/third-party/get-stripe";
import { getProductDataFromStripe } from "../../../../library/functions/stripe/get-product-data-from-stripe";
import { CHECKOUT, Mode } from "../../../../library/types";
import { updateOrderFailed } from "@/library/functions/order/update-order-failed";
import { getProductIdFromPriceId } from "@/library/functions/stripe/get-product-id-from-price-id";
import { getPriceMode } from "@/library/functions/stripe/get-price-mode";
import { createPendingOrder } from "@/library/functions/order/create-pending-order";
import { getServerSession } from "next-auth";
import { isProduction } from "@/library/functions/get-node-env";
import { Product } from "@prisma/client";

// Create order id and check session ->
// Get product details from request ->
// Prepare checkout by getting product details ready ->
// Add pending order to database -> 
// Create checkout and return url .
export async function POST(req: NextRequest) {

  const orderId = uuidv4();
  const session = await getServerSession();
  const sessionEmail = session?.user?.email || undefined // if a session (email) exists we add it to the order 

  try {
    // Get product details from request
    const body = await req.json();
    const priceId: string = await body.priceId;
    if (!priceId) {
      return NextResponse.json(
        { message: CHECKOUT.MISSING_DATA }, { status: 400 }
      )
    }

    // Get product details ready for checkout
    const { mode, productInfo } = await getProductDetails(priceId);

    // Add pending order to database
    await createPendingOrder(productInfo, orderId, sessionEmail);

    // Create checkout object with stripe and return url 
    const checkoutUrl = await createCheckout(priceId, orderId, mode, sessionEmail);
    return NextResponse.json(
      { message: checkoutUrl },
      { status: 200 }
    )
  }
  catch (error) {
    await updateOrderFailed(orderId)
    console.error("Stripe Checkout: Error processing request", { error, orderId });
    return NextResponse.json({ message: CHECKOUT.INTERNAL_ERROR }, { status: 500 });
  }
}

async function getProductDetails(priceId: string): Promise<{ mode: Mode, productInfo: Product }> {
  const mode = await getPriceMode(priceId);
  const productId = await getProductIdFromPriceId(priceId);
  const productInfo = await getProductDataFromStripe(productId);
  return { mode, productInfo }
}

async function createCheckout(priceId: string, orderId: string, mode: Mode, sessionEmail?: string): Promise<string> {
  const line_items = [
    {
      price: priceId,
      quantity: 1,
    },
  ];
  const customerStripeId = sessionEmail ? await getCustomerStripeIdByEmail(sessionEmail) : undefined;

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: isProduction() ? `${process.env.PROD_URL}/?success=true` : `${process.env.LOCAL_URL}/?success=true`,
    cancel_url: isProduction() ? process.env.PROD_URL : process.env.LOCAL_URL, // client side will show fail toast 
    line_items,
    mode,
    client_reference_id: orderId,
    customer: customerStripeId,
    payment_method_types: ["card", "paypal"],
  });

  if (!checkoutSession.url) {
    throw new Error("Stripe Checkout: Failed to get a checkout session URL");
  }

  console.log("Stripe Checkout: Successfully created checkout session", {orderId});
  return checkoutSession.url
}


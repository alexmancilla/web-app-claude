import { stripe } from "../../third-party/get-stripe";

export async function getProductIdFromPriceId(priceId: string): Promise<string> {
  const priceObject = await stripe.prices.retrieve(priceId);
  const productId = priceObject.product as string;
  return productId;
} 
import { stripe } from '@/library/third-party/get-stripe';
import { Product } from '@prisma/client';

export async function getProductDataFromStripe(productId: string): Promise<Product> {

    // Retrieve product from stripe
    const product = await stripe.products.retrieve(productId);

    // Retrieve the price object  
    const prices = await stripe.prices.list({ product: productId });
    const price = prices.data[0]; // we can expect one price per product

    const productObject = {
        name: product.name,
        stripeProductId: productId,
        stripePriceId: price.id,
        price: price.unit_amount! / 100, // Convert to float
        currency: price.currency
    } as Product
    return productObject
}

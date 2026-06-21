import { getProductDataFromStripe } from '@/library/functions/stripe/get-product-data-from-stripe';
import { prisma } from '@/library/third-party/global-prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@prisma/client';

// Check admin API key in request headers ->
// Get productId from request body ->
// Get latest product information from Stripe using product id ->
// Make sure product doesnt already exist in database ->
// Add product to the database .
export async function POST(req: NextRequest) {

    // Check admin API key
    const adminApiKey = req.headers.get('admin-api-key');
    if (adminApiKey !== process.env.ADMIN_API_KEY) {
        console.warn('Unauthorised admin route access attempt');
        return NextResponse.json({
            message: "Unauthorised admin route access attempt",
        }, { status: 401 });
    }

    // Check body for productId
    const body = await req.json();
    const productId: string = body.productId;
    if (!productId) {
        console.warn('No stripe product id found');
        return NextResponse.json({
            message: "No stripe product id passed in",
        }, { status: 400 });
    }

    try {
        // Get latest product information from Stripe
        const newProduct = await getProductDataFromStripe(productId);

        // Check if the product already exists in the database
        const existingProduct: Product | null = await prisma.product.findUnique({
            where: { stripeProductId: newProduct.stripeProductId },
        });
        if (existingProduct) {
            console.warn(`Product with stripeProductId ${newProduct.stripeProductId} already exists.`);
            return NextResponse.json({
                message: `Product with stripeProductId ${newProduct.stripeProductId} already exists.`,
            }, { status: 400 });
        }

        // Add product to the database
        await prisma.product.create({
            data: {
                name: newProduct.name,
                stripeProductId: newProduct.stripeProductId,
                stripePriceId: newProduct.stripePriceId,
                price: newProduct.price,
                currency: newProduct.currency
            },
        });

        console.log(`Successfully added ${newProduct.name} to database`, { newProduct })
        return NextResponse.json({
            message: `Successfully added ${newProduct.name} to database`,
        }, { status: 200 });

    } catch (error) {
        console.error('Add new product error:', error);

        if (error.type === "StripeInvalidRequestError") {
            return NextResponse.json({
                message: `Bad request: ${error.message}`,
            }, { status: 400 });
        }

        return NextResponse.json({
            message: `Internal server error ${(error.message)}`,
        }, { status: 500 });
    }
}

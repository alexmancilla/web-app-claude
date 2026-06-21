import { getProductDataFromStripe } from '@/library/functions/stripe/get-product-data-from-stripe'
import { prisma } from '@/library/third-party/global-prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import { Product } from '@prisma/client'

// Check admin API key in request headers ->
// Get productId from request body ->
// Get latest product information from Stripe using product id ->
// Make sure product exists in database ->
// Update in database .
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
        const updatedProduct = await getProductDataFromStripe(productId)

        // Find product in database 
        const existingProduct: Product | null = await prisma.product.findUnique({
            where: { stripeProductId: updatedProduct.stripeProductId },
        })
        if (!existingProduct) {
            console.error(`Product: ${updatedProduct.name} not found in the database.`)
            return NextResponse.json({
                message: `Product: ${updatedProduct.name} not found in the database.`,
            }, {
                status: 400,
            })
        }

        // Update in database
        await prisma.product.update({
            where: { stripeProductId: updatedProduct.stripeProductId },
            data: {
                name: updatedProduct.name,
                stripePriceId: updatedProduct.stripePriceId,
                price: updatedProduct.price,
                currency: updatedProduct.currency,
            },
        })
        console.log(`Successfully updated ${updatedProduct.name}`, { updatedProduct })
        return NextResponse.json({
            message: 'Product updated in database successfully',
        }, { status: 200 })
    } catch (error) {
        console.error('Update product in database error:', error.message)
        if (error.type == 'StripeInvalidRequestError') {
            return NextResponse.json({
                message: `Bad request: ${error.message}`,
            }, {
                status: 400,
            })
        }
        return NextResponse.json({
            message: `Internal server error ${error.message}`,
        }, {
            status: 500,
        })
    }
}

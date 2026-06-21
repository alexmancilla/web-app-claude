import { NextRequest, NextResponse } from 'next/server';
import { getProductDataFromStripe } from '@/library/functions/stripe/get-product-data-from-stripe';

// Check admin API key in request headers ->
// Get productId from query params ->
// Get and return latest product information from Stripe as Stripe Product object ->
export async function GET(req: NextRequest) {

    // Check admin API key
    const adminApiKey = req.headers.get('admin-api-key');
    if (adminApiKey !== process.env.ADMIN_API_KEY) {
        console.warn('Unauthorised admin route access attempt');
        return NextResponse.json({
            message: "Unauthorised admin route access attempt",
        }, { status: 401 });
    }

    // Get productId from query params -->
    const searchParams = req.nextUrl.searchParams
    const productId = searchParams.get('productId')

    if (!productId) {
        console.warn('No stripe product id found');
        return NextResponse.json({
            message: "No stripe product id passed in",
        }, { status: 400 });
    }

    try {
        // Get and return latest product information from Stripe
        const product = await getProductDataFromStripe(productId);
        return NextResponse.json({
            message: product,
        }, { status: 200, });

    } catch (error) {
        console.error('Get product info error:', error);

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

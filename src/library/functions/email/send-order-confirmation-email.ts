import { GenericEmail, Order } from "@prisma/client";
import { getUserByEmail } from "../user/get-user-by-email";
import { sendEmail } from "./send-email";
import { getProductDataFromStripe } from "../stripe/get-product-data-from-stripe";

export async function sendOrderConfirmationEmail(email: string, order: Order): Promise<void> {

    // Get user's name or default
    const user = await getUserByEmail(email);
    const nameInEmail = user?.name ?? "User";

    const product = await getProductDataFromStripe(order.productStripeId)
    const productName = product.name

    const orderConfirmationEmail = {
        subject: 'Order Success',
        body: ` 
            <html>
            <body>
            Hello ${nameInEmail},<br><br>
            Thanks for the order!<br><br>
            Order ID:${order.id}<br>
            Order Item: ${productName}<br><br>
            If you did not make this order please let us know.<br><br>
            Thanks,<br>
            ${process.env.APP_NAME}
            </body>
            <html>
            `
    } as GenericEmail

    await sendEmail(orderConfirmationEmail, email);
    return
}
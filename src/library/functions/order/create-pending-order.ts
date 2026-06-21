import { Order, Product } from "@prisma/client";
import { prisma } from "../../third-party/global-prisma-client";

export async function createPendingOrder(productInfo: Product, orderId: string, sessionEmail?: string,): Promise<Order> {

    const order = await prisma.order.create({
        data: {
            id: orderId,
            total: productInfo.price,
            status: "pending",
            productStripeId: productInfo.stripeProductId,
            sessionEmail: sessionEmail,
        },
    });

    console.log(`Create pending order: Successfully added pending order:`, { orderId });
    return order;
}

import { Order } from "@prisma/client";
import { prisma } from "../../third-party/global-prisma-client";

// Find order ->
// Update to paid ->
// If no session email in order, add it .
export async function updateOrderPaid(orderId: string, sessionEmail: string): Promise<Order> {

    const order = await prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
        throw new Error(`Update Order to Paid: Order entry not found. orderId: ${orderId}`)
    }
    await prisma.order.update({ where: { id: orderId }, data: { status: 'paid' } });

    if (!order.sessionEmail){
        await prisma.order.update({ where: { id: orderId }, data: { sessionEmail: sessionEmail } });
    }

    return order
}
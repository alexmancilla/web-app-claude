import { prisma } from "../../third-party/global-prisma-client";

export async function updateOrderFailed(orderId: string): Promise<void> {
  try {
    // Check if the order exists before updating
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (existingOrder) {
      // Order exists, proceed with the update
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: "failed",
        },
      });
      console.log("Update Order to Failed: Success", { orderId })
      return
    }
    console.log("Update Order to Failed: Order does not exist", { orderId })
  } catch (error) {
    // non-critical - ok to fail silently as api will handle client error
    console.error("Update Order to Failed: Error updating order status:", { orderId, error });
  }
}
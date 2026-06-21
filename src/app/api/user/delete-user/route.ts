import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/library/third-party/global-prisma-client"
import { getServerSession } from 'next-auth';
import { DELETE_ACCOUNT_RESULT } from "@/library/types";

// Get user's session (and email) from request ->
// Check session is valid to delete a user->
// Check user exists in our database -> 
// Delete user 
export async function DELETE(req: NextRequest) {

    // Get user from the request
    const body = await req.json()
    const userEmail = body.email
    if (!userEmail) {
        return NextResponse.json({ message: DELETE_ACCOUNT_RESULT.BAD_REQUEST }, { status: 400 });
    }

    try {
        // Check session
        const invalidSession = await checkInvalidSession(userEmail)
        if (invalidSession) {
            return NextResponse.json({ message: invalidSession }, { status: 401 })
        }

        // Check user in database exists
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });
        if (!existingUser) {
            console.warn("User does not exist in database", { userEmail })
            return NextResponse.json({ message: DELETE_ACCOUNT_RESULT.NO_USER }, { status: 404 });
        }

        // Delete user
        await prisma.user.delete({
            where: { email: userEmail },
        });
        console.log(`Successful user deletion`, { userEmail })
        return NextResponse.json({ message: DELETE_ACCOUNT_RESULT.DELETE_SUCCESS }, { status: 200 },
        );
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return NextResponse.json({ message: DELETE_ACCOUNT_RESULT.INTERNAL_ERROR, status: 500 })
    }
}
// Note: do not need to delete user in stripe. Stripe can create multiple customers with same email

async function checkInvalidSession(email: string): Promise<void | string> {

    const session = await getServerSession()
    if (!email || !session) {
        console.warn("Delete user: No valid session", { email })
        return DELETE_ACCOUNT_RESULT.NO_SESSION
    }

    // Mismatched session and request email - should never happen but good to check
    if (email != session.user.email) {
        console.warn(`Mismatched session email: ${session.user.email} and user email ${email}. Cannot delete user`)
        return DELETE_ACCOUNT_RESULT.MISMATCH
    }
    return
}

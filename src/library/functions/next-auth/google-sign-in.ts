import { User } from "next-auth"
import { prisma } from '@/library/third-party/global-prisma-client'
import { stripe } from '../../third-party/get-stripe'

// Pull email from next auth google sign in ->
// If user exists just return and let them sign in ->
// If user does not exist -> Create customer in stripe and attach stripe id to user ->
// Add user to database ->
export async function handleGoogleSignIn(user: User): Promise<boolean> {
    try {

        if (!user.email) {
            throw new Error("User email is required but not provided");
        }

        const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
        })

        if (!existingUser) {
            // Create a new Stripe customer for the Google user
            const stripeCustomer = await stripe.customers.create({
                name: user.name!,
                email: user.email!,
            })

            // Add the new user to the database
            await prisma.user.create({
                data: {
                    name: user.name!,
                    email: user.email!,
                    stripeId: stripeCustomer.id,
                    password: null, // Google users don't have a password
                    verified: true,
                    signInMethod: 'Google',
                },
            })
        }

        return true // Allow the Google sign-in
    } catch (error) {
        console.error('Error handling Google sign-in:', error)
        return false // Reject the sign-in if something goes wrong
    }
}
import { prisma } from '@/library/third-party/global-prisma-client'
import bcrypt from 'bcrypt'
import { NextRequest, NextResponse } from 'next/server'
import { AUTH_RESULT, SignupInfo } from '../../../../library/types'
import { stripe } from '../../../../library/third-party/get-stripe'
import { generateVerificationToken } from '@/library/functions/user/generate-verify-token'
import { sendVerificationEmail } from '@/library/functions/email/send-verification-email'

// Pull sign up info from request ->
// Check user does not exist ->
// Create customer in stripe and attach stripe id to user ->
// Add user to database ->
// Send verification email and return pending verification msg .
export async function POST(req: NextRequest) {

    // Check request details ok 
    const { name, email, password } = await req.json()
    if (!name || !email || !password) {
        return NextResponse.json({ message: AUTH_RESULT.BAD_REQUEST }, { status: 400 })
    }
    const newUserData: SignupInfo = { name, email, password }

    try {

        // Existing user check
        const existingUser = await existingUserCheck(newUserData)
        if (existingUser) {
            return NextResponse.json({ message: existingUser }, { status: 401 })
        }

        // Create customer in stripe and attach stripe id
        console.log('Proceeding to create stripe account', { email })
        const stripeCustomerId = await createStripeCustomer(newUserData.name, newUserData.email)
        newUserData.stripeId = stripeCustomerId

        // Add user to database
        await addUserToDB(newUserData)

        // Send email verification link
        const verificationTokenId = await generateVerificationToken(email)
        await sendVerificationEmail(email, verificationTokenId)

        return NextResponse.json({ message: AUTH_RESULT.UNVERIFIED_USER }, { status: 200 })
    } catch (error) {
        console.error('Creating user error:', error)
        return NextResponse.json({ message: AUTH_RESULT.INTERNAL_ERROR }, { status: 500 })
    }

}

async function existingUserCheck(newUserData: SignupInfo): Promise<void | string> {
    const existingUser = await prisma.user.findUnique({
        where: { email: newUserData.email },
    })
    if (existingUser) {
        if (existingUser.verified == false) {
            return AUTH_RESULT.UNVERIFIED_USER
        }
        return AUTH_RESULT.UNVERIFIED_USER
    }
    return
}

async function createStripeCustomer(name: string, email: string): Promise<string> {
    const stripeCustomer = await stripe.customers.create({
        name,
        email,
    })
    return stripeCustomer.id
}

async function addUserToDB(newUserData: SignupInfo): Promise<void> {

    // Hash password
    const hashedPassword = await bcrypt.hash(newUserData.password, +process.env.SALT_ROUNDS!)

    // Create User in db
    await prisma.user.create({
        data: {
            name: newUserData.name,
            email: newUserData.email,
            password: hashedPassword,
            stripeId: newUserData.stripeId!,
            signInMethod: 'Credentials',
        },
    })
    return
}
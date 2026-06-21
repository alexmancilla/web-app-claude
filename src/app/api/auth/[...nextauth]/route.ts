import NextAuth, { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/library/functions/user/get-user-by-email'
import { checkLogin } from '../../../../library/functions/next-auth/check-login'
import { AutoLoginInfo, StandardLoginInfo } from '@/library/types'
import GoogleProvider from "next-auth/providers/google";
import { handleGoogleSignIn } from '@/library/functions/next-auth/google-sign-in'

const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: { data: { type: 'text' }, signInMode: { type: 'text' } }, //data: react-hook data object, type: 'auto' | 'login' (standard)  

            // authorize returns:
            // User object if ok, 
            // SignInResponse object if fail e.g. {error: "the err msg you throw", status: 401 ... }
            async authorize(credentials) {
                if (!credentials) { return null }
                const userData = JSON.parse(credentials.data)
                const signInMode = credentials.signInMode
                switch (signInMode) {
                    case 'auto':
                        return handleAutoSignIn(userData)
                    case 'login':
                        return handleLoginSignIn(userData)
                    default:
                        return null
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        })

    ],

    pages: {
        signIn: '/login',
    },

    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: 'jwt',
        maxAge: 60 * 60 * 24 * 60, // 60 days
    },

    jwt: {
        secret: process.env.NEXTAUTH_SECRET,
        maxAge: 60 * 60 * 24 * 60,
    },

    callbacks: {
        // When you creating the user object in authorize, the JWT created automatically assigns jwt.sub to the specified id from the DefaultUser object (the id from our database)
        // So we set session user id (previously undefined) to be the same as user id from our db
        async session({ session, token }) {
            if (session.user && token.sub) {
                session.user.id = token.sub
            }
            // Type assertion to ensure token.signInMethod is treated as a string
            if (typeof token.signInMethod === 'string') {
                session.user.signInMethod = token.signInMethod
            }
            // we can now access user id in getSession
            return session
        },
        async jwt({ token, account }) {
            // Add signInMethod to the token if available
            if (account) {
                token.signInMethod = account.provider
            }

            return token
        },
        async signIn({ user, account }) {
            if (account && account.provider === 'google') {
                return await handleGoogleSignIn(user)
            }
            // For other providers (e.g., email/password credentials)
            return true
        }
    }
}


async function handleAutoSignIn(userData: AutoLoginInfo): Promise<User> {

    const user = await getUserByEmail(userData.email)
    if (!user) { throw new Error("Could not find user") }
    const autoUser: User = {
        id: user.id,
        email: user.email,
        name: user.name,
    }
    return autoUser
}

async function handleLoginSignIn(userData: StandardLoginInfo): Promise<User | null> {
    const response = await checkLogin(userData)
    if (typeof response === 'object') {
        const loggedinUser: User = {
            id: response.id,
            email: response.email,
            name: response.name,
        }
        return loggedinUser
    }
    console.error(response)
    throw new Error(response)
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

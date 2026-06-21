import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { UserDashboard } from '@/app/components/Dashboard/UserDashboard'
import { getMetadata } from '@/library/functions/getMetadata'

export const dynamic = 'force-dynamic' //[1]

export const metadata = getMetadata({ title: "Dashboard" })

export default async function DashboardPage() {
    const session = await getServerSession()

    return (
        <>
            <div className="pt-24">
                {session ? (
                    <UserDashboard />
                ) : (
                    <>
                        <p className="lg:text-md text-center text-sm text-gray-700">
                            <Link href="/login" className="text-blue-500 underline hover:text-blue-600">
                                Log in
                            </Link>
                            &nbsp;to access the user dashboard
                        </p>
                    </>
                )}
            </div>
        </>
    )
}

//[1]:
// pages should be server components
// dynamic makes page rendered for each user at request time
// necessary as this is a react server component and the session will not update in a server component
// so if a user goes to dashboard without being logged in - sees no access msg, logs in and revisits - still sees no access msg
// making it client could fix also, but keeping as server component for ssr benefits and to show caching example

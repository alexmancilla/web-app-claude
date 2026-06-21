import { inter } from '@/library/frontend/fonts'
import './globals.css'
import { Nav } from './components/Nav/Nav'
import { Toaster } from 'react-hot-toast'
import SessionProvider from '@/library/third-party/next-auth/SessionProvider'
import { getServerSession } from 'next-auth'
import { getMetadata } from '../library/functions/getMetadata'

export const metadata = getMetadata()

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession()

    return (
        <html lang="en" className='scroll-smooth scroll-pt-12'>
            <body className={`${inter.className} mx-auto min-h-screen min-w-[320px] max-w-[2560px] overflow-x-hidden bg-white text-gray-900 `}>
                <SessionProvider session={session}>
                    <Nav />
                    <Toaster position="top-center" />
                    <main className="pt-12">{children}</main>
                </SessionProvider>
            </body>
        </html>
    )
}

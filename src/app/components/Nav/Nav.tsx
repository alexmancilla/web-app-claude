'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MotionDiv } from '@/library/frontend/framer/framer'
import { FADE_IN } from '@/library/frontend/framer/framer_animations'
import Image from 'next/image'
import { MobileNav } from './MobileNav'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Bars3Icon, CursorArrowRippleIcon, UserPlusIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'
import { UserBtn } from './LoggedInBtn'

const navigation = [
    { name: 'Features', href: '/#features' },
    { name: 'Pricing', href: '/#pricing' },
    { name: 'FAQs', href: '/#faqs' },
]

export function Nav() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <>
            <MotionDiv {...FADE_IN}>
                <header className="absolute inset-x-0 z-50 px-4 py-4 lg:px-12">
                    <nav className="mx-auto flex  min-w-[320px] max-w-[2560px] items-center justify-between text-sm" aria-label="Navigation" id='navigation'>
                        <Logo size={30} />

                        {/* larger screen nav lg:1024px  */}
                        <Links />
                        <UserActions />

                        {/* smaller screens only <1024pxpx */}
                        <BurgerIconMobile setMobileMenuOpen={setMobileMenuOpen} />
                        <MobileNav mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} navigation={navigation} />
                    </nav>
                </header>
            </MotionDiv>
        </>
    )
}

function Links() {
    return (
        <div className="hidden w-1/3 justify-center lg:flex lg:gap-x-12 ">
            {navigation.map((item) => (
                <Link key={item.name} href={item.href} className="rounded-lg p-1.5 text-sm leading-6 hover:text-gray-600 hover:underline hover:underline-offset-8">
                    {item.name}
                </Link>
            ))}
        </div>
    )
}

function UserActions() {
    const { data: session, status } = useSession()

    return (
        <div className="hidden w-1/3 items-center lg:flex lg:justify-end lg:space-x-6">
            <CallToAction />

            {!session && status !== 'loading' ? (
                <div className='text-sm space-x-4 flex '>
                    <Link href="/login" className="flex items-center p-1 space-x-1 hover:underline hover:underline-offset-8">
                        <ArrowRightStartOnRectangleIcon width={18} height={18} />
                        <span>Log in</span>{' '}
                    </Link>
                    <Link href="/signup" className="flex items-center p-1 space-x-2 hover:underline hover:underline-offset-8">
                        <UserPlusIcon width={18} height={18} />
                        <span>Sign up</span>{' '}
                    </Link>
                </div>
            ) : (
                <UserBtn />
            )}
        </div>
    )
}

function CallToAction() {
    return (
        <Link href="/#pricing" className="text-md flex items-center justify-between space-x-2 rounded-full bg-gray-900 px-2.5 py-0.5 tracking-wide text-white shadow-lg transition ease-in-out hover:bg-gray-700">
            <p>Buy now</p>
            <CursorArrowRippleIcon className="h-4 w-4" />
        </Link>
    )
}

// Only shows less than large (1024px) screen
function BurgerIconMobile({ setMobileMenuOpen }: { setMobileMenuOpen: Dispatch<SetStateAction<boolean>> }) {
    return (

        <div className="flex justify-end lg:hidden">
            <button type="button" className=" items-center justify-center p-2.5 hover:text-gray-600" onClick={() => setMobileMenuOpen(true)}>
                <Bars3Icon className="h-6 w-6" aria-label="Open Mobile Navigation Menu" />
            </button>
        </div>

    )
}

function Logo({ size }: { size: number }) {
    return (
        <div className="flex w-1/3">
            <Link href="/">
                <span className="sr-only">Your Company</span>
                <Image src="/logo.png" alt="Company Logo" width={size} height={size} />
            </Link>
        </div>
    )
}

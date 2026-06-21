import { Dispatch, SetStateAction } from 'react'
import { AnimatePresence, MotionDiv } from '@/library/frontend/framer/framer'
import { SLIDE_RIGHT_TO_LEFT_PAGE } from '@/library/frontend/framer/framer_animations'
import { Logo } from '@/app/components/Logo'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { CursorArrowRippleIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'
import { Dialog } from '@headlessui/react'

type NavigationItem = {
    name: string
    href: string
}

export function MobileNav({ mobileMenuOpen, setMobileMenuOpen, navigation }: { mobileMenuOpen: boolean; setMobileMenuOpen: Dispatch<SetStateAction<boolean>>; navigation: NavigationItem[] }) {
    return (
        <>
            <AnimatePresence>
                <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>

                    <div key="mobile-menu-container" className="fixed inset-0 z-50 backdrop-blur-sm">

                        <MotionDiv {...SLIDE_RIGHT_TO_LEFT_PAGE}>
                            <Dialog.Panel className="fixed inset-y-0 right-0 z-50 h-screen w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:border-l-[1px] sm:border-gray-200">

                                <div id="mobile-menu-contents">
                                    <LogoAndExit setMobileMenuOpen={setMobileMenuOpen} />

                                    <div className="divide-y divide-gray-500/10">
                                        <NavLinks navigation={navigation} setMobileMenuOpen={setMobileMenuOpen} />
                                        <ActionBtnsMobile setMobileMenuOpen={setMobileMenuOpen} />
                                    </div>
                                </div>

                            </Dialog.Panel>
                        </MotionDiv>

                    </div>

                </Dialog>
            </AnimatePresence>
        </>
    )
}

function LogoAndExit({ setMobileMenuOpen }: { setMobileMenuOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="flex items-center justify-between px-2">
            <div onClick={() => setMobileMenuOpen(false)}>
                <Logo size={30} />
            </div>
            <button className="hover:text-gray-600" onClick={() => setMobileMenuOpen(false)}>
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-label="Close Mobile Navigation Menu" />
            </button>
        </div>
    )
}
const standardNavClass = "block px-4 py-3 hover:bg-gray-100 rounded-lg"

function NavLinks({ navigation, setMobileMenuOpen }: { navigation: NavigationItem[]; setMobileMenuOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div id="mobile-nav-links" className="space-y-4 py-6">
            {navigation.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setMobileMenuOpen(false)} className={standardNavClass}>
                    {item.name}
                </Link>
            ))}
        </div>
    )
}

function ActionBtnsMobile({ setMobileMenuOpen }: { setMobileMenuOpen: Dispatch<SetStateAction<boolean>> }) {
    const { data: session, status } = useSession()

    return (

        <div className="space-y-4 py-6">
            <CallToAction setMobileMenuOpen={setMobileMenuOpen} />

            {!session && status !== 'loading' ? (
                <Link href="/login" className={standardNavClass} onClick={() => setMobileMenuOpen(false)}>
                    Log in
                </Link>
            ) : (
                <>
                    <Link href="/dashboard" className={standardNavClass} onClick={() => setMobileMenuOpen(false)}>
                        Dashboard
                    </Link>

                    <button className={`${standardNavClass} w-full text-left`} onClick={() => signOut({ callbackUrl: '/' })}>
                        Log out
                    </button>
                </>
            )}
        </div>

    )
}

function CallToAction({ setMobileMenuOpen }: { setMobileMenuOpen: Dispatch<SetStateAction<boolean>> }) {
    return (
        <Link href="/#pricing" className="text-md inline-flex w-full items-center space-x-2 rounded-lg bg-gray-900 p-3 px-4 py-3 text-white hover:bg-gray-700" onClick={() => setMobileMenuOpen(false)}>
            <span>Start now</span>
            <CursorArrowRippleIcon className="h-5 w-5" />
        </Link>
    )
}

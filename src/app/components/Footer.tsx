import { Logo } from './Logo'
import Link from 'next/link'
import { Socials } from './Socials'

export function Footer() {
    return (
        <footer id="footer" className="container mx-auto mt-32 divide-y-[1px] border-t-[1px] p-2 pb-10 text-gray-800 ">
            <div id="main_footer" className=" flex flex-col p-2 md:flex-row md:space-x-6 lg:space-x-16 ">
                <div id="company" className="flex flex-col space-y-4 p-2 md:w-1/4">
                    <Logo size={20} />

                    <p className="text-sm xl:max-w-[80%]">Our company&apos;s mission statement</p>
                    <Socials />
                    <p className="text-sm ">© 2026 Company Ltd. All rights reserved.</p>
                </div>

                <div id="links" className="mt-12 grid  grid-cols-2 gap-y-12 p-2 md:mt-0 md:w-3/4 md:grid-cols-4 md:gap-x-24 md:gap-y-0 lg:w-full lg:justify-between">
                    {footerLinks.map((column, columnIndex) => (
                        <div key={columnIndex} className="flex flex-col">
                            <h3 className="mb-6 text-sm font-medium">{column.title}</h3>
                            {column.links.map((link, linkIndex) => (
                                <Link key={linkIndex} href={link.href}>
                                    <p className="mb-4 inline-flex text-sm hover:text-gray-500 hover:underline">{link.text}</p>
                                </Link>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    )
}

const footerLinks = [
    {
        title: 'Product',
        links: [
            { text: 'Link 1', href: '/link1' },
            { text: 'Link 2', href: '/link2' },
            { text: 'Link 3', href: '/link3' },
        ],
    },
    {
        title: 'Company',
        links: [
            { text: 'Link 4', href: '/link4' },
            { text: 'Link 5', href: '/link5' },
            { text: 'Link 6', href: '/link6' },
        ],
    },
    {
        title: 'Careers',
        links: [
            { text: 'Link 7', href: '/link7' },
            { text: 'Link 8', href: '/link8' },
            { text: 'Link 9', href: '/link9' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { text: 'Link 10', href: '/link10' },
            { text: 'Link 11', href: '/link11' },
            { text: 'Link 12', href: '/link12' },
        ],
    },
]



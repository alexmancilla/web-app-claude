import Image from 'next/image'
import Link from 'next/link'

export function Logo({ size }: { size: number }) {
    return (

        <div className="flex">
            <Link href="/">
                <span className="sr-only">Your Company</span>
                <Image src="/logo.png" alt="Company Logo" width={size} height={size} />
            </Link>
        </div>

    )
}

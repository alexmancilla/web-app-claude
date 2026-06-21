import Link from 'next/link'

export function CallToAction() {
    return (
        <div className="flex justify-center text-center">
            <Link href="/dashboard" id="buy-btn" className="text-md rounded-md bg-gray-900 px-3.5 py-2.5 text-white shadow-lg transition ease-in-out hover:bg-gray-700 lg:w-[150px]">
                Buy now
            </Link>
        </div>
    )
}

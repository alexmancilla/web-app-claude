import { InboxArrowDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

export function ContactContent() {
    const support = 'support@app.com'
    return (
        <button className="flex w-full items-center space-x-2 rounded-lg p-2 text-blue-700 hover:bg-blue-50">
            <InboxArrowDownIcon className="h-4 w-4" />
            <Link href={`mailto:${support}`}>{support}</Link>
        </button>
    )
}

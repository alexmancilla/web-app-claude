
import { Logo } from "../../Logo"

export function FormTitle({ heading, subtext }: { heading: string, subtext: string }) {

    return (

        <div className="flex flex-row justify-between items-center ">
            <div>
                <h1 className="text-2xl font-medium">{heading}</h1>
                <p className="text-sm text-gray-500 mt-2">{subtext}</p>
            </div>
            <div>
                <Logo size={40} />
            </div>
        </div>

    )
}
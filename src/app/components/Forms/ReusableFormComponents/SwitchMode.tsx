'use client'
import { useRouter } from 'next/navigation'

export function SwitchMode({ currentMode }: { currentMode: string }) {
    switch (currentMode) {
        case "login":
            return (<SwitchToSignUp />);
        case "signup":
            return (<SwitchToLogin/>);
        default:
            return null;
    }
}

function SwitchToSignUp() {
    const router = useRouter()

    return (
        <p className='text-center text-gray-500 text-sm'>Don&apos;t have an account yet?{' '}
            <button
                type="button" // Prevent the default form submission behavior
                className="text-blue-500 hover:underline"
                onClick={() => {
                    router.push("/signup")
                }}
            >
                Sign up
            </button>
        </p>
    )
}

function SwitchToLogin() {
    const router = useRouter()

    return (
        <p className='text-center text-gray-500 text-sm'>Already have an account?{' '}

            <button
                type="button" // Prevent the default form submission behavior
                className="text-blue-500 hover:underline"
                onClick={() => {
                    router.push("/login")
                }}
            >
                Log in
            </button>
        </p>
    )
}
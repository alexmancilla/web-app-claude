import CircularProgress from '@mui/material/CircularProgress'
import { VerificationHandler } from './VerificationHandler'
import { checkAccountVerification } from '@/library/functions/user/check-verify-token'

export default async function ActivateAccountPage({ params }: { params: { token: string } }) {
    const token = params.token
    const verificationResult = await checkAccountVerification(token)
    
    return (
        <>
            <div className="mx-auto mt-12 flex flex-col items-center space-y-8 sm:mt-24">
                <div>
                    <CircularProgress style={{ color: '#000000' }} size={80} />
                </div>

                <p className="lg:text-md text-center text-sm text-gray-700">Verifying account...</p>
            </div>

            <VerificationHandler result={verificationResult} />
        </>
    )
}

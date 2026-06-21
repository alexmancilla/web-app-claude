'use client'
import Link from 'next/link'
import { Dispatch, SetStateAction, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'

const labelClass = 'block text-sm font-medium text-gray-800'
const inputClass = 'block inline-block w-full rounded-md ring-1 ring-gray-300 bg-gray-100 px-2 py-2 '
const errorClass = 'ml-1 mt-2 text-left text-sm text-red-600'

export function PasswordInput({ withForgotOption }: { withForgotOption: boolean }) {

    const [showPassword, setShowPassword] = useState(false)
    const { register, formState: { errors } } = useFormContext()

    return (

        <div>
            <label className={labelClass}>
                Password
            </label>

            <div className="mt-2 flex flex-row items-center">
                <input className={inputClass} id="password-input" type={showPassword ? 'text' : 'password'} placeholder="password" {...register('password', { required: true, minLength: 5 })} />
                <ShowPassword showPassword={showPassword} setShowPassword={setShowPassword} />
            </div>

            {errors.password?.type === 'required' && <p className={errorClass}>Password is required</p>}
            {errors.password?.type === 'minLength' && <p className={errorClass}>Password must be at least 5 characters long</p>}

            {withForgotOption && (
                <div className="ml-1 mt-2.5">
                    <ForgotPassword />
                </div>
            )}
        </div>
    )
}
export function ShowPassword({ showPassword, setShowPassword }: { showPassword: boolean, setShowPassword: Dispatch<SetStateAction<boolean>> }) {
    return (
        <div className="mx-auto p-2">
            {showPassword ? (
                <button
                type="button"
                    onClick={() => {
                            
                        setShowPassword(false)
                    }}
                >
                    <EyeSlashIcon width="20" height="20" />
                </button>
            ) : (
                <button 
                type="button"
                onClick={() => setShowPassword(true)} 
                >
                    <EyeIcon width="20" height="20"/>
                </button>
            )}
        </div>)
}



export function ForgotPassword() {
    return (
        <div className="text-xs sm:text-sm">
            <Link href="/reset-password">
                <span className="font-medium text-gray-400 hover:underline">Forgot your password?</span>
            </Link>
        </div>
    )
}

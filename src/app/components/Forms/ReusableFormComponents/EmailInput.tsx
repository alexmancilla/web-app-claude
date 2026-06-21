'use client'
import { useFormContext } from 'react-hook-form'

const labelClass = 'block text-sm font-medium text-gray-800'
const inputClass = 'block inline-block w-full ring-1 ring-gray-300 rounded-md bg-gray-100 px-2 py-2'
const errorClass = 'ml-1 mt-2 text-left text-sm text-red-600'

export function EmailInput() {
    
    const { register, formState: { errors } } = useFormContext() // retrieve all hook methods

    return (
        <div>
            <label className={labelClass}>
                Email
            </label>

            <div className="mt-2">
                <input className={`${inputClass} `} id="email" type="email" placeholder="your@mail.com" {...register('email', { required: true })} />
                {errors.email?.type === 'required' && <p className={errorClass}>Email required</p>}
            </div>
        </div>
    )
}

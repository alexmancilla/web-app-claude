'use client'
import { useFormContext } from "react-hook-form";

const labelClass = "block text-sm font-medium text-gray-800"
const inputClass = "block inline-block w-full rounded-md ring-1 ring-gray-300 bg-gray-100 px-2 py-2"
const errorClass = "ml-1 mt-2 text-left text-sm text-red-600"

export function NameInput() {

    const { register, formState: { errors } } = useFormContext()

    return (
        <div>
            <label className={labelClass}
            >
                Name
            </label>
            <div className="mt-2">
                <input
                    className={inputClass}
                    id="name"
                    type="name"
                    placeholder="name"
                    {...register('name', { required: true })}
                />
                {errors.email?.type === 'required' && (
                    <p className={errorClass}>
                        Name required
                    </p>)}
            </div>
        </div>
    )
}
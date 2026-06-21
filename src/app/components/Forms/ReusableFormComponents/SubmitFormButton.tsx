export function SubmitFormButton({ text, isLoading }: { text: string; isLoading: boolean }) {
    return (
        <div>
            <button
                type="submit"
                className={`inline-block w-full justify-center rounded-md px-3 py-2.5 text-sm tracking-wide text-white
                                ${isLoading ? 'cursor-not-allowed bg-gray-600' : 'bg-gray-800 hover:bg-gray-700'}`}
                disabled={isLoading}
            >
                {text}
            </button>
        </div>
    )
}

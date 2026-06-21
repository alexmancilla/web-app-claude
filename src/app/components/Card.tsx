export function Card({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto flex w-[95%] flex-col overflow-y-auto rounded-lg border bg-white p-8 shadow-md sm:mt-24 sm:w-[420px]">{children}</div>
    )
}

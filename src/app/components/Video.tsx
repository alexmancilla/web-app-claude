export function Video() {
    return (
        <section className="mx-auto mb-[3000px] mt-32 max-w-7xl p-2">
            <h2 className="text-center text-4xl font-medium tracking-tight sm:text-5xl">Video of product</h2>

            <div className="mx-auto mt-12 h-[320px] w-full md:h-[400px] md:w-[600px] xl:h-[600px] xl:w-[1024px]">
                <iframe className="h-full w-full" src="https://www.youtube.com/embed/jNQXAC9IVRw?si=Qem5fRa0uDJQEi6T" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
        </section>
    )
}

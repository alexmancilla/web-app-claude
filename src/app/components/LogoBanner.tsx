import Image from 'next/image'

export function LogoBanner() {
    return (
        <section id="logo-banner-section" className="mx-auto mt-24 max-w-7xl">
            <h2 id="logo-banner-title" className="text-center text-lg font-semibold leading-8">
                Partnering with global brands
            </h2>

            <div id="logo-banner" className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-16 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:max-w-6xl lg:grid-cols-5">
                <Image className="col-span-2 mx-auto h-12 object-contain lg:col-span-1" src="/logos/google.webp"  id="google-logo" alt="Google Logo" width={120} height={1} />
                <Image className="col-span-2 mx-auto h-20 object-contain  lg:col-span-1" src="/logos/netflix.png" id="netflix-logo" alt="Netflix Logo" width={120} height={1} />
                <Image className="col-span-2 mx-auto h-7 object-contain  lg:col-span-1 " src="/logos/meta.png" id="meta-logo" alt="Meta Logo" width={120} height={1} />
                <Image className="col-span-2 mx-auto h-10 object-contain sm:col-start-2 lg:col-span-1" src="/logos/airbnb.png" id="airbnb-logo" alt="Airbnb Logo" width={120} height={1} />
                <Image className="col-span-2 col-start-2 mx-auto h-10 object-contain sm:col-start-auto lg:col-span-1" src="/logos/openai.png" id="open-ai-logo" alt="OpenAI Logo" width={120} height={1} />
            </div>
        </section>
    )
}

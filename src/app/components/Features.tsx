import { MotionDiv } from '@/library/frontend/framer/framer'
import { SLIDE_IN_RIGHT_TO_LEFT_WITH_FADE } from '@/library/frontend/framer/framer_animations'
import {
    ArrowPathIcon,
    CloudArrowUpIcon,
    CubeTransparentIcon,
    LockClosedIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

const features = [
    {
        name: 'Feature 1',
        description:
            'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        icon: CloudArrowUpIcon,
    },
    {
        name: 'Feature 2',
        description:
            'Sit quis amet rutrum tellus ullamcorper ultricies libero dolor eget. Sem sodales gravida quam turpis enim lacus amet.',
        icon: LockClosedIcon,
    },
    {
        name: 'Feature 3',
        description:
            'Quisque est vel vulputate cursus. Risus proin diam nunc commodo. Lobortis auctor congue commodo diam neque.',
        icon: ArrowPathIcon,
    },
    {
        name: 'Feature 4',
        description:
            'Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis aliquet hac quis. Id hac maecenas ac donec pharetra eget.',
        icon: CubeTransparentIcon,
    },
]

export function Features() {
    return (
        <section className="mx-auto mt-32" id="features">
            <MotionDiv {...SLIDE_IN_RIGHT_TO_LEFT_WITH_FADE}>
                <FeatureHeader />
                <FeatureItems />
            </MotionDiv>
        </section>
    )
}

function FeatureHeader() {
    return (
        <h2 className="text-center text-3xl font-medium tracking-tight sm:text-5xl">
            All the features of this app
        </h2>
    )
}

function FeatureItems() {
    return (
        <div className="mx-auto mt-12 max-w-2xl lg:max-w-4xl">
            <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
                {features.map((feature) => (
                    <Link
                        href="/#pricing"
                        key={feature.name}
                        className="flex items-start space-x-6 rounded-lg border-[1px] p-4 transition ease-in-out hover:cursor-pointer hover:border-gray-300 hover:bg-gray-50"
                    >
                        <div className="my-auto flex h-10 w-10 p-2 items-center justify-center rounded-lg border-[1px] bg-gray-100">
                            <feature.icon className="h-6 w-6 text-gray-900" />
                        </div>

                        <div className="flex flex-col text-base font-semibold leading-8 ">
                            <p>{feature.name}</p>

                            <p className="text-base font-normal leading-6 text-gray-600">
                                {feature.description}
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

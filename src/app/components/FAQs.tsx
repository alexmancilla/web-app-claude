'use client'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Dispatch, SetStateAction, useState } from 'react'
import { AnimatePresence, MotionButton, MotionDiv } from '../../library/frontend/framer/framer'

export function FAQs() {
    const [expanded, setExpanded] = useState<number | boolean>(false)

    return (
        <section className="mt-32 flex flex-col" id="faqs">
            <h2 className="text-center text-3xl font-bold tracking-tight">FAQs</h2>

            <div className="mx-auto mt-6 w-full sm:w-[400px]">
                {faqs.map((item, i) => (
                    <SingleFAQ key={i} i={i} expanded={expanded} setExpanded={setExpanded} title={item.title} description={item.description} />
                ))}
            </div>
        </section>
    )
}

export function SingleFAQ({ i, expanded, setExpanded, title, description }: { i: number; expanded: boolean | number; setExpanded: Dispatch<SetStateAction<number | boolean>>; title: string; description: React.ReactNode | string }) {
    
    const isOpen = i === expanded

    return (
        <>
            <div className="border-b-[1px] px-4 py-2">
                <MotionButton initial={false} onClick={() => setExpanded(isOpen ? false : i)} className="flex w-full items-center py-2 hover:text-gray-500">
                    <span id={`faq-${i}`} className={`flex w-full items-center font-medium ${isOpen ? 'text-gray-500 transition duration-300' : ''}`}>{title}</span>

                    <span>
                        <PlusIcon height={15} width={15} className={` ${isOpen ? '-rotate-45 text-gray-500' : 'rotate-0'} transition duration-300 `} />
                    </span>
                </MotionButton>

                <AnimatePresence initial={false}>
                    {isOpen && (
                        <MotionDiv
                            variants={{
                                open: { opacity: 1, height: 'auto' },
                                collapsed: { opacity: 0, height: 0 },
                            }}
                            initial="collapsed"
                            animate="open"
                            exit="collapsed"
                            transition={{ duration: 0.4 }}
                        >
                            <p id={`faq-${i}-answer`} className="py-4">{description}</p>
                        </MotionDiv>
                    )}
                </AnimatePresence>
            </div>
        </>
    )
}

const faqs = [
    {
        title: 'What is Frontend?',
        description: 'Presents and interacts with the user interface in a web application.',
    },
    {
        title: 'What is Backend?',
        description: 'Manages server-side logic and data storage for applications.',
    },
    {
        title: 'What is MRR?',
        description: 'Monthly Recurring Revenue',
    },
]

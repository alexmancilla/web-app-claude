'use client'
import { Dispatch, SetStateAction, useState } from 'react'
import { MotionDiv } from '../../../library/frontend/framer/framer'
import { AccountContent } from './AccountContent'
import { ContactContent } from './ContactContent'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

type MenuItems = {
    title: string
    content: JSX.Element
}[]

const menuItems = [
    { title: 'Account', content: <AccountContent /> },
    { title: 'Contact', content: <ContactContent /> },
]


export function UserDashboard() {
    const [activeMenuItem, setActiveMenuItem] = useState<number | null>(null)
    return (
        <div className="mx-auto flex w-[95%] flex-col space-y-2 rounded-lg border-[1px] bg-white p-2 shadow-lg sm:w-[620px]">
            {renderMenuItems(menuItems, activeMenuItem, setActiveMenuItem)}
        </div>
    )
}


function renderMenuItems(menuItems: MenuItems, activeMenuItem: number | null, setActiveMenuItem: Dispatch<SetStateAction<number | null>>) {
    return menuItems.map((item, index) => (

        <div key={index}>
            {/* dropdown btn */}
            <button id={`menu-parent-${index}`}
                className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm hover:bg-gray-200/40 ${index === activeMenuItem ? 'bg-gray-200/40 transition duration-100' : ''}`}
                onClick={() => setActiveMenuItem(index === activeMenuItem ? null : index)}
            >

                <span>{item.title}</span>

                <KeyboardArrowDownIcon
                    className={`transform ${index === activeMenuItem ? '-rotate-90' : 'rotate-0'} transition-transform duration-300 ease-in-out `}
                    fontSize="small">
                </KeyboardArrowDownIcon>

            </button>
            
            {/* menu content */}
            <MotionDiv
                id={`menu-child-${index}`}
                key={index}
                initial="hidden"
                animate={index === activeMenuItem ? 'visible' : 'hidden'}
                transition={{ duration: 0.8 }}
                variants={{
                    visible: { opacity: 1 },
                    hidden: { opacity: 0 },
                }}
            >
                {index === activeMenuItem && <div className="px-2 pb-2 pt-4 text-sm">{item.content}</div>}
            </MotionDiv>
        </div>

    ))
}

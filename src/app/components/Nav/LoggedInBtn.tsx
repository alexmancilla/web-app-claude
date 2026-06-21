import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { UserCircleIcon, AdjustmentsHorizontalIcon, ArrowRightEndOnRectangleIcon } from '@heroicons/react/24/solid';
import { signOut } from "next-auth/react";
import Link from "next/link";

export function UserBtn() {

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="rounded-full bg-gray-200 px-2 py-1 text-black hover:bg-gray-300"><UserCircleIcon className="h-5 w-5" /></Menu.Button>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-32 rounded-md bg-white ring-1 ring-gray-200 flex flex-col space-y-2 p-1 items-start">
                    <Menu.Item>
                        <Link
                            href="/dashboard"
                            className="flex items-center rounded-md justify-start hover:bg-gray-100 p-1.5 py-2 space-x-2 w-full">
                            <span><AdjustmentsHorizontalIcon className="h-4 w-4" /></span>
                            <p>Dashboard</p>
                        </Link>
                    </Menu.Item>

                    <Menu.Item>
                        <button className="flex items-center rounded-md justify-start hover:bg-gray-100 p-1.5 py-2 space-x-2 w-full"
                            onClick={() => signOut({ callbackUrl: '/' })}
                        >
                            <span><ArrowRightEndOnRectangleIcon className="h-4 w-4" /></span>
                            <p className="">Log out</p>
                        </button>
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}


/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';

type LayoutProps = {
    children: ReactNode;
};

type Tab = {
    name: string;
    link: string;
}
const Tabs: Tab[] = [
    {
        name: "My Profile",
        link: "/profile"
    },
    {
        name: "Deliveries",
        link: "/profile/deliveries"
    },
    {
        name: "Edit",
        link: "/profile/edit"
    },
    {
        name: "Wishlist",
        link: "/profile/wishlist"
    },
]

const ProfileNav = ({ children }: LayoutProps) => {
    { /* Tabs */ }
    return (
        <div className="flex flex-auto">
            <div className="border-r border-gray-200 dark:border-gray-700" >
                <nav className="flex flex-col space-y-2" aria-label="Tabs" role="tablist" data-hs-tabs-vertical="true">
                    { /* Add Props.tabs */}
                    {Tabs.map((tab) => {
                        return (
                            <Link href={tab.link}> {tab.name} </Link>
                        )
                    })}
                </nav>
            </div >
            <div>
                {children}
            </div>
        </div >
    );
}

export default ProfileNav;
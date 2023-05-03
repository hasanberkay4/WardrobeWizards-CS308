/* eslint-disable react/jsx-key */
/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link';
import React from 'react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';

type LayoutProps = {
    children: ReactNode;
};

type Tab = {
    name: string;
    urlname: string;
    link: string;
}
const Tabs: Tab[] = [
    {
        name: "My Profile",
        urlname: "profile",
        link: "/profile"
    },
    {
        name: "Deliveries",
        urlname: "deliveries",
        link: "/profile/deliveries"
    },
    {
        name: "Edit",
        urlname: "edit",
        link: "/profile/edit"
    },
    {
        name: "Wishlist",
        urlname: "wishlist",
        link: "/profile/wishlist"
    },
]

const ProfileNav = ({ children }: LayoutProps) => {
    { /* Tabs */ }
    const router = useRouter();
    const activeTab = router.pathname.split('/').pop();
    return (
        <div className="flex flex-auto m-5">
            <div className="flex-4 order-r border-gray-200 dark:border-gray-700">
                <nav className="flex flex-col space-y-2" aria-label="Tabs" role="tablist" data-hs-tabs-vertical="true">
                    {Tabs.map((tab) => {
                        const isActive = tab.urlname === activeTab;
                        return (
                            <div
                                key={tab.name}
                                className={`cursor-pointer px-4 py-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 ${isActive ? 'bg-gray-200 text-gray-900' : ''}`}
                                role="tab"
                                aria-selected={isActive}
                                tabIndex={0}
                                onClick={() => { window.location.href = tab.link }}
                            >
                                {tab.name}
                            </div>
                        )
                    })}
                </nav>
            </div>
            <div className="flex-1 ml-20 mr-20">{children}</div>
        </div>
    );
}

export default ProfileNav;
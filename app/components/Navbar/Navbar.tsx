import { Disclosure } from '@headlessui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Drawer from "./Drawer";
import Drawerdata from "./Drawerdata";
import Signdialog from "./Signdialog";
import Registerdialog from "./Registerdialog";

interface NavigationItem {
    name: string;
    href: string;
    current: boolean;
}

const navigation: NavigationItem[] = [
    { name: 'Home', href: '/', current: true },
    { name: 'Description', href: '/#Description', current: false },
    { name: 'Packes', href: '/#Packes', current: false },
    { name: 'About us', href: '/#aboutus', current: false },
    { name: 'contact Us', href: '/#Newsletter', current: false },
    { name: 'Plan marketing', href: '/Plan_Marketing', current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}

const CustomLink = ({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) => {
    return (
        <Link href={href} passHref>
            <span
                onClick={onClick}
                className="px-15 py-4 text-balance font-sans"
            >
                {children}
            </span>
        </Link>
    );
};

const Navbar = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isSignDialogOpen, setIsSignDialogOpen] = useState(false);
    const [isSignupdialogProps, setIsSignupdialogProps] = useState(false);
    const [currentLink, setCurrentLink] = useState('/');

    const handleLinkClick = (href: string) => {
        setCurrentLink(href);
    };

    const openSignDialog = () => {
        setIsSignDialogOpen(true);
    };
    const openSignupDialog = () => {
        setIsSignupdialogProps(true);
    };

    return (
        <Disclosure as="nav" className="navbar">
            <>
                <div className="mx-auto max-w-7xl px-6 py-4 lg:px-8">
                    <div className="relative flex h-12 md:h-20 items-center justify-between">
                        <div className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                            {/* LOGO */}
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="block h-12 w-40 lg:hidden"
                                    src={'/assets/logo/logo2.svg'}
                                    alt="dsign-logo"
                                />
                                <img
                                    className="hidden h-full w-full lg:block"
                                    src={'/assets/logo/logo2.svg'}
                                    alt="dsign-logo"
                                />
                            </div>

                            {/* LINKS */}
                            <div className="hidden lg:block m-auto">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <CustomLink
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => handleLinkClick(item.href)}
                                        >
                                            <span
                                                className={classNames(
                                                    item.href === currentLink ? 'underline-links' : 'text-slategray',
                                                    'px-3 py-4 text-lg font-normal opacity-75 hover:opacity-100'
                                                )}
                                                aria-current={item.href ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </span>
                                        </CustomLink>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* SIGNIN DIALOG */}
                        <Signdialog isOpen={isSignDialogOpen} setIsOpen={setIsSignDialogOpen} />

                        {/* REGISTER DIALOG */}
                        <Registerdialog isOpen={isSignupdialogProps} setIsOpen={setIsSignupdialogProps} />

                        {/* DRAWER FOR MOBILE VIEW */}
                        <div className='block lg:hidden'>
                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" onClick={() => setIsDrawerOpen(true)} />
                        </div>

                        {/* DRAWER LINKS DATA */}
                        <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
                            <Drawerdata openSignDialog={openSignDialog}
                                signupDialog={openSignupDialog} />
                        </Drawer>
                    </div>
                </div>
            </>
        </Disclosure>
    );
};

export default Navbar;
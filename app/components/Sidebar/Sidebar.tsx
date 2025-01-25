import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";

import { ChevronDownIcon, Home, ListVideo, Menu, Mic2, Music, Network, Play, RadioIcon, SquareStack, User } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ScrollArea } from "./scroll-area";
import { cn } from "./utils";

type Menu = {
    label: string
    name: string
    icon: React.ReactNode
    submenu?: Submenu[]
    href: string
}

type Submenu = {
    name: string
    icon: React.ReactNode
    href: string
}

export function SidebarMenu() {
    const menus: Menu[] = [
        {
            label: "Discover",
            name: "Home",
            icon: <Home size={15} className="mr-2" />,
            href: "/Mainpage",
        },
        {
            label: "Discover",
            name: "User dashbord",
            icon: <SquareStack size={15} className="mr-2" />,
            href: "/Dashbord",
        },
        
        {
            label: "Network",
            name: "Tree",
            icon: <Network size={15} className="mr-2" />,
            href: "/Tree",
            
        },
        
        
    ];

    const uniqueLabels = Array.from(new Set(menus.map((menu) => menu.label)));

    return (
        <ScrollArea className="h-screen lg:w-48 sm:w-full  bg-black text-white">
            <div className="md:px-4 sm:p-0 mt-5">
                {uniqueLabels.map((label, index) => (
                    <React.Fragment key={label}>
                        {label && (
                            <p className={`mx-4 mb-3 text-xs text-left tracking-wider font-bold text-white ${index > 0 ? 'mt-10' : ''}`}>
                                {label}
                            </p>
                        )}
                        {menus
                            .filter((menu) => menu.label === label)
                            .map((menu) => (
                                <React.Fragment key={menu.name}>
                                    {menu.submenu && menu.submenu.length > 0 ? (
                                        <Accordion
                                            key={menu.name}
                                            type="single"
                                            className="mt-[-10px] mb-[-10px] p-0 font-normal"
                                            collapsible
                                        >
                                            <AccordionItem value="item-1" className="m-0 p-0 font-normal">
                                                <AccordionTrigger>
                                                    <a key={menu.name} className="w-full flex justify-start text-xs font-normal h-10 bg-black my-2 items-center p-4 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-background rounded-md">
                                                        <div className={cn("flex justify-between w-full [&[data-state=open]>svg]:rotate-180")}>
                                                            <div className="flex">
                                                                <div className="w-6">{menu.icon}</div>
                                                                {menu.name}
                                                            </div>
                                                            <ChevronDownIcon className="h-4 w-4 shrink-0 text-white transition-transform duration-200" />
                                                        </div>
                                                    </a>
                                                </AccordionTrigger>
                                                <AccordionContent>
                                                    {menu.submenu.map((submenu) => (
                                                        <Link key={submenu.name} href={submenu.href} className="text-white mt-0 mb-0 flex text-xs h-10 bg-black dark:bg-background dark:hover:bg-primary dark:hover:text-background my-2 items-center p-4 hover:bg-primary hover:text-white rounded-md">
                                                            <div className="w-6">{submenu.icon}</div>
                                                            {submenu.name}
                                                        </Link>
                                                    ))}
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ) : (
                                        <div key={menu.name}>
                                            <Link href={menu.href} className="flex text-xs h-10 bg-black dark:bg-background my-2 items-center p-4 hover:bg-primary dark:hover:bg-primary dark:hover:text-background hover:text-white rounded-md">
                                                <div className="w-6">{menu.icon}</div>
                                                {menu.name}
                                            </Link>
                                        </div>
                                    )}
                                </React.Fragment>
                            ))}
                    </React.Fragment>
                ))}
            </div>
        </ScrollArea>
    );
}

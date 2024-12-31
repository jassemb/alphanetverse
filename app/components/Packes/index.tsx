"use client";
import Slider from "react-slick";
import Image from "next/image";
import { Dialog, DialogTitle, Transition } from '@headlessui/react'
import { DialogContent, DialogContentText, DialogActions, Button } from '@mui/material'
import { Fragment, useState, useEffect } from 'react'
import { LockClosedIcon } from '@heroicons/react/20/solid'
import { useRouter } from 'next/navigation'

// CAROUSEL DATA

interface DataType {
    heading: string;
    heading2: string;
    imgSrc: string;
    name: string;
    classes: number;
    Commission: string;
}

const postData: DataType[] = [
    {
        heading: 'Pack Startup',
        heading2: 'Découvrez nos offres adaptées à vos besoins et commencez votre aventure avec Netverse.',
        name: "Commission",
        imgSrc: '/assets/packes/courseone.png',
        classes: 12,
        Commission: 'Parrainage 45%',
    },
    {
        heading: 'Pack Startup Plus',
        heading2: 'Maximisez Vos Revenus avec le Pack 1',
        name: "Commission",
        imgSrc: '/assets/packes/coursetwo.png',
        classes: 12,
        Commission: "Upgrade 50%",
    },
    {
        heading: 'Pack 1',
        heading2: 'Vous ouvrez la porte à des opportunités de gains exceptionnelles grâce à notre système de commissions unique.',
        name: "Commission",
        imgSrc: '/assets/packes/coursethree.png',
        classes: 12,
        Commission: "Directes jusqu'au 3ᵉ Niveau",
    },
    {
        heading: 'Pack 2',
        heading2: 'Vous accédez à des bénéfices incomparables et une structure de revenus accrue, renforcée par des commissions sur 6 générations et des revenus récurrents pendant 12 mois.',
        name: "Commission",
        imgSrc: '/assets/packes/courseone.png',
        classes: 12,
        Commission: "Jusqu'à 6 Générations",
    },
    {
        heading: 'Pack 3',
        heading2: 'Vous accédez à des bénéfices incomparables et une structure de revenus bien plus robuste, renforcée par des commissions sur 9 générations et des revenus récurrents pendant 12 mois.',
        name: "Commission",
        imgSrc: '/assets/packes/coursetwo.png',
        classes: 12,
        Commission: "Jusqu'à 9 Générations",
    },
];

// CAROUSEL SETTINGS

const MultipleItems = () => {
    const [open, setOpen] = useState(false);
    const [selectedPack, setSelectedPack] = useState<DataType | null>(null);

    const handleClickOpen = (pack: DataType) => {
        setSelectedPack(pack);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedPack(null);
    };

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows: false,
        autoplay: false,
        speed: 500,
        cssEase: "linear",
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                },
            },
        ],
    };

    return (
        <div id="Packes">
            <div className='mx-auto max-w-7xl sm:py-6 px-4 lg:px-4 '>
                <div className="sm:flex sm:flex-col justify-between items-start">
                    <h3 className="text-midnightblue text-4xl lg:text-5xl font-semibold mb-5 sm:mb-2">Description de Notre Application Web</h3>
                    <p className="text-lg mb-4">Chez Netverse, chaque pack que nous proposons est bien plus qu&apos;un simple produit, c&apos;est un service de formation certifié, conçu pour vous accompagner dans votre parcours de croissance personnelle et professionnelle. Découvrez nos offres adaptées à vos besoins et commencez votre aventure avec Netverse, seulement pour <span className="font-bold text-xl">99AC</span>.</p>
                </div>

                <Slider {...settings}>
                    {postData.map((items, i) => (
                        <div key={i}>
                            <div className='bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-Packes rounded-2xl'>
                                <div className="relative rounded-3xl">
                                    <Image src={items.imgSrc} alt="Pack Image" width={389} height={262} className="m-auto clipPath" />
                                </div>

                                <div className="px-3">
                                    <h4 className='text-2xl font-bold pt-6 text-black'>{items.heading}</h4>
                                    <h4 className='text-sm pt-1 text-black'>{items.heading2}</h4>

                                    <div>
                                        <h3 className='text-base font-normal pt-6 opacity-75'>{items.name}</h3>
                                    </div>

                                    <div className="flex justify-between items-center py-6">
                                        <div>
                                            <h3 className="text-xl font-medium">{items.Commission}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>

                <Transition appear show={open} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={handleClose}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">

                                        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                                            <div className="w-full max-w-md space-y-8">
                                                <div>
                                                    <img
                                                        className="mx-auto h-12 w-auto"
                                                        src="/assets/logo/logo2.svg"
                                                        alt="Your Company"
                                                    />
                                                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                                                        Sign in to your account
                                                    </h2>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-end">
                                            Got it, thanks!
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </div>
        </div>
    );
};

export default MultipleItems;

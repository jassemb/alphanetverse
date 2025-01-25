"use client";

import { useState } from 'react';
import Image from 'next/image';

const Banner = () => {
    const images = [
        { src: '/assets/netverseimages/pres/1.png', alt: 'Image 1', theme: 'bg-red-500' },
        { src: '/assets/netverseimages/pres/2.png', alt: 'Image 2', theme: 'bg-blue-500' },
        { src: '/assets/netverseimages/pres/3.png', alt: 'Image 3', theme: 'bg-green-500' },
        { src: '/assets/netverseimages/pres/4.png', alt: 'Image 4', theme: 'bg-yellow-500' },
        { src: '/assets/netverseimages/pres/5.png', alt: 'Image 5', theme: 'bg-purple-500' },
        { src: '/assets/netverseimages/pres/6.png', alt: 'Image 6', theme: 'bg-pink-500' },
        { src: '/assets/netverseimages/pres/7.png', alt: 'Image 6', theme: 'bg-pink-500' },

    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleDotClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div id="home-section" className={`${images[currentImageIndex].theme} transition-all duration-500 min-h-screen`}>
            <div className="mx-auto max-w-7xl pt-20 sm:pb-24 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Section */}
                    <div className="col-span-5 flex flex-col justify-evenly">
                        <h1 className="text-midnightblue text-4xl sm:text-4xl font-semibold text-center lg:text-start lh-120 pt-4 lg:pt-0">
                            Bienvenue chez Netverse, une fusion unique entre le marketing de réseau et l’univers virtuel.
                        </h1>
                        <h3 className="text-charcoal text-lg font-normal text-center lg:text-start opacity-75 mt-1 mb-0">
                            Nous proposons des packages de formation et des outils concrets pour vous accompagner dans votre réussite professionnelle.
                        </h3>

                        <div className="flex flex-col gap-4 mt-6">
                            {[
                                'Accédez à des packs de démarrage adaptés à tous les niveaux, du débutant à l’expert.',
                                'Participez à une aventure virtuelle avec des bénéfices bien réels.',
                                'Parrainez des partenaires et partagez les succès d’un réseau dynamique.',
                            ].map((text, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <Image src="/assets/banner/check.svg" alt="check icon" width={20} height={20} />
                                    <h3 className="text-xs sm:text-lg font-normal text-black">{text}</h3>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Section with Image Carousel */}
                    <div className="col-span-7 flex flex-col items-center">
                        {/* Current Image */}
                        <div className="relative w-full max-w-lg mt-20">
                            <Image
                                src={images[currentImageIndex].src}
                                alt={images[currentImageIndex].alt}
                                width={900}
                                height={900}
                                
                            />
                        </div>

                        {/* Dot Navigation */}
                        <div className="flex gap-2 mt-4">
                            {images.map((_, index) => (
                                <button
                                key={index}
                                onClick={() => handleDotClick(index)}
                                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                                    currentImageIndex === index
                                        ? 'bg-black'
                                        : 'bg-lightgray hover:bg-gray-blue'
                                }`}
                            ></button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;

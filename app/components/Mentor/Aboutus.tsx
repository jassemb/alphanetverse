"use client";

import { useState } from 'react';
import Image from 'next/image';

const Aboutus = () => {
    const images = [
        { src: '/assets/nos/1.png', alt: 'Image 1', theme: 'bg-red-500' },
        { src: '/assets/nos/2.png', alt: 'Image 2', theme: 'bg-blue-500' },
        { src: '/assets/nos/3.png', alt: 'Image 3', theme: 'bg-green-500' },
        { src: '/assets/nos/4.png', alt: 'Image 4', theme: 'bg-yellow-500' },
        { src: '/assets/nos/5.png', alt: 'Image 5', theme: 'bg-purple-500' },
        { src: '/assets/nos/6.png', alt: 'Image 6', theme: 'bg-pink-500' },
        { src: '/assets/nos/7.png', alt: 'Image 6', theme: 'bg-pink-500' },

    ];


    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handleDotClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div id="aboutus" className={`${images[currentImageIndex].theme}  ml-10 transition-all duration-500`}>
            <div className="mx-auto max-w-8xl pt-2 sm:pb-6 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Right Section with Image Carousel */}
                    <div className="col-span-4 flex flex-col items-center">
                        {/* Current Image */}
                        <div className="relative w-full max-w-full"> {/* Change max-w-lg to max-w-full */}
                            <Image
                                src={images[currentImageIndex].src}
                                alt={images[currentImageIndex].alt}
                                width={1000}  
                                height={700} 
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

                    {/* Left Section */}
                    <div className="col-span-8 flex flex-col justify-evenly">
                        <h1 className="text-midnightblue text-4xl sm:text-4xl font-semibold text-center lg:text-start lh-120 pt-4 lg:pt-0">
                            Qui Sommes-Nous ? 
                        </h1>
                        <h3 className="text-charcoal text-lg font-normal text-center lg:text-start opacity-75 mt-1 mb-0">
                            Netverse est bien plus qu’une plateforme :
                        </h3>

                        <div className="flex flex-col gap-2 ml-4 lg:ml-0">
                            {[
                                'Une communauté dynamique de personnes motivées.',
                                'Un réseau dédié à la réussite collective et au partage des connaissances.',
                                'Notre mission : Créer des opportunités tangibles dans le monde virtuel grâce à l’union de nos forces et à la prospérité collective.',
                            ].map((text, index) => (
                                <div key={index} className="flex items-start gap-2">
                                    <Image src="/assets/banner/check-circle.svg" alt="check icon" width={20} height={20} />
                                    <h3 className="text-xs sm:text-lg font-normal text-black">{text}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Aboutus;

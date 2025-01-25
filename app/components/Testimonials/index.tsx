"use client"
import Slider from "react-slick";
import React, { Component } from "react";
import { StarIcon } from '@heroicons/react/24/solid';
import Image from "next/image";

// CAROUSEL DATA

interface DataType {
    profession: string;
    comment: string;
    imgSrc: string;
    name: string;
}

const postData: DataType[] = [
    {
        name: "Netverse",
        profession: 'Plateforme de Réussite',
        comment: 'Développez votre potentiel avec Netverse : Accédez à vos formations à tout moment, où que vous soyez.',
        imgSrc: '/assets/testimonial/one.svg',
    },
    {
        name: "Netverse",
        profession: 'Plateforme de Réussite',
        comment: 'Exploitez des outils de travail puissants pour optimiser votre productivité et atteindre vos objectifs.',
        imgSrc: '/assets/testimonial/two.svg',
    },
    {
        name: "Netverse",
        profession: 'Plateforme de Réussite',
        comment: 'Parrainage simplifié : Référez de nouveaux partenaires et développez facilement votre réseau.',
        imgSrc: '/assets/testimonial/three.svg',
    },
    {
        name: "Netverse",
        profession: 'Plateforme de Réussite',
        comment: 'Suivi en temps réel de vos bénéfices pour une gestion efficace de vos progrès.                                         ',
        imgSrc: '/assets/testimonial/four.svg',
    },
    {
        name: "Netverse",
        profession: 'Plateforme de Réussite',
        comment: 'Suivi de votre équipe et de vos partenaires pour garantir une collaboration optimale et une croissance commune.',
        imgSrc: '/assets/testimonial/five.svg',
    }


]

// CAROUSEL SETTINGS


export default class MultipleItems extends Component {

    render() {
        const settings = {
            dots: true,
            dotsClass: "slick-dots",
            infinite: true,
            slidesToShow: 3,
            // centerMode: true,
            slidesToScroll: 2,
            arrows: false,
            autoplay: false,
            speed: 500,
            autoplaySpeed: 2000,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 800,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false
                    }
                }
            ]
        };

        return (

            <div className="pt-4 pb-10 sm:pb-32 lg:py-10" id="testimonial">

                <div className='mx-auto max-w-7xl  lg:px-8'>
                    <div className="sm:flex sm:flex-col justify-between items-start">
                        <h3 className="text-midnightblue text-4xl lg:text-5xl font-semibold mb-5 sm:mb-2">Description de Notre Application Web</h3>
                        <h6 className="text-lg mb-4">Netverse vous garantit une connexion sans interruption grâce à nos solutions numériques :</h6>
                    </div>
                    <Slider {...settings}>
                        {postData.map((items, i) => (
                            <div key={i}>
                                <div className={`bg-white m-4 p-5 my-20 relative ${i % 2 ? 'middleDiv' : 'testimonial-shadow'}`}>
                                    <div className="absolute top-[-59px] left-12 transform -translate-x-1/2">
                                        {/* Set a fixed size for all images */}
                                        <Image
                                            src={items.imgSrc}
                                            alt={items.imgSrc}
                                            width={100}  // Fixed width
                                            height={100} // Fixed height
                                            className="inline-block object-cover rounded-full" // Makes the image round if desired
                                        />
                                    </div>
                                    <h4 className="text-base font-normal text-darkgray my-4">{items.comment}</h4>
                                    <hr style={{ color: "#D7D5D5" }} />
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="text-lg font-medium text-darkbrown pt-4 pb-2">{items.name}</h3>
                                            <h3 className="text-sm font-normal text-lightgray pb-2">{items.profession}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>

                </div>
            </div>

        );
    }
}

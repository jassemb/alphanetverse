"use client";

import { useState } from 'react';
import Image from 'next/image';
import Slider from "react-slick";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

// CAROUSEL DATA

interface DataType {
    heading: string;
    heading2: string;
    imgSrc: string;
    name: string;
    // Formateur: string[];
    classes: number;
    Commission: string;
}

const postData: DataType[] = [
    {
        heading: 'Pack Startup',
        heading2: 'Découvrez nos offres adaptées à vos besoins et commencez votre aventure avec Netverse.',
        name: "Commission ",
        imgSrc: '/assets/packes/courseone.png',
        // Formateur:  ["COACH ASMI HACHEM", "COACH FADY HAMZA", "COACH DORSAF HLEL"],
        classes: 12,
        Commission: 'Parrainage 45%'
    },
    {
        heading: 'Pack Startup Plus',
        heading2: 'Maximisez Vos Revenus avec le Pack 1 ',
        name: "Commission",
        imgSrc: '/assets/packes/coursetwo.png',
       // Formateur:  ["COACH ASMI HACHEM", "COACH FADY HAMZA", "COACH DORSAF HLEL"],
        classes: 12,
        Commission: "upgrade 50%"
    },
    {
        heading: 'Pack 1',
        heading2: 'vous ouvrez la porte à des opportunités de gains exceptionnelles grâce à notre système de commissions unique.',
        name: "Commission",
        imgSrc: '/assets/packes/coursethree.png',
       // Formateur:  ["COACH ASMI HACHEM", "COACH FADY HAMZA", "COACH DORSAF HLEL"],
        classes: 12,
        Commission: "Directes jusqu'au 3ᵉ Niveau "
    },
    {
        heading: 'Pack 2',
        heading2: 'vous accédez à des bénéfices incomparables et une structure de revenus accrue, renforcée par des commissions sur 6 générations et des revenus récurrents pendant 12 mois.',
        name: "Commission",
        imgSrc: '/assets/packes/courseone.png',
       // Formateur:  ["COACH ASMI HACHEM", "COACH FADY HAMZA", "COACH DORSAF HLEL"],
        classes: 12,
        Commission: " jusqu'à 6 Générations"
    },
    {
        heading: 'Pack 3',
        heading2: 'vous accédez à des bénéfices incomparables et une structure de revenus bien plus robuste, renforcée par des commissions sur 9 générations et des revenus récurrents pendant 12 mois.',
        name: "Commission",
        imgSrc: '/assets/packes/coursetwo.png',
      //  Formateur:  ["COACH ASMI HACHEM", "COACH FADY HAMZA", "COACH DORSAF HLEL"],
        classes: 12,
        Commission: "jusqu'à 9 Générations"
    },
    
]

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
        // centerMode: true,
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
        <div id="Packes">
            <div className='mx-auto max-w-7xl sm:py-8 px-4 lg:px-8 '>

                <div className="sm:flex sm:flex-col justify-between items-start">
                    <h3 className="text-midnightblue text-4xl lg:text-5xl font-semibold mb-5 sm:mb-2">Description de Notre Application Web</h3>
                    <p className="text-lg mb-4">Chez Netverse, chaque pack que nous proposons est bien plus qu'un simple produit, c'est un service de formation certifié, conçu pour vous accompagner dans votre parcours de croissance personnelle et professionnelle.
                    "Découvrez nos offres adaptées à vos besoins et commencez votre aventure avec Netverse, seulement pour <span className="font-bold text-xl">99AC</span>."
                    </p>
                </div>

                <Slider {...settings}>
                    {postData.map((items, i) => (
                        <div key={i} onClick={() => handleClickOpen(items)}>
                            <div className='bg-white m-3 px-3 pt-3 pb-12 my-20 shadow-Packes rounded-2xl'>
                                <div className="relative rounded-3xl">
                                    <Image src={items.imgSrc} alt="gaby" width={389} height={262} className="m-auto clipPath" />
                                </div>

                                <div className="px-3">
                                    <h4 className='text-2xl font-bold pt-6 text-black'>{items.heading}</h4>
                                    <h4 className='text-sm  pt-1 text-black'>{items.heading2}</h4>

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

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{selectedPack?.heading}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {selectedPack?.heading2}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
};

export default MultipleItems;
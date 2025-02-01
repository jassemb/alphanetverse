"use client";
import React, { useState } from "react";
import { FaHeart, FaShareAlt, FaEye, FaTimes } from "react-icons/fa";
import EventCard from "../PostEvent/EventCard";

interface CardProps {
  image: string;
  title: string;
  description: string;
  avatar: string;
  author: string;
  eventData: {
    title: string;
    description: string;
    startDate: string;
    
    location: string;
    image: string;
    creator: {
      name: string;
      avatar: string;
    };
    participants: number;
    external_link: string;
  };
}

const Card: React.FC<CardProps> = ({ image, title, description, avatar, author, eventData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    console.log("Opening modal..."); // Debugging log
    setIsModalOpen(true);
  };

  const closeModal = () => {
    console.log("Closing modal..."); // Debugging log
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-sm mx-auto bg-gray-100 shadow-lg rounded-lg overflow-hidden sm:max-w-md md:max-w-lg lg:max-w-xl">
      {/* Card Image */}
      <div className="relative group">
        <img
          className="w-full h-64 object-cover transition-transform duration-300 transform group-hover:scale-105"
          src={image}
          alt="Card Image"
        />
        <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-semibold rounded-bl-lg px-2 py-1">
          New
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* FaEye now opens the modal */}
          <FaEye
            className="text-white text-3xl cursor-pointer"
            onClick={openModal}
          />
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 bg-gray-50">
        <h2 className="text-xl font-semibold text-gray-800 capitalize">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
        <div className="flex items-center mt-4">
          <div className="flex items-center">
            <img
              className="w-10 h-10 object-cover rounded-full border-2 border-blue-500"
              src={avatar}
              alt="Avatar"
            />
            <span className="mx-2 text-gray-700 font-semibold hover:text-gray-900 transition duration-300 cursor-pointer">
              {author}
            </span>
          </div>
          <span className="mx-1 text-xs text-gray-600">|</span>
          
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition duration-300 transform hover:scale-105">
            Explore More
          </button>
          
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div
            className="flex-grow overflow-y-scroll scrollbar-hidden"
          >
            {/* EventCard */}
            <div
              className="relative"
              onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside the modal
            >
              <EventCard eventData={eventData} />
            </div>
          </div>
          {/* Close button */}
          <div className="absolute top-10 mx-20">
            <button
              onClick={closeModal} // Close modal only when this button is clicked
              className="text-white p-2 rounded-full bg-red"
            >
              <FaTimes size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Card;

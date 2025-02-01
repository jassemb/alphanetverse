import React, { useState } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTimes, FaNetworkWired } from "react-icons/fa";
import Image from "next/image";

interface EventCardProps {
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

const EventCard: React.FC<EventCardProps> = ({ eventData }) => {
  const [isVisible, setIsVisible] = useState(true); // State to control visibility

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Function to extract URL from description
  const extractUrl = (description: string): string | null => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const match = description.match(urlRegex);
    return match ? match[0] : null;
  };

  // Function to remove URL from description
  const removeUrlFromDescription = (description: string): string => {
    return description.replace(/https?:\/\/[^\s]+/g, '');
  };

  // Extract the URL and set it in external_link
  const externalLink = extractUrl(eventData.description) || eventData.external_link;

  // Remove the URL from the description
  const cleanedDescription = removeUrlFromDescription(eventData.description);

  // Close button click handler
  const handleClose = () => {
    setIsVisible(false); // Hide the card
  };

  // Don't render the card if it's not visible
  if (!isVisible) return null;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105">


        <div className="relative h-64">
          <Image
            src={eventData.image}
            alt={eventData.title}
            layout="fill"
            objectFit="cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1560439514-4e9645039924";
            }}
          />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-3">{eventData.title}</h1>

          {/* Display cleaned description */}
          <p className="text-gray-600 mb-4">{cleanedDescription}</p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-700">
              <FaCalendarAlt className="mr-2" />
              <div>
                <p className="text-sm">Start: {formatDate(eventData.startDate)}</p>
                
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <FaNetworkWired className="mr-2" />
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-Blueviolet hover:underline"
              >
                {externalLink}
              </a>


            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center space-x-3">
              <Image
                src={eventData.creator.avatar}
                alt={eventData.creator.name}
                width={40}
                height={40}
                className="rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                }}
              />
              <div>
                <p className="text-sm font-medium text-gray-800">{eventData.creator.name}</p>
                <p className="text-xs text-gray-500">Event Organizer</p>
              </div>
            </div>

            <div className="flex items-center text-gray-600">
              <FaUsers className="mr-1" />
              <span className="text-sm">{eventData.participants} participants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

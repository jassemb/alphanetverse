import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";
import Image from "next/image";

interface EventCardProps {
  eventData: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    location: string;
    image: string;
    creator: {
      name: string;
      avatar: string;
    };
    participants: number;
  };
}

const EventCard: React.FC<EventCardProps> = ({ eventData }) => {
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

          <p className="text-gray-600 mb-4">{eventData.description}</p>

          <div className="space-y-3 mb-4">
            <div className="flex items-center text-gray-700">
              <FaCalendarAlt className="mr-2" />
              <div>
                <p className="text-sm">Start: {formatDate(eventData.startDate)}</p>
                <p className="text-sm">End: {formatDate(eventData.endDate)}</p>
              </div>
            </div>

            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2" />
              <span className="text-sm">{eventData.location}</span>
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

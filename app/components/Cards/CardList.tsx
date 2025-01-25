import React from "react";
import Card from "../Cards/Cards";

const CardList: React.FC = () => {
  const cardsData = [
    {
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Exploring the Mountains",
      description: "Discover breathtaking mountain views and serene landscapes.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "City Lights",
      description: "Experience the vibrant energy of the city at night.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      title: "Ocean Bliss",
      description: "Feel the tranquility of the ocean waves and sea breeze.",
    },
  ];

  return (
    <div className="space-y-6 p-4"> {/* `space-y-6` adds vertical spacing between cards */}
      {cardsData.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description} avatar={""} author={""} eventData={{
            title: card.title,
            description: card.description,
            startDate: "",
            endDate: "",
            location: "",
            image: card.image,
            creator: {
              name: "admin",
              avatar: ""
            },
            participants: 0
          }}        />
      ))}
    </div>
  );
};

export default CardList;

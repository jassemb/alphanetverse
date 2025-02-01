import React, { useEffect, useState } from "react";
import Card from "../Cards/Cards";

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

const CardList: React.FC = () => {
  const [cardsData, setCardsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage

      if (!token) {
        setError("No token found. Please log in.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch("http://51.77.230.180:8000/api/v1/feeds/all/", {
          headers: {
            Authorization: `Bearer ${token}`, // Use the token dynamically
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCardsData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-6 p-4">
      {cardsData.length > 0 ? (

        [...cardsData] // Create a copy of the array
          .reverse().map((card) => {
            // Extract and remove URL from description
            const externalLink = extractUrl(card.content);
            const cleanedDescription = removeUrlFromDescription(card.content);

            return (
              <Card
                key={card.id}
                image={card.image}
                title={card.title}
                description={cleanedDescription} // Display cleaned description
                avatar=""
                author={card.author}
                eventData={{
                  title: card.title,
                  description: cleanedDescription, // Use cleaned description
                  startDate: card.publication_date,
                  
                  location: "",
                  image: card.image,
                  creator: {
                    name: card.author,
                    avatar: "",
                  },
                  participants: 0,
                  external_link: externalLink || "", // Use extracted external link
                }}
              />
            );
          })
      ) : (
        <Card
          image="/assets/netverseimages/pres/2.png"
          title="No Events Available"
          description="Currently, there are no events to display. Please check back later."
          avatar="/assets/logo/logo2.svg"
          author="Alpha Netverse"
          eventData={{
            title: "No Events Available",
            description: "Currently, there are no events to display.",
            startDate: "",
            
            location: "",
            image: "",
            creator: {
              name: "Alpha Netverse",
              avatar: "/assets/logo/logo2.svg",
            },
            participants: 0,
            external_link: "",
          }}
        />
      )}
    </div>
  );
};

export default CardList;

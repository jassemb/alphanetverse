"use client";
import Image from "next/image";
import Navbar from "../Navbar";

const PackDetails = () => {
  const packs = [
    {
      id: "startup",
      title: "Pack Startup",
      description: [
        "Commission Parrainage 45%",
        "Maximisez vos revenus dès le début avec des commissions attractives.",
      ],
      image: "/assets/Plan/1.png",
      theme: "bg-red-100",
    },
    {
      id: "startup-plus",
      title: "Pack Startup Plus",
      description: [
        "Commission upgrade 50%",
        "Des opportunités encore plus grandes pour augmenter vos revenus.",
      ],
      image: "/assets/Plan/2.png",
      theme: "bg-blue-100",
    },
    {
      id: "pack-1",
      title: "Pack 1",
      description: [
        "Maximisez vos revenus avec le Pack 1.",
        "En faisant l'upgrade vers le Pack 1, vous ouvrez la porte à des opportunités de gains exceptionnelles.",
        "Profitez de notre système de commissions unique.",
      ],
      image: "/assets/Plan/3.png",
      theme: "bg-green-100",
    },
    {
      id: "pack-2",
      title: "Pack 2",
      description: [
        "Faites l'Upgrade vers le Pack 2 et multipliez vos revenus.",
        "Commissions jusqu'à 6 Générations.",
        "Commissions récurrentes sur 12 mois.",
        "Motivation des grades et cadeaux exclusifs.",
      ],
      image: "/assets/Plan/4.png",
      theme: "bg-yellow-100",
    },
    {
      id: "pack-3",
      title: "Pack 3",
      description: [
        "Faites l'Upgrade vers le Pack 3 et multipliez vos revenus.",
        "1️⃣ Commissions jusqu'à 9 Générations: Recevez des commissions sur un réseau étendu.",
        "2️⃣ Commissions récurrentes sur 12 mois: Revenus réguliers pendant toute l'année.",
        "3️⃣ Motivation des grades et cadeaux: Outils et bonus pour un succès accru.",
        "**Note Importante:** Vous avez trois sources de revenus:",
        "- Salaire 1: Commissions directes et récurrentes sur 3 niveaux (Pack 1).",
        "- Salaire 2: Commissions sur 6 générations et revenus récurrents pendant 12 mois (Pack 2).",
        "- Salaire 3: Commissions sur 9 générations et revenus récurrents pendant 12 mois (Pack 3).",
      ],
      image: "/assets/Plan/5.png",
      theme: "bg-purple-100",
    },
  ];

  return (
    
    <div className="min-h-screen">
      {packs.map((pack, index) => (
        <div
          key={pack.id}
          className={`py-16 px-6 ${pack.theme} transition-all duration-500`}
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Section */}
            {index % 2 === 0 ? (
              <>
                <div className="col-span-5">
                  <Image
                    src={pack.image}
                    alt={pack.title}
                    width={600}
                    height={600}
                    className="rounded-lg"
                  />
                </div>
                <div className="col-span-7 text-center lg:text-left px-4">
                  <h2 className="text-3xl font-bold mb-4">{pack.title}</h2>
                  <ul className="text-lg space-y-2">
                    {pack.description.map((line, i) => (
                      <li key={i} className="leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="col-span-7 text-center lg:text-left px-4">
                  <h2 className="text-3xl font-bold mb-4">{pack.title}</h2>
                  <ul className="text-lg space-y-2">
                    {pack.description.map((line, i) => (
                      <li key={i} className="leading-relaxed">
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-5">
                  <Image
                    src={pack.image}
                    alt={pack.title}
                    width={600}
                    height={600}
                    className="rounded-lg"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PackDetails;

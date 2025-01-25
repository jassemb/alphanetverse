"use client";// This marks the component as a client-side component
import React, { useState } from "react";
import { FaWallet, FaUserFriends, FaCopy, FaCheck, FaRegCopy, FaShareAlt, FaEdit } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { BsShieldFillCheck } from "react-icons/bs";
import { IoMdTrendingUp } from "react-icons/io";

const UserProfileCard = () => {
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const userData = {
    id: "user123",
    name: "Alexander Mitchell",
    designation: "Senior Product Manager",
    verified: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    walletBalance: 2547.89,
    currency: "USD",
    networkSize: 1234,
    networkGrowth: 23.5,
    transactions: [
      { id: 1, type: "received", amount: 500, date: "2024-01-15" },
      { id: 2, type: "sent", amount: -200, date: "2024-01-14" },
      { id: 3, type: "received", amount: 300, date: "2024-01-13" }
    ]
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`p-4 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
      <div className="max-w-md mx-auto"> 

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative">
              <img
                src={userData.avatar}
                alt={userData.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-blue-500" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1633332755192-727a05c4013d";
                }}
              />
              {userData.verified && (
                <div className="absolute -top-2 -right-2 bg-blue-500 p-1.5 rounded-full">
                  <BsShieldFillCheck className="text-white text-lg" />
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">{userData.name}</h2> {/* Reduce font size */}
              <p className="text-sm text-gray-600 dark:text-gray-300">{userData.designation}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <h3 className="text-base font-semibold mb-3 text-gray-800 dark:text-white">Profile QR</h3>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={userData.walletAddress}
                  size={120} 
                  level="H"
                  includeMargin={true}
                  className="p-2 bg-white rounded-lg"
                />
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white">Wallet</h3>
                <FaWallet className="text-blue-500 text-lg" />
              </div>

              <div className="mb-3">
                <p className="text-xs text-gray-600 dark:text-gray-300">Balance</p>
                <p className={`text-xl font-bold ${userData.walletBalance > 1000 ? "text-green-500" : "text-red-500"}`}>
                  ${userData.walletBalance.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1">{userData.walletAddress}</p>
                <button
                  onClick={() => handleCopy(userData.walletAddress)}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all"
                >
                  {copied ? <FaCheck className="text-green-500" /> : <FaRegCopy className="text-gray-500" />}
                </button>
              </div>

              <div className="space-y-1.5">
                {userData.transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between text-xs">
                    <span className="text-gray-600 dark:text-gray-300">{tx.date}</span>
                    <span className={tx.type === "received" ? "text-green-500" : "text-red-500"}>
                      {tx.type === "received" ? "+" : "-"}${Math.abs(tx.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white">Network</h3>
                <FaUserFriends className="text-blue-500 text-lg" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Total Members</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-white">{userData.networkSize}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">Growth Rate</p>
                  <div className="flex items-center">
                    <p className="text-xl font-bold text-green-500">{userData.networkGrowth}%</p>
                    <IoMdTrendingUp className="text-green-500 ml-2" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;

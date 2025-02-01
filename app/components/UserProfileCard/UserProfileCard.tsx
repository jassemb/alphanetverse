"use client"; // This marks the component as a client-side component
import React, { useState } from "react";
import { FaWallet, FaUserFriends, FaCopy, FaCheck, FaRegCopy, FaShareAlt, FaEdit } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import { BsShieldFillCheck } from "react-icons/bs";
import { IoMdTrendingUp } from "react-icons/io";

interface UserProfileCardProps {
  profileData: {
    first_name: string;
    last_name: string;
    avatar: string;
    designation: string;
    referral_code: string;
    walletBalance: number;
    transactions: Array<{
      id: number;
      type: string;
      amount: number;
      date: string;
    }> | null; // Ensure transactions can be null
    subscription_status?: boolean;
    networkSize: number;
    subscription_type: string;
  } | null; // Ensure profileData can be null
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({ profileData }) => {
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };


  // Fallback profileData if it's null
  if (!profileData) {
    return (
      <div className={`p-4 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
        <div className="max-w-md mx-auto">No user data available</div>
      </div>
    );
  }

  return (
    <div className={`p-4 ${isDarkMode ? "dark bg-gray-900" : "bg-gray-100"}`}>
      <div className="max-w-md mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3">
          <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
            <div className="relative">

              {!profileData.avatar && (
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center text-black bg-blue-500 font-bold text-lg border-4 border-blue-500"
                >
                  {profileData.first_name.charAt(0)}
                  {profileData.last_name.charAt(0)}
                </div>
              )}
              {profileData.subscription_status !== undefined && (
                <div className="absolute -top-2 -right-2 p-1.5 rounded-full"
                  style={{ backgroundColor: profileData.subscription_status === true ? 'green' : 'red' }}>
                  <BsShieldFillCheck className={`text-white text-lg`} />
                </div>
              )}
            </div>

            <div className="text-center md:text-left">
              <p className="text-lg font-bold text-gray-800 dark:text-white">
                {profileData.first_name} {profileData.last_name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
              <h3 className="text-base font-semibold mb-3 text-gray-800 dark:text-white">Profile QR</h3>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={profileData.referral_code}
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
                <p
                  className={`text-xl font-bold ${profileData.walletBalance > 1000 ? "text-green-500" : "text-red-500"
                    }`}
                >
                  ${profileData.walletBalance?.toLocaleString() || "0"}
                </p>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate flex-1">
                  {profileData.referral_code}
                </p>
                <button
                  onClick={() => handleCopy(profileData.referral_code)}
                  className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full transition-all"
                >
                  {copied ? <FaCheck className="text-green-500" /> : <FaRegCopy className="text-gray-500" />}
                </button>
              </div>

              <div className="space-y-1.5">
                {profileData.transactions &&
                  Array.isArray(profileData.transactions) &&
                  profileData.transactions.length > 0 ? (
                  profileData.transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between text-xs">
                      <span className="text-gray-600 dark:text-gray-300">{tx.date}</span>
                      <span
                        className={tx.type === "received" ? "text-green-500" : "text-red-500"}
                      >
                        {tx.type === "received" ? "+" : "-"}${Math.abs(tx.amount)}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No transactions available</p>
                )}
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
                  <p className="text-xl font-bold text-gray-800 dark:text-white">
                    {profileData.networkSize}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-300">your pack type</p>
                  <div className="flex items-center">
                    <p className="text-xl font-bold text-green-500">{profileData.subscription_type}</p>
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

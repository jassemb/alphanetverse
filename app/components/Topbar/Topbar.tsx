"use client";
import { useState, useEffect, MouseEvent } from "react";
import Image from "next/image";
import { FiChevronDown, FiLogOut, FiSettings, FiUser } from "react-icons/fi";
import EditProfile from "../Editprofile/Editprofile";

const TopBar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3",
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isDropdownOpen &&
        !(event.target as HTMLElement).closest(".dropdown-container")
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside as unknown as EventListener);
    return () =>
      document.removeEventListener("click", handleClickOutside as unknown as EventListener);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    console.log("Logging out...");
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <header
      className={`fixed top-0 w-full z-50 ${isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
        } shadow-lg transition-colors duration-300`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-4">
            <Image
              src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?ixlib=rb-4.0.3"
              alt="Company Logo"
              className="h-8 w-auto"
              width={32}
              height={32}
              onError={() =>
                (document.querySelector(
                  ".h-8"
                ) as HTMLImageElement).src = "https://via.placeholder.com/32"
              }
            />
            <span className="text-xl font-bold hidden sm:block">Alpha Netverse</span>
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            <div className="relative dropdown-container">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <Image
                  src={userData.avatar}
                  alt="User avatar"
                  className="h-8 w-8 rounded-full object-cover"
                  width={32}
                  height={32}
                  onError={() =>
                    (document.querySelector(
                      ".h-8"
                    ) as HTMLImageElement).src = "https://via.placeholder.com/32"
                  }
                />
                <FiChevronDown
                  className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""
                    }`}
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b dark:border-gray-700">
                    <p className="text-sm font-medium">{userData.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {userData.email}
                    </p>
                  </div>

                  <div className="relative">
                    {/* Button */}
                    <button
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      role="menuitem"
                      onClick={openModal}
                    >
                      <FiUser className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>

                    {isModalOpen && (
                      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[80%] max-w-3xl h-[90vh] flex flex-col">
                          <h2 className="text-lg font-bold mb-4">Settings</h2>

                          {/* Scrollable Content Container */}
                          <div className="flex-grow overflow-y-scroll scrollbar-hidden">
                            <EditProfile />
                          </div>

                          {/* Sticky Footer for Buttons */}
                          <div className="mt-4 flex justify-end gap-4">
                            <button
                              className="px-4 py-2 bg-red text-gray-800 rounded-lg hover:bg-gray-400"
                              onClick={closeModal}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    )}


                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                    role="menuitem"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;

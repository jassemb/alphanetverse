"use client"
import { useEffect, useState } from "react";
import CardList from "../components/Cards/CardList";
import { SidebarMenu } from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import UserProfileCard from "../components/UserProfileCard/UserProfileCard";
import { useRouter } from "next/navigation";

export default function Mainpage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);  // State to store user info
  const [walletInfo, setWalletInfo] = useState<{
    ac_cash: string;
} | null>(null);

  useEffect(() => {
    const fetchWalletInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
          console.error("No token found. User is not authenticated.");
          router.push("/");
          return;
      }

      try {
          const response = await fetch("http://51.77.230.180:8000/api/v1/me/wallet/", {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
              },
          });

          if (response.ok) {
              const data = await response.json();
              setWalletInfo(data);
              console.log("Wallet info:", data);
          } else {
              const errorData = await response.json();
              console.error("Error fetching wallet info:", errorData);
          }
      } catch (error) {
          console.error("An error occurred while fetching wallet info:", error);
      }
  };

    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');  // Get the JWT token from localStorage

      if (!token) {
        console.error("No token found. User is not authenticated.");
        router.push('/');  // Redirect to login or homepage if token is not found
        return;
      }

      try {
        const response = await fetch("http://51.77.230.180:8000/api/v1/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,  // Add the token to the Authorization header
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log("User Info:", data);
          setUserInfo(data);  // Update state with user data
        } else {
          const errorData = await response.json();
          console.error("Error fetching user info:", errorData);
        }
      } catch (error) {
        console.error("An error occurred while fetching user info:", error);
      }
    };

    fetchUserInfo();  // Call fetchUserInfo without needing a userId
    fetchWalletInfo();
  }, []);  // Empty dependency array ensures it runs only once when the component mounts




  const profileData = userInfo
  ? {
      first_name: userInfo.first_name,
      last_name: userInfo.last_name,
      avatar: userInfo.avatar,
      designation: userInfo.designation,
      referral_code: userInfo.referral_code,
      walletBalance: walletInfo ? parseFloat(walletInfo.ac_cash) : 0, // Convert string to number
      transactions: userInfo.transactions || [],
      subscription_status: userInfo.subscription_status,
      networkSize: userInfo.networkSize,
      subscription_type: userInfo.subscription_type,
    }
  : null;

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar userInfo={userInfo} />
      <div className="flex flex-grow mt-20">
        <div className="w-60 bg-gray-200 flex-shrink-0 fixed top-16 bottom-0 left-0">
          <SidebarMenu />
        </div>
        <div className="flex-1 p-4 ml-50 flex justify-center gap-5">
          <div className="flex-1 max-w-xl mx-auto">
            <CardList />
          </div>
          <div className="w-85 max-w-xl fixed top-16 right-0">
          <UserProfileCard profileData={profileData} />
          </div>
        </div>
      </div>
    </div>
  );
}

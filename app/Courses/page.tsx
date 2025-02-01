"use client"
import { useRouter } from "next/navigation";
import { SidebarMenu } from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import UserDashboard from "../components/UserDashbord/UserDashboard";
import { useEffect, useState } from "react";
import CoursesPage from "../components/Courses/Courses";
import ComingSoonPage from "../components/Commingsoon/Commingsoon";


export default function Dashbordpage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);  // State to store user info

  useEffect(() => {
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
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* TopBar */}
      <TopBar userInfo={userInfo} />

      {/* Main Content */}
      <div className="flex flex-grow mt-16">
        {/* SidebarMenu */}
        <div className="w-60 bg-gray-200 flex-shrink-0 h-full fixed top-16 left-0">
          <SidebarMenu />
        </div>

        {/* Main Content - User Dashboard */}
        <div className="flex-grow ml-60 p-4">
          <ComingSoonPage />
        </div>
      </div>
    </div>
  );
}

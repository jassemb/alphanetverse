"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"; // Import useState as well
import CardList from "../components/Cards/CardList";
import { SidebarMenu } from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import UserProfileCard from "../components/UserProfileCard/UserProfileCard";

export default function Mainpage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false); // New state to track redirect

  // If session is loading, you can show a loading spinner or message
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // If no session (user not logged in), redirect to login page after mounting


  return (
    <div className="min-h-screen flex flex-col">
      {/* TopBar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex flex-grow mt-20">
        {/* SidebarMenu */}
        <div className="w-60 bg-gray-200 flex-shrink-0 fixed top-16 bottom-0 left-0">
          <SidebarMenu />
        </div>

        {/* Main Content - Flexbox container */}
        <div className="flex-1 ml-60 p-4 flex justify-center gap-5">
          {/* Card List - Centered */}
          <div className="flex-1 max-w-xl mx-auto">
            <CardList />
          </div>

          {/* UserProfileCard - Fixed on the right */}
          <div className="w-80 max-w-xs fixed top-16 right-4">
            <UserProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
}

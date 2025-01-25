import CardList from "../components/Cards/CardList";
import { SidebarMenu } from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import UserProfileCard from "../components/UserProfileCard/UserProfileCard";

export default function Mainpage() {
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
        <div className="flex-1 p-4 ml-50 flex justify-center gap-5">
          {/* Card List - Centered */}
          <div className="flex-1 max-w-xl mx-auto">
            <CardList />
          </div>

          {/* UserProfileCard - Fixed on the right */}
          <div className="w-85 max-w-xl fixed top-16 right-0">
            <UserProfileCard />
          </div>
        </div>
      </div>
    </div>
  );
}

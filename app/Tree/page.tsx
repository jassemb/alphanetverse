import { SidebarMenu } from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";

import UserMatrixTree from "../components/Usertree/Usertree";

export default function Dashbordpage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* TopBar */}
      <TopBar />

      {/* Main Content */}
      <div className="flex flex-grow mt-16">
        {/* SidebarMenu */}
        <div className="w-60 bg-gray-200 flex-shrink-0 h-full fixed top-16 left-0">
          <SidebarMenu />
        </div>

        {/* Main Content - User Dashboard */}
        <div className="flex-grow ml-60 p-4">
          <UserMatrixTree/>
        </div>
      </div>
    </div>
  );
}
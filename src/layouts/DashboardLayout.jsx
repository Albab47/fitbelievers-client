import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../components/Dashboard/DashboardHeader.jsx/DashboardHeader";

const DashboardLayout = () => {
  
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet - dynamic pages */}
      <div className="bg-gray-100 flex-1">
        <DashboardHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

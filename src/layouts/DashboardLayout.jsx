import { Outlet } from "react-router-dom";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet - dynamic pages */}
      <div className="bg-gray-50 flex-1">Content goes here
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

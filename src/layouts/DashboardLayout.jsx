import Sidebar from "../components/Dashboard/Sidebar/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Outlet - dynamic pages */}
      <div>Content goes here</div>
    </div>
  );
};

export default DashboardLayout;

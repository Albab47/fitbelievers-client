import { Outlet } from "react-router-dom";
import Header from "../components/Shared/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;

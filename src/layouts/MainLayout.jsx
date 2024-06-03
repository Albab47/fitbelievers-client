import { Outlet } from "react-router-dom";
import Header from "../components/Shared/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;

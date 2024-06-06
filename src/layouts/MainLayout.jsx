import { Outlet } from "react-router-dom";
import Header from "../components/Shared/Header/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <div className="pt-16 min-h-[calc(100vh-64px)]">
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;

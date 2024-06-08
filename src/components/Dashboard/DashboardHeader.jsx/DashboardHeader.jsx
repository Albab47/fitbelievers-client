import { FaBars } from "react-icons/fa6";
import useAuth from "../../../hooks/useAuth";
import Logo from "../../Shared/Logo/Logo";
import UserDropdown from "../../Shared/UserDropdown/UserDropdown";
// import SidebarDrawer from "../Sidebar/SidebarDrawer";
// import { useState } from "react";
// import useRole from "../../../hooks/useRole";

const DashboardHeader = () => {
  const {user, logOut} = useAuth()
  
  return (
    <header className="bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 flex md:invisible items-center gap-6">
            <FaBars  size={22} className="text-gray-700" />
            <Logo blackLogo={true} />
          </div>

          <div className="md:flex md:items-center">
            {/* links */}

            <div className="flex items-center gap-4">
              <UserDropdown user={user} logOut={logOut} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

// const {role} = useRole()
// const [isOpen, setIsOpen] = useState(false);
// const handleClose = () => setIsOpen(false);

{/* Drawer
<SidebarDrawer
  isOpen={isOpen}
  handleClose={handleClose}
  user={user}
  role={role}
/> */}
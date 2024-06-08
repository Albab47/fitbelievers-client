import useAuth from "../../../hooks/useAuth";
import UserDropdown from "../../Shared/UserDropdown/UserDropdown";

const DashboardHeader = () => {
  const {user, logOut} = useAuth()
  
  return (
    <header className="bg-white">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex-1 md:flex md:items-center md:gap-12">
            <a className="block text-teal-600" href="#">
              <span className="sr-only">Dashboard home</span>
            </a>
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

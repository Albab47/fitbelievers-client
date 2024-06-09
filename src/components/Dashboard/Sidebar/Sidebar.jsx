import Logo from "../../Shared/Logo/Logo";
import { RxDashboard } from "react-icons/rx";
import AdminMenu from "../Menu/AdminMenu";
import MenuItem from "../Menu/MenuItem";
import { FaRegEdit } from "react-icons/fa";
import TrainerMenu from "../Menu/TrainerMenu";
import MemberMenu from "../Menu/MemberMenu";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { createContext, useState } from "react";
import { Link } from "react-router-dom";
import useRole from "../../../hooks/useRole";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import useAuth from "../../../hooks/useAuth.js";

export const SidebarContext = createContext();

const Sidebar = () => {
  const [expended, setExpended] = useState(true);
  const { role, isLoading } = useRole();
  const { user, loading } = useAuth();

  return (
    <aside
      className={`bg-gray-900 relative flex flex-col h-screen px-4 py-8 shadow-2xl border-r dark:bg-gray-900 dark:border-gray-700`}
    >
      <Logo expended={expended} blackLogo={false} />

      {/* sidebar toggle */}
      <button
        onClick={() => setExpended(!expended)}
        className="absolute -right-3 top-9 text-md bg-primary rounded-full text-gray-900 p-1"
      >
        {expended ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {isLoading || loading ? (
        <SecondaryLoader />
      ) : (
        <div className="flex flex-col justify-between flex-1 mt-6">
          <SidebarContext.Provider value={{ expended }}>
            <nav>
              <MenuItem
                label="Dashboard"
                address="/dashboard"
                icon={RxDashboard}
              />

              {role === "admin" && <AdminMenu />}
              {role === "trainer" && <TrainerMenu />}
              {role === "member" && <MemberMenu />}

              {(role === "admin" || role === "trainer") && (
                <MenuItem
                  address="/dashboard/add-blog"
                  label="Add New Blog"
                  icon={FaRegEdit}
                />
              )}

              <hr className="my-6 border-gray-700 dark:border-gray-600" />
            </nav>

            {/* sidebar foot */}
            <Link className="flex p-2">
              <img
                className="object-cover rounded-full size-8"
                src={user?.photoURL}
                alt="avatar"
              />
              <span
                className={`font-medium text-gray-300 transition-all overflow-hidden ${
                  expended ? "w-36 mx-2" : "w-0"
                }`}
              >
                {user?.displayName}
              </span>
            </Link>
          </SidebarContext.Provider>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

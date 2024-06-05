import { NavLink } from "react-router-dom";
import Logo from "../../Shared/Logo/Logo";
import { RxDashboard } from "react-icons/rx";
import AdminMenu from "../Menu/AdminMenu";
import MenuItem from "../Menu/MenuItem";

const Sidebar = () => {
  return (
    <aside className="bg-gray-900 flex flex-col w-72 h-screen px-4 py-8 overflow-y-auto  border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <Logo />

      <div className="flex flex-col justify-between flex-1 mt-6">
        <nav>
          <MenuItem label="Dashboard" address="/dashboard" icon={RxDashboard} />

          <AdminMenu />

          <hr className="my-6 border-gray-700 dark:border-gray-600" />

        </nav>

        {/* sidebar foot */}
        <a href="#" className="flex items-center px-4 -mx-2">
          <img
            className="object-cover mx-2 rounded-full h-9 w-9"
            src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            alt="avatar"
          />
          <span className="mx-2 font-medium text-gray-300">
            John Doe
          </span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;

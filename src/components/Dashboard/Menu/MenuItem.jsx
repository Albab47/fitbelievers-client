import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { SidebarContext } from "../Sidebar/Sidebar";

const MenuItem = ({ label, address, icon: Icon }) => {
  const { expended } = useContext(SidebarContext);

  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `relative flex items-center cursor-pointer px-4 py-2 mt-5 ${
          isActive ? "text-primary bg-primary/10" : "text-gray-300"
        } group transition-colors duration-300 transform rounded-md hover:bg-primary/10 hover:text-primary`
      }
    >
      <Icon className="size-5" />
      <span
        className={`font-medium overflow-hidden transition-all ${
          expended ? "w-44 mx-4" : "w-0"
        }`}
      >
        {label}
      </span>

      {!expended && (
        <p className="absolute w-auto left-full ml-6 px-4 py-1 font-medium bg-primary/20 text-lime-600 text-sm opacity-20 -translate-x-3 invisible transition-all rounded-lg group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
          {label}
        </p>
      )}
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.func,
};

export default MenuItem;

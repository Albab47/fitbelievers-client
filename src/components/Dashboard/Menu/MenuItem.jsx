import { NavLink } from "react-router-dom";

// "flex items-center px-4 py-2 mt-5 text-gray-600 transition-colors duration-300 transform rounded-md dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      className={({ isActive }) =>
        `flex items-center px-4 py-2 mt-5 ${
          isActive ? "text-primary bg-primary/10" : "text-gray-300"
        } transition-colors duration-300 transform rounded-md hover:bg-primary/10 hover:text-primary`
      }
    >
      <Icon />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

import PropTypes from "prop-types";

MenuItem.propTypes = {
  label: PropTypes.string,
  address: PropTypes.string,
  icon: PropTypes.func,
};

export default MenuItem;

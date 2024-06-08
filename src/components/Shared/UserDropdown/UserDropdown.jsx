import PropTypes from "prop-types"; 
import {
    Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { IoSettingsOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { TbLogout2 } from "react-icons/tb";
import { Link } from "react-router-dom";

const UserDropdown = ({ user, logOut }) => {
  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={<Avatar alt="User menu" img={user?.photoURL} rounded />}
    >
      <DropdownHeader>
        <span className="block text-sm">{user?.displayName}</span>
        <span className="block truncate text-sm font-medium">
          {user?.email}
        </span>
      </DropdownHeader>
      <Link to={`/dashboard`}>
        <DropdownItem icon={RxDashboard}>Dashboard</DropdownItem>
      </Link>
      <DropdownItem icon={IoSettingsOutline}>Profile</DropdownItem>
      <DropdownDivider />
      <DropdownItem onClick={logOut} icon={TbLogout2}>
        Logout
      </DropdownItem>
    </Dropdown>
  );
};


UserDropdown.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func,
};

export default UserDropdown;

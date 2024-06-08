import { Link, NavLink } from "react-router-dom";
import logo from "../../../assets/logo.png";
import { IoLogInOutline } from "react-icons/io5";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { useState } from "react";
import NavbarDrawer from "../../Drawer/NavbarDrawer";
import useAuth from "../../../hooks/useAuth";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa6";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline } from "react-icons/io5";
import UserDropdown from "../UserDropdown/UserDropdown";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useAuth();

  const handleClose = () => setIsOpen(false);

  const navLinkStyle = ({ isActive }) =>
    `${
      isActive
        ? "text-primary border-b-2 pb-2 border-lime-400"
        : "text-gray-500"
    } text-xl transition hover:text-gray-500/75`;

  const navLinks = (
    <>
      <li>
        <NavLink className={navLinkStyle} to="/">
          Home
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkStyle} to="/classes">
          Classes
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkStyle} to="/trainers" end>
          Trainers
        </NavLink>
      </li>

      <li>
        <NavLink className={navLinkStyle} to="community">
          Community
        </NavLink>
      </li>
    </>
  );

  return (
    <header className="bg-black/85 backdrop-blur-md shadow-md w-full fixed top-0 left-0 right-0 z-50">
      <nav className="flex h-16 container 2xl:px-32 items-center gap-16 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex text-teal-600" href="#">
          <img
            src={logo}
            className="mr-2 h-7 sm:h-8"
            alt="Flowbite React Logo"
          />
          <span className="self-center text-white/90 font-display whitespace-nowrap text-3xl dark:text-white">
            Fit<span className="text-lime-400">Believers</span>
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-8 font-display text-xl">
              {navLinks}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div>
              {user ? (
                <UserDropdown user={user} logOut={logOut} />
              ) : (
                <Link
                  className="flex items-center rounded-full bg-primary text-dark px-5 py-2 text-sm font-semibold transition hover:scale-105 hover:shadow-xl focus:outline-none focus:ring active:bg-lime-500"
                  to="/login"
                >
                  <IoLogInOutline className="mr-2 size-5" />
                  Login
                </Link>
              )}
            </div>

            {/* menu drawer btn */}
            <button
              onClick={() => setIsOpen(true)}
              className="block rounded bg-gray-100 hover:bg-opacity-85 p-2 text-gray-600 transition hover:text-gray-600/75 md:hidden"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Drawer */}
      <NavbarDrawer
        isOpen={isOpen}
        handleClose={handleClose}
        navLinks={navLinks}
      />
    </header>
  );
};

export default Header;

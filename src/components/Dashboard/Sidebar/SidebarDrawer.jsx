"use client";
import { Drawer, Sidebar } from "flowbite-react";
import PropTypes from "prop-types";
import MenuItem from "../Menu/MenuItem";
import { RxDashboard } from "react-icons/rx";
import AdminMenu from "../Menu/AdminMenu";
import TrainerMenu from "../Menu/TrainerMenu";
import MemberMenu from "../Menu/MemberMenu";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const SidebarDrawer = ({ isOpen, handleClose, user, role }) => {
    
  return (
    <Drawer open={isOpen} onClose={handleClose}>
      <Drawer.Header title="MENU" titleIcon={() => <></>} />
      <Drawer.Items>
        <Sidebar
          aria-label="Sidebar with multi-level dropdown example"
          className="[&>div]:bg-transparent [&>div]:p-2"
        >
          <div className="flex h-full flex-col justify-between py-2">
            <div>
              <Sidebar.Items>
                <Sidebar.ItemGroup className="font-display text-2xl space-y-4">
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
                      className={`font-medium text-gray-300 transition-all overflow-hidden w-36 mx-2`}
                    >
                      {user?.displayName}
                    </span>
                  </Link>
                </Sidebar.ItemGroup>

                {/* <Sidebar.ItemGroup>
                  <Sidebar.Item
                    href="https://github.com/themesberg/flowbite-react/"
                    icon={HiClipboard}
                  >
                    Docs
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="https://flowbite-react.com/"
                    icon={HiCollection}
                  >
                    Components
                  </Sidebar.Item>
                  <Sidebar.Item
                    href="https://github.com/themesberg/flowbite-react/issues"
                    icon={HiInformationCircle}
                  >
                    Help
                  </Sidebar.Item>
                </Sidebar.ItemGroup> */}
              </Sidebar.Items>
            </div>
          </div>
        </Sidebar>
      </Drawer.Items>
    </Drawer>
  );
};

SidebarDrawer.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  user: PropTypes.object,
  role: PropTypes.string,
};

export default SidebarDrawer;

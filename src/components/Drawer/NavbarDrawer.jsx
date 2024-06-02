"use client";
import { Drawer, Sidebar } from "flowbite-react";

const NavbarDrawer = ({isOpen, handleClose, navLinks}) => {
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
                  {navLinks}
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

import PropTypes from "prop-types"; 
 
NavbarDrawer.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  navLinks: PropTypes.node,
};

export default NavbarDrawer;

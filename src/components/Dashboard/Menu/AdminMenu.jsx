import MenuItem from "./MenuItem";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { FaUsersGear } from "react-icons/fa6";
import { MdAttachMoney } from "react-icons/md";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdPeopleAlt } from "react-icons/md";

const AdminMenu = () => {
  return (
    <>
      <MenuItem
        address="/dashboard/balance"
        label="Balance"
        icon={MdAttachMoney}
      />
      <MenuItem
        address="/dashboard/add-class"
        label="New Class"
        icon={FaRegSquarePlus}
      />
      <MenuItem
        address="/dashboard/all-trainers"
        label="All Trainers"
        icon={FaUsersGear}
      />
      <MenuItem
        address="/dashboard/applied-trainers"
        label="Applied Trainers"
        icon={MdPeopleAlt}
      />
      <MenuItem
        address="/dashboard/subscribers"
        label="Newsletter Subscribers"
        icon={MdOutlineMarkEmailRead}
      />
    </>
  );
};

export default AdminMenu;

import { MdEventAvailable, MdPerson } from "react-icons/md";
import MenuItem from "./MenuItem";
import { FaHistory } from "react-icons/fa";

const MemberMenu = () => {
  return (
    <>
      <MenuItem
        address="/dashboard/activity-log"
        label="Activity Log"
        icon={FaHistory}
      />
      <MenuItem address="/dashboard/profile" label="Profile" icon={MdPerson} />
      <MenuItem
        address="/dashboard/booked-trainer"
        label="Booked Trainer"
        icon={MdEventAvailable}
      />
    </>
  );
};

export default MemberMenu;

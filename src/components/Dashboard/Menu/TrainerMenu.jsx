import MenuItem from "./MenuItem";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TbClockPlus } from "react-icons/tb";

const TrainerMenu = () => {
  return (
    <>
      <MenuItem
        address="/dashboard/manage-slots"
        label="Manage Slots"
        icon={FaRegCalendarAlt}
      />
      <MenuItem
        address="/dashboard/add-slot"
        label="Add Slot"
        icon={TbClockPlus}
      />
    </>
  );
};

export default TrainerMenu;

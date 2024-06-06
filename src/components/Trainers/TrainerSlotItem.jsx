import PropTypes from "prop-types";

const TrainerSlotItem = ({ data }) => {
  return (
    <li className="text-sm space-x-2 text-gray-600">
      <span>{data.day.slice(0, 3)}:</span>
      <span className="lowercase">{data.slots.map((slot) => slot.time + " ")}</span>
    </li>
  );
};

TrainerSlotItem.propTypes = {
  data: PropTypes.object,
};

export default TrainerSlotItem;

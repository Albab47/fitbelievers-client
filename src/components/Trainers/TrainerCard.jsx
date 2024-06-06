import PropTypes from "prop-types"; 
import { Badge } from "flowbite-react";

const TrainerCard = ({ trainer }) => {
  const { name, photo, background, specializations } = trainer;

  return (
    <div className="flex flex-col rounded-xl p-5 shadow-sm border shadow-gray-100">
      <div className="relative flex justify-center ">
        <img
          alt=""
          src={photo}
          className="h-56 w-full rounded-lg object-top object-cover"
        />
      </div>

      <div className="mt-4 space-y-2 flex-grow">
        <h3 className="font-display text-2xl tracking-wide text-dark">
          {name}
        </h3>
        <p className="text-pretty text-sm text-gray-500">{background}</p>{" "}
      </div>

      <div className="space-y-2 mt-4">
        <h4 className="font-bold">Expertise in:</h4>
        <p className="flex flex-wrap gap-2">
          {specializations?.map((item, idx) => (
            <Badge key={idx} color="lime" size="sm">
              {item}
            </Badge>
          ))}
        </p>
      </div>
    </div>
  );
};


TrainerCard.propTypes = {
  trainer: PropTypes.object,
};

export default TrainerCard;

import PropTypes from "prop-types";
import { Badge } from "flowbite-react";
import { Link } from "react-router-dom";
import TrainerSlotItem from "./TrainerSlotItem";

const TrainerCard = ({ trainer = {}, isHome = false }) => {
  const {
    _id,
    name,
    photo,
    background,
    experience,
    availableSlots,
    specializations,
  } = trainer;

  console.log(availableSlots);

  return (
    <Link
      to={`/trainers/${_id}`}
      className="flex flex-col rounded-xl p-5 shadow-sm border border-primary/30 hover:scale-105 hover:border-primary hover:shadow-lime-100 transition-all duration-300"
    >
      <div className="relative flex justify-center ">
        <img
          alt="trainer image"
          src={photo}
          className="h-56 w-full rounded-lg object-top object-cover"
        />
      </div>

      <div className="mt-4 space-y-2 flex-grow">
        <h3 className="font-display text-2xl tracking-wide text-dark">
          {name}
        </h3>
        {isHome ? (
          <p className="text-pretty text-sm text-gray-500">{background}</p>
        ) : (
          <p className="text-sm">Experience: {experience} years</p>
        )}
      </div>

      {/* Available slots */}
      <div className="my-4">
        <h4 className="font-semibold">Available slots:</h4>
        <ul className="list-inside list-disc pl-2">
          {availableSlots?.map((item, i) => (
            // <li key={i}>{item.day.slice(0, 3)}</li>
            <TrainerSlotItem key={i} data={item} />
          ))}
        </ul>
      </div>


      <div className="space-y-2 mt-4">
        <h4 className="font-semibold">Expertise in:</h4>
        <p className="flex flex-wrap gap-2">
          {specializations?.map((item, idx) => (
            <Badge key={idx} color="lime">
              {item}
            </Badge>
          ))}
        </p>
      </div>
    </Link>
  );
};

TrainerCard.propTypes = {
  trainer: PropTypes.object,
  isHome: PropTypes.bool,
};

export default TrainerCard;

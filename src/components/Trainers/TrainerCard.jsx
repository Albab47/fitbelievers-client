import PropTypes from "prop-types";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";

const TrainerCard = ({ trainer = {}, isHome = false }) => {
  const {
    _id,
    name,
    photo,
    expertise,
    background,
    experience,
    availableSlots,
    skills,
  } = trainer;

  return (
    <div
      to={`/trainers/${_id}`}
      className="flex flex-col rounded-xl p-5 shadow-sm border border-primary/30 hover:shadow-lime-100 transition-all ease-in-out duration-300"
    >
      <div className="relative flex justify-center ">
        <img
          alt="trainer image"
          src={photo}
          className="h-56 w-full rounded-lg object-top object-cover"
        />
      </div>

      <div className="mt-4 space-y-2 flex-grow">
        <div className="text-center">
          <h3 className="font-display text-2xl tracking-wide text-dark">
            {name}
          </h3>
          <p className="text-sm">{expertise}</p>
        </div>
        {isHome ? (
          <p className="text-pretty text-sm text-gray-500">{background}</p>
        ) : (
          <p className="text-sm">Experience: {experience}</p>
        )}
      </div>

      {/* Available slots */}
      {availableSlots && (
        <div className="my-4">
          <h4 className="font-semibold mb-1.5">Available slots:</h4>
          <ul className="list-inside list-disc pl-2 text-gray-600">
            {/* slots list */}
            {availableSlots.map((slot, i) => (
              <li key={i} className="mb-1">
                {slot.slotName}: {slot.slotTime}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* <div className="space-y-2 mt-4">
        <h4 className="font-semibold">skill in:</h4>
        <p className="flex flex-wrap gap-2">
          {skills?.map((item, idx) => (
            <Badge key={idx} color="lime">
              {item}
            </Badge>
          ))}
        </p>
      </div> */}

      {!isHome && (
        <Link to={`/trainers/${_id}`} className="mt-6">
          <Button
            gradientMonochrome="lime"
            fullSized
            className="shrink-0 rounded-xl"
          >
            Know more
          </Button>
        </Link>
      )}
    </div>
  );
};

TrainerCard.propTypes = {
  trainer: PropTypes.object,
  isHome: PropTypes.bool,
};

export default TrainerCard;

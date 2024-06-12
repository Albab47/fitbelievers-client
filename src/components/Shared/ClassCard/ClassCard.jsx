import PropTypes from "prop-types";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaCrown } from "react-icons/fa";
import { Avatar, Badge } from "flowbite-react";
import { Link } from "react-router-dom";

const ClassCard = ({ classData }) => {
  const { image, name, description, trainers, numberOfBookings } = classData;

  return (
    <div className="block rounded-xl p-5 shadow-sm border shadow-gray-100">
      <div className="relative">
        <img
          alt=""
          src={image}
          className="h-56 w-full rounded-lg object-cover"
        />
      </div>

      <p className="w-max mt-4 -ml-1">
        <Badge color="lime" icon={HiOutlineUsers}>
          Bookings: {numberOfBookings}
        </Badge>
      </p>

      <div className="mt-2 space-y-2">
        <h3 className="font-display text-2xl tracking-wide text-dark">
          {name}
        </h3>
        <p className="text-light">{description}</p>
      </div>

      {trainers && (
        <>
          <h1 className="my-3 font-medium">Trainer who took this class:</h1>
          <div className="flex flex-wrap gap-2">
            {trainers.map((trainer, idx) => (
              <Link to={`/trainers/${trainer.id}`} key={idx}>
                <Avatar
                img={trainer.photo}
                size="sm"
                rounded
                bordered
              />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

ClassCard.propTypes = {
  classData: PropTypes.object,
};

export default ClassCard;

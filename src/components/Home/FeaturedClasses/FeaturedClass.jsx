import PropTypes from "prop-types";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaCrown } from "react-icons/fa";
import { Badge } from "flowbite-react";

const FeaturedClass = ({ classData }) => {
  const { image, name, description, numberOfBookings } = classData;

  return (
    <div className="block rounded-xl p-5 shadow-sm border shadow-gray-100">
      <div className="relative">
        <img
          alt=""
          src={image}
          className="h-56 w-full rounded-lg object-cover"
        />
        <span className="absolute top-4 right-4 text-amber-400 text-xl backdrop-blur-md bg-white/20 p-1 rounded-full">
          <FaCrown />
        </span>
      </div>

      <p className="w-max mt-4 -ml-1">
        <Badge color="lime" icon={HiOutlineUsers}>Bookings: {numberOfBookings}</Badge>
      </p>

      <div className="mt-2 space-y-2">
        <h3 className="font-display text-2xl tracking-wide text-dark">
          {name}
        </h3>

        <p className="text-light">{description}</p>

        {/* <div className="mt-6 flex items-center gap-8 text-xs">
          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Parking</p>

              <p className="font-medium">2 spaces</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Bathroom</p>

              <p className="font-medium">2 rooms</p>
            </div>
          </div>

          <div className="sm:inline-flex sm:shrink-0 sm:items-center sm:gap-2">
            <svg
              className="size-4 text-indigo-700"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
              />
            </svg>

            <div className="mt-1.5 sm:mt-0">
              <p className="text-gray-500">Bedroom</p>

              <p className="font-medium">4 rooms</p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

FeaturedClass.propTypes = {
  classData: PropTypes.object,
};

export default FeaturedClass;

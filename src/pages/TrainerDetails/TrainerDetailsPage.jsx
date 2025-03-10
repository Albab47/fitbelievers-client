import { Link, useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import { Badge, Button } from "flowbite-react";
import BeATrainer from "../../components/TrainerDetails/BeATrainer";
import { FaRegClock } from "react-icons/fa6";
import { LuCalendarDays } from "react-icons/lu";
import { IoIosFitness } from "react-icons/io";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";

const TrainerDetailsPage = () => {
  const { id } = useParams();
  const axiosCommon = useAxiosCommon();

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainer", id],
    queryFn: async () => {
      const { data } = await axiosCommon(`/trainers/${id}`);
      return data;
    },
  });
  const {
    name,
    photo,
    background,
    expertise,
    qualifications,
    availableSlots,
    experience,
  } = trainer;

  if (isLoading) return <SecondaryLoader />;

  return (
    <section className="bg-gray-50 py-16">
      <HelmetTitle title={`FitBelievers | Trainer ${name}`} />

      <div className="container 2xl:px-36">
        {/* trainer info */}
        <section className="max-w-6xl mb-8 bg-white shadow-sm mx-auto p-6 sm:p-8 rounded-xl dark:bg-gray-800">
          <div className="flex flex-col gap-6 md:gap-10 md:flex-row">
            {/* image */}
            <div className="md:flex-1">
              <div className="h-[460px] rounded-xl bg-gray-300 dark:bg-gray-700">
                <img
                  className="w-full h-full rounded-lg object-cover"
                  src={photo}
                  alt="Product Image"
                />
              </div>
            </div>

            {/* content */}
            <div className="md:flex-1">
              <h2 className="text-3xl font-display text-dark dark:text-white mb-2">
                {name}
              </h2>
              <p className="text-sm text-gray-600">{expertise} trainer</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm my-4">
                {background}
              </p>
              <div className="flex mb-4">
                <div className="mr-4">
                  <span className="font-bold text-gray-700 dark:text-gray-300">
                    Experience:
                  </span>
                  <span className="text-gray-600 text-sm dark:text-gray-300">
                    {" "}
                    {experience} years
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Qualification:
                </span>
                <ul className="list-disc list-inside pl-2">
                  {qualifications.split(",").map((item, i) => (
                    <li key={i} className="pt-1">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* available slots */}
        <section className="max-w-6xl my-8 shadow-sm mx-auto p-5 sm:p-6 rounded-xl bg-white dark:bg-gray-800">
          <h1 className="text-3xl mb-6 font-display text-center">
            Available Slots
          </h1>

          {availableSlots ? (
            <ul className="space-y-3">
              {availableSlots.map((slot, i) => (
                <li key={i} className="">
                  <Link to={`/trainer-booking/${slot.slotId}`}>
                    <Button className="text-left" color="lime" fullSized>
                      {slot.slotName}:{" "}
                      <FaRegClock className="mt-0.5 ml-4 mr-2 size-4" />{" "}
                      {slot.slotTime}.{" "}
                      <LuCalendarDays className="mt-0.5 ml-4 mr-2 size-4" />{" "}
                      {slot.slotDays.map((d) => d + ", ")}.{" "}
                      <IoIosFitness className="mt-0.5 ml-4 mr-2 size-5" />{" "}
                      {slot.classesIncludes.map((c) => c + ", ")}.{" "}
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center py-6">No Slot Available</p>
          )}
        </section>

        {/* Be a trainer CTA */}
        <BeATrainer />
      </div>
    </section>
  );
};

export default TrainerDetailsPage;

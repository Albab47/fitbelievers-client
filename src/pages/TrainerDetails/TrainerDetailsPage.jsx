import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import { Badge, Button } from "flowbite-react";

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
    specializations,
    qualifications,
    availableSlots,
    experience,
  } = trainer;

  console.log(trainer);

  if (isLoading) return <SecondaryLoader />;

  return (
    <section className="bg-gray-50 py-16">
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
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
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
                  Expertise:
                </span>
                <div className="flex flex-wrap gap-3 items-center mt-2">
                  {specializations.map((item, i) => (
                    <Badge
                      key={i}
                      className="rounded-full"
                      color="lime"
                      size="sm"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  Qualification:
                </span>
                <ul className="list-disc list-inside pl-2">
                  {qualifications.map((item, i) => (
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
          <h1 className="text-3xl mb-6 font-display text-center">Available Slots</h1>

          <ul>
            {availableSlots.map((item, i) => (
              <li key={i} className="flex items-center gap-6 mb-4">
                <span className="font-semibold w-20">{item.day}:</span>
                <div className="flex flex-wrap gap-3">
                  {item.slots.map((slot) => (
                    <button
                      key={slot}
                      className="grid rounded-lg transition-colors py-1.5 px-4 bg-primary/30 hover:bg-primary/40 text-dark "
                    >
                      <span className="font-medium text-lime-600">
                        {slot.name}
                      </span>
                      <span className="text-sm">{slot.time}</span>
                    </button>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
};

export default TrainerDetailsPage;

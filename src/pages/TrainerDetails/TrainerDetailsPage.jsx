import { useParams } from "react-router-dom";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import { Badge } from "flowbite-react";

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
  const { name, photo, background, specializations } = trainer;

  console.log(trainer);

  if (isLoading) return <SecondaryLoader />;

  return (
    <div>
      <section className="flex gap-5 rounded-xl p-5 bg-gray-50">
        <div className="relative flex justify-center ">
          <img
            alt="trainer image"
            src={photo}
            className="h-56 w-full rounded-lg object-top object-cover"
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-display text-2xl tracking-wide text-dark">
            {name}
          </h3>
          <p className="text-pretty text-sm text-gray-500">{background}</p>{" "}
        </div>

        <div className="space-y-2 mt-4">
          <h4 className="font-bold">Expertise in:</h4>
          <p className="flex flex-wrap gap-2">
            {specializations?.map((item, idx) => (
              <Badge key={idx} color="lime">
                {item}
              </Badge>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
};

export default TrainerDetailsPage;

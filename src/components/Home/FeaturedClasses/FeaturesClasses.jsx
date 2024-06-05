import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import { RingLoader } from "react-spinners";
import FeaturedClass from "./FeaturedClass";

const FeaturesClasses = () => {
  const axiosCommon = useAxiosCommon();

  const { data, isLoading } = useQuery({
    queryKey: ["top-classes"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/top-classes`);
      return data;
    },
  });

  console.log(data);

  if (isLoading) return <RingLoader />;

  return (
    <section className="bg-white dark:bg-gray-900 my-28">
      <div className="container 2xl:px-36">
        <SectionTitle heading="Our Popular Classes" subHeading="most booked" />

        {/* grid container */}
        <div className="py-8 md:py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((classData) => (
            <FeaturedClass key={classData._id} classData={classData} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesClasses;

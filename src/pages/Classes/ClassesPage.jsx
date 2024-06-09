import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import useAxiosCommon from "../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import FeaturedClass from "../../components/Home/FeaturedClasses/FeaturedClass";

const ClassesPage = () => {
  const axiosCommon = useAxiosCommon();
  const { data: classes, isLoading } = useQuery({
    queryKey: ["top-classes"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/classes`);
      return data;
    },
  });

  return (
    <div>
      <PageHeader heading="All Classes" />

      <div className="container 2xl:px-36 my-12">
        {/* grid container */}
        <div className="py-8 md:py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes?.map((classData) => (
            <FeaturedClass key={classData._id} classData={classData} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;

import { useQuery } from "@tanstack/react-query";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import AppliedTrainerTable from "../../../components/Dashboard/Tables/AppliedTrainerTable";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";

const AppliedTrainers = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["appliedTrainers"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/applied-trainers`);
      return data;
    },
  });

  if(isLoading) return <SecondaryLoader />

  return (
    <div className="container px-4">
      <PageTitle title={"Applied trainers list"} />

      {/* data table */}
      <AppliedTrainerTable trainers={data} />
    </div>
  );
};

export default AppliedTrainers;

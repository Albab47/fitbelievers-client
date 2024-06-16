import { useState } from "react";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import AllTrainersTable from "../../../components/Dashboard/Tables/AllTrainersTable";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import HelmetTitle from "../../../components/Shared/HelmetTitle/HelmetTitle";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";

const AllTrainers = () => {
  // const { trainers, isLoading, refetch } = useTrainers();
  const axiosSecure = useAxiosSecure();
  const axiosCommon = useAxiosCommon();
  const [loading, setLoading] = useState(false);

  const { data: trainers, isLoading } = useQuery({
    queryKey: ["trainers"],
    queryFn: async () => {
      const { data } = await axiosCommon(`/trainers`);
      return data;
    },
  });

  const handleDeleteTrainer = async (id) => {
    console.log(id);
    setLoading(true);

    try {
      const { data } = await axiosSecure.delete(`/trainers/${id}`);
      console.log(data);
      if (data.deletedCount > 0) {
        toast.success("Trainer Deleted Successfully");
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) return <SecondaryLoader />;

  return (
    <div className="container px-4">
      <HelmetTitle title="Dashboard | Trainers" />
      <PageTitle title={"All trainers list"} />

      {/* data table */}
      <AllTrainersTable
        trainers={trainers}
        handleDeleteTrainer={handleDeleteTrainer}
        loading={loading}
      />
    </div>
  );
};

export default AllTrainers;

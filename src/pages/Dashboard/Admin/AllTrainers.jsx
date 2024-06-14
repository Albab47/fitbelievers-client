import { useState } from "react";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import AllTrainersTable from "../../../components/Dashboard/Tables/AllTrainersTable";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useTrainers from "../../../hooks/useTrainers";
import toast from "react-hot-toast";
import HelmetTitle from "../../../components/Shared/HelmetTitle/HelmetTitle";

const AllTrainers = () => {
  const { trainers, isLoading, refetch } = useTrainers();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

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
        refetch={refetch}
        loading={loading}
      />
    </div>
  );
};

export default AllTrainers;

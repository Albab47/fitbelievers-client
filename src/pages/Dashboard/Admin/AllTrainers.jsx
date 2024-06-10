import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import AllTrainersTable from "../../../components/Dashboard/Tables/AllTrainersTable";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import useTrainers from "../../../hooks/useTrainers";

const AllTrainers = () => {
  const {trainers, isLoading, refetch} = useTrainers()

  if(isLoading) return <SecondaryLoader />

  return (
    <div className="container px-4">
      <PageTitle title={"All trainers list"} />

      {/* data table */}
      <AllTrainersTable trainers={trainers} refetch={refetch} />
    </div>
  );
};

export default AllTrainers;
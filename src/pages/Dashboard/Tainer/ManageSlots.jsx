import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import SlotsTable from "../../../components/Dashboard/Tables/SlotsTable";

const ManageSlots = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["slots"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/slots/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <SecondaryLoader />;

  return (
    <div className="container px-4">
      <PageTitle title={"Your Slot List"} />

      {/* data table */}
      <SlotsTable slots={data} refetch={refetch} />
    </div>
  );
};

export default ManageSlots;

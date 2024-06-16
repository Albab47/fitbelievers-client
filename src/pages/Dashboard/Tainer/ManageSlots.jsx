import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import SlotsTable from "../../../components/Dashboard/Tables/SlotsTable";
import HelmetTitle from "../../../components/Shared/HelmetTitle/HelmetTitle";
import { useState } from "react";
import Swal from "sweetalert2";
import toast from "react-hot-toast";

const ManageSlots = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["slots"],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/slots/${user?.email}`);
      return data;
    },
  });

  const handleDeleteSlot = async (id) => {
    // Confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      setLoading(true);
      try {
        const { data } = await axiosSecure.delete(`/slots/${id}`);
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
          refetch();
        }
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log(data);

  if (isLoading) return <SecondaryLoader />;

  return (
    <div className="container px-4">
      <HelmetTitle title="Dashboard | Manage Slots" />
      <PageTitle title={"Your Slot List"} />

      {/* data table */}
      <SlotsTable slots={data} refetch={refetch} handleDeleteSlot={handleDeleteSlot} loading={loading} />
    </div>
  );
};

export default ManageSlots;

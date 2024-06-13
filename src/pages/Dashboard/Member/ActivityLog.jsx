import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import ActivityLogTable from "../../../components/Dashboard/Tables/ActivityLogTable";
import MainModal from "../../../components/Modal/MainModal";
import { useState } from "react";

const ActivityLog = () => {
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const [modalUser, setModalUser] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["activityLogData"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/users`);
      return data;
    },
  });

  console.log(data);

  const handleShow = (email) => {
    console.log(email);
    const user = data.find((user) => user.email === email);
    setModalUser(user);
    setOpenModal(true);
  };

  console.log(modalUser);

  if (isLoading) return <SecondaryLoader />;

  return (
    <div className="container px-4">
      <PageTitle title={"Activity of Users"} />

      {/* data table */}
      <ActivityLogTable handleShow={handleShow} users={data} />

      {/* message modal */}
      <MainModal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="flex flex-col items-center gap-4 justify-center">
          {modalUser.rejectionMsg ? (
            <>
              <h1 className="text-lg font-semibold">Rejection Message: </h1>
              <p className="text-gray-600">{modalUser.rejectionMsg}</p>
            </>
          ) : (
            <p>Users Request is in pending</p>
          )}
        </div>
      </MainModal>
    </div>
  );
};

export default ActivityLog;

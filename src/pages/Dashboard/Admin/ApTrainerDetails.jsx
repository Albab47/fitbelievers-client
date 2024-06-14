import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import { Badge } from "flowbite-react";
import toast from "react-hot-toast";
import { useState } from "react";
import MainModal from "../../../components/Modal/MainModal";
import ErrorMsg from "../../../components/Shared/ErrorMsg/ErrorMsg";
import { useForm } from "react-hook-form";
import HelmetTitle from "../../../components/Shared/HelmetTitle/HelmetTitle";

const ApTrainerDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["appliedTrainer", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/applied-trainers/${id}`);
      return data;
    },
  });

  const {
    name,
    email,
    photo,
    expertise,
    experience,
    age,
    skills,
    availableTime,
    availableDays,
    qualifications,
    background,
  } = trainer;

  const handleAccept = async () => {
    console.log(trainer._id);
    delete trainer._id;

    try {
      const { data } = await axiosSecure.post("/trainers", trainer);
      console.log(data);
      toast.success("Trainer Accepted Successfully");
      navigate("/dashboard/all-trainers");
    } catch (err) {
      console.log(err);
    }
  };

  const onReject = async (rejectionData) => {
    rejectionData.status = "rejected";
    console.log(rejectionData);

    try {
      const { data } = await axiosSecure.patch(
        `/users/${email}`,
        rejectionData
      );

      if (data.modifiedCount > 0) {
        await axiosSecure.delete(`/applied-trainers/${trainer._id}`);
        toast.success("Trainer Rejected Successfully");
        navigate("/dashboard/applied-trainers");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <SecondaryLoader />;

  return (
    <section className="container px-4">
      <HelmetTitle title="Dashboard | Applied trainer details" />
      
      <div className="relative block overflow-hidden max-w-5xl my-16 mx-auto px-6 rounded-lg border bg-white p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:flex-row-reverse sm:justify-between sm:gap-4">
          <div className="sm:shrink-0 flex justify-center mb-6 sm:mb-0">
            <img
              alt=""
              src={photo}
              className="size-52 md:size-64 rounded-lg object-cover shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <span className="text-dark font-semibold text-md">
              Personal info:
            </span>
            <h3 className="text-md text-light">Name: {name}</h3>

            <p className="mt-1 text-md text-light">Expertise in: {expertise}</p>
            <p className="mt-1 text-md text-light">Email: {email}</p>
            <p className="mt-1 text-md text-light">
              Available time: {availableTime}
            </p>
            <p className="mt-1 text-md text-light">Experience: {experience}</p>
            <p className="mt-1 text-md text-light">Age: {age}</p>
          </div>
        </div>

        <div className="mt-6">
          <span className="font-semibold text-light">Skills:</span>
          {trainer?.skills && (
            <div className="mt-1.5 flex flex-wrap gap-2">
              {skills?.map((skill, i) => (
                <Badge key={i} color={"lime"} size="sm">
                  {skill}
                </Badge>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 flex gap-12">
          <div>
            <span className="font-semibold text-light">Available days: </span>
            <ul className="list-disc list-inside pl-2 mt-1.5">
              {availableDays?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-semibold text-light">Qualification: </span>
            <ul className="list-disc list-inside pl-2 mt-1.5">
              {qualifications?.split(",")?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <span className="font-semibold text-light">Background:</span>
          <p className="text-pretty text-sm mt-1.5 text-gray-500">
            {background}
          </p>
        </div>

        <div className="flex justify-end mt-8">
          <div className="space-x-2">
            <button
              onClick={() => setOpenModal(true)}
              className="py-2 text-sm font-semibold px-4 bg-red-600 text-white rounded-lg"
            >
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="py-2 text-sm font-semibold px-4 bg-[#5cb85c] text-white rounded-lg"
            >
              Accept
            </button>
          </div>
        </div>
      </div>

      {/* reject modal */}
      <MainModal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="flex-auto">
          <div className="space-y-4">
            <span className="text-dark font-semibold text-md">
              Personal info:
            </span>
            <h3 className="text-md text-light">Name: {name}</h3>

            <p className="mt-1 text-md text-light">Expertise in: {expertise}</p>
            <p className="mt-1 text-md text-light">Email: {email}</p>
            <p className="mt-1 text-md text-light">
              Available time: {availableTime}
            </p>
            <p className="mt-1 text-md text-light">Experience: {experience}</p>
            <p className="mt-1 text-md text-light">Age: {age}</p>
          </div>

          <form onSubmit={handleSubmit(onReject)}>
            <div className="mt-6">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="rejection-msg"
              >
                Rejection Message <sup className="text-red-600">*</sup>
              </label>
              <textarea
                id="feedback"
                className="mt-1 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                rows="4"
                placeholder="write rejection message"
                {...register("rejectionMsg", {
                  required: "rejectionMsg is required",
                })}
              ></textarea>
              {errors.rejectionMsg && (
                <ErrorMsg>{errors.rejectionMsg?.message}</ErrorMsg>
              )}
            </div>

            <div className="flex mt-5 justify-end">
              <button
                type="submit"
                className="py-2 font-medium text-sm rounded-lg  px-5 bg-primary text-dark"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </MainModal>
    </section>
  );
};

export default ApTrainerDetails;

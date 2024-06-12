import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import { Badge } from "flowbite-react";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import { useState } from "react";
import MainModal from "../../../components/Modal/MainModal";
import { useForm } from "react-hook-form";
import ErrorMsg from "../../../components/Shared/ErrorMsg/ErrorMsg";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Rating from "react-rating";
import { FaRegStar, FaStar } from "react-icons/fa6";

const BookedTrainers = () => {
  const axiosSecure = useAxiosSecure();
  const [openModal, setOpenModal] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ["booked-trainers", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/booked-trainers/${user?.email}`);
      return data;
    },
  });

  const onReviewSubmit = async (data) => {
    // Save review data to server
    const reviewData = {
      name: user?.displayName,
      email: user?.email,
      photo: user?.photoURL,
      rating: rating,
      ...data,
    };
    console.log(reviewData);
    try {
      const { data } = await axiosSecure.post("/reviews", reviewData);
      console.log(data);
      if (data.insertedId) {
        toast.success("Your Review Submitted Successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  if (isLoading) return <SecondaryLoader />;

  return (
    <section className="container px-4">
      <PageTitle title={"Booked Trainers"} />

      {data?.map((trainer) => (
        <div
          key={trainer._id}
          className="relative block overflow-hidden max-w-5xl my-6 mx-auto px-6 rounded-lg border bg-white p-4 sm:p-6 lg:p-8"
        >
          <div className="sm:flex sm:flex-row-reverse sm:justify-between sm:gap-4">
            <div className="sm:shrink-0 flex justify-center mb-4 sm:mb-0">
              <img
                alt=""
                src={trainer.photo}
                className="size-52 md:size-64 rounded-lg object-cover shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-5 lg:flex-row">
              <div className="space-y-4">
                {/* <span className="text-dark font-semibold text-md">
                  Trainer info:
                </span> */}
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">
                    Trainer Name:
                  </span>{" "}
                  {trainer.name}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">
                    Trainer Name:
                  </span>{" "}
                  {trainer.email}
                </p>

                <p className="font-medium text-gray-700 mt-6 text-md">
                  Classes he took:
                </p>
                <div className="mt-1.5 flex flex-wrap gap-2">
                  {trainer?.availableSlots[0].classesIncludes?.map((cl, i) => (
                    <Badge key={i} color={"lime"} size="sm">
                      {cl}
                    </Badge>
                  ))}
                </div>

                {/* Available slots */}
                {trainer?.availableSlots && (
                  <div className="mt-7">
                    <h4 className="font-medium text-gray-700 mb-1.5">
                      Available slots:
                    </h4>
                    <ul className="list-inside list-disc pl-2 text-gray-600">
                      {/* slots list */}
                      {trainer.availableSlots.map((slot, i) => (
                        <li key={i} className="mb-1">
                          {slot.slotName}: {slot.slotTime} (
                          {slot.slotDays.map(
                            (d) => d.slice(0, 3).toUpperCase() + ", "
                          )}
                          )
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">Expert in:</span>{" "}
                  {trainer.expertise}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium text-gray-700">Experience:</span>{" "}
                  {trainer.experience}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setOpenModal(true)}
              className="py-1 text-sm font-semibold px-4 bg-primary text-dark rounded-lg"
            >
              Give Review
            </button>
          </div>
        </div>
      ))}

      {/* Review Modal */}
      <MainModal openModal={openModal} setOpenModal={setOpenModal}>
        <div className="flex-auto p-5">
          <h4 className="text-2xl mb-4 text-black font-semibold">
            Give us a review
          </h4>
          <form onSubmit={handleSubmit(onReviewSubmit)}>
            {/* Rating */}
            <div className="flex justify-center">
              <Rating
                value={rating}
                onChange={setRating}
                emptySymbol={<FaRegStar className="size-7 text-amber-500" />}
                fullSymbol={<FaStar className="size-7 text-amber-500" />}
                fractions={2}
              />
            </div>

            {/* designation */}
            <div className="relative w-full mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="name"
              >
                Profession
              </label>
              <input
                id="name"
                type="text"
                className="border-gray-200 bg-gray-100 text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="i.e. Teacher"
                {...register("designation")}
              />
            </div>

            <div className="relative w-full mb-3">
              <label
                className="block text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="name"
              >
                Your Review
              </label>
              <textarea
                id="review"
                className="mt-2 w-full rounded-lg border-gray-200 bg-gray-100 align-top shadow-sm sm:text-sm"
                rows="4"
                placeholder="write your review here.."
                {...register("content", {
                  required: "content is required",
                })}
              ></textarea>
              {errors.content && <ErrorMsg>{errors.content?.message}</ErrorMsg>}
            </div>
            <div className="text-center mt-6">
              <button
                id="feedbackBtn"
                className="bg-primary text-black transition-all duration-150 ease-in text-center mx-auto active:bg-yellow-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="submit"
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

export default BookedTrainers;

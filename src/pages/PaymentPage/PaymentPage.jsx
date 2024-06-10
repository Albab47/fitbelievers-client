import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { Navigate } from "react-router-dom";

const PaymentPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: booking, isLoading } = useQuery({
    queryKey: ["booking", user?.email],
    enabled: !!user.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/bookings/${user?.email}`);
      return data;
    },
  });
  console.log(booking);

  
  const handlePayment = async () => {
    
    // console.log(paymentData);
    // try {
    //   const { data } = await axiosSecure.post("/payments", paymentData);
    //   console.log(data);
    //   if (data.insertedId) {
    //     Navigate("/");
    //     toast.success("Please Pay to Confirm booking");
    //   }
    // } catch (err) {
    //   console.log(err);
    //   toast.error(err.message);
    // }
  };

  if (isLoading) return <SecondaryLoader />;

  return (
    <section className="min-h-screen grid place-content-center">
      <div className="relative space-y-3 block max-w-sm overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
        <header>
          <h1 className="text-primary mb-6 text-xl text-center font-bold bg-lime-950 p-5 rounded-xl">
            Payment
          </h1>
        </header>
        <div className="space-y-4">
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Trainer Name:</span>{" "}
            {booking.trainerName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Slot Name:</span>{" "}
            {booking.slotName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Package Name:</span>{" "}
            {booking.packageName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Price:</span>{" "}
            {booking.price}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Your Name:</span>{" "}
            {booking.name}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Your Email:</span>{" "}
            {booking.email}
          </p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handlePayment}
            className="bg-primary mt-3 text-white font-semibold py-1 px-4 rounded-xl "
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;

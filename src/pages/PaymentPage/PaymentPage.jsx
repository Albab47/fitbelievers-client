import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
// import toast from "react-hot-toast";
// import { Navigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: cart, isLoading } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/carts/${user?.email}`);
      return data;
    },
  });

  const cartInfo = {...cart}
  console.log(cartInfo);

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
            {cart.trainerName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Slot Name:</span>{" "}
            {cart.slotName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Package Name:</span>{" "}
            {cart.packageName}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Price:</span>{" "}
            {cart.price}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Your Name:</span>{" "}
            {cart.name}
          </p>
          <p className="text-gray-600">
            <span className="font-medium text-gray-700">Your Email:</span>{" "}
            {cart.email}
          </p>
        </div>

        <div>
          <Elements stripe={stripePromise}>
            <CheckoutForm bookingInfo={cartInfo}  />
          </Elements>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;

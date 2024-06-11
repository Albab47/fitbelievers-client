import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types"; 
import "./checkout.css";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const CheckoutForm = ({ bookingInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState("");

  // Load client secret from server
  useEffect(() => {
    const getClientSecret = async (price) => {
      const { data } = await axiosSecure.post("/create-payment-intent", price);
      console.log(data);
      setClientSecret(data.clientSecret);
    };
    if (bookingInfo?.price && bookingInfo?.price > 1) {
      getClientSecret({ price: bookingInfo?.price });
    }
  }, [bookingInfo?.price, axiosSecure]);

  console.log(bookingInfo);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true)

    if (!stripe || !elements) {
      return;
    }

    // Get a reference to a mounted CardElement.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error?.message);
      toast.error(cardError);
      setProcessing(false)
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("")
    }

    const {paymentIntent, error: paymentError} = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: bookingInfo.name,
          email: bookingInfo.email,
        }
      }
    })

    if(paymentError) {
      setCardError(paymentError.message);
      toast.error(cardError);
      setProcessing(false)
    }

    console.log(paymentIntent);

    if(paymentIntent.status === "succeeded") {
      const bookingData = {
        ...bookingInfo,
        transactionId: paymentIntent.id,
        date: new Date()
      }
      delete bookingData._id;

      try {
        const {data} = await axiosSecure.post('/bookings', bookingData);
        console.log(data);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }


  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-end">
        <button
          className="bg-primary mt-1 text-white font-semibold py-1 px-4 rounded-xl "
          type="submit"
          disabled={!stripe}
        >
          Pay
        </button>
      </div>
    </form>
  );
};


CheckoutForm.propTypes = {
  bookingInfo: PropTypes.object
};

export default CheckoutForm;

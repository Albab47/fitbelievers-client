import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosCommon from "../../../hooks/useAxiosCommon";
import toast from "react-hot-toast";

const Newsletter = () => {
  const [loading, setLoading] = useState(false);
  const axiosCommon = useAxiosCommon();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (subscriberData) => {
    setLoading(true);
    try {
      // Save data to db
      console.log(subscriberData);
      const { data } = await axiosCommon.post("/newsletter", subscriberData);
      console.log(data);
      if (data.insertedId) {
        toast.success("Thanks for subscribing our newsletter");
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  return (
    <div className="container 2xl:px-36">
      <div className="relative isolate overflow-hidden bg-gray-900 px-6 py-10 shadow-2xl rounded-2xl sm:px-14 xl:py-20">
        <h2 className="mx-auto font-display max-w-2xl text-center text-3xl text-white sm:text-4xl">
          Get Updates About Classes and fitness tips
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-center text-md md:text-lg leading-8 text-gray-300">
          Stay upto date with fitBelievers! Join our mailing list for selective,
          noteworthy updates.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mx-auto mt-10 flex flex-col gap-y-3 md:flex-row  max-w-md gap-x-4"
        >
          <label htmlFor="email-address" className="sr-only">
            Name
          </label>
          <input
            id="email-address"
            type="text"
            required
            className="min-w-0 md:w-2/5 rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary/70 sm:text-sm sm:leading-6"
            placeholder="Enter your name"
            {...register("name")}
          />
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            type="email"
            autoComplete="email"
            required
            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-primary/70 sm:text-sm sm:leading-6"
            placeholder="Enter your email"
            {...register("email")}
          />

          <button
            type="submit"
            disabled={loading}
            className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Subscribe
          </button>
        </form>

        <svg
          viewBox="0 0 1024 1024"
          className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2"
          aria-hidden="true"
        >
          <circle
            cx="512"
            cy="512"
            r="512"
            fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
            fillOpacity="0.7"
          ></circle>
          <defs>
            <radialGradient
              id="759c1415-0410-454c-8f7c-9a820de03641"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(512 512) rotate(90) scale(512)"
            >
              <stop stopColor="#7775D6"></stop>
              <stop offset="1" stopColor="#7ED321" stopOpacity="0"></stop>
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default Newsletter;

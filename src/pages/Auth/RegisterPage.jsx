import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Logo from "../../components/Shared/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import useShowPassword from "../../hooks/useShowPassword";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { HiMail, HiUser } from "react-icons/hi";
import ErrorMsg from "../../components/Shared/ErrorMsg/ErrorMsg";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoKey } from "react-icons/io5";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import { uploadImage } from "../../utils/api";
import { Button } from "flowbite-react";
import HelmetTitle from "../../components/Shared/HelmetTitle/HelmetTitle";

const RegisterPage = () => {
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const { showPassword, handleShowPassword } = useShowPassword();
  const navigate = useNavigate();
  const [imageTxt, setImageText] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageText(file.name);
      setValue("photo", file);
    }
  };

  const onSignIn = async ({ name, email, photo, password }) => {
    try {
      setLoading(true);
      const photoURL = await uploadImage(photo);
      await createUser(email, password);
      await updateUserProfile(name, photoURL);
      toast.success("Account Created Successfully");
      reset();
      navigate("/");
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Account creation failed");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center">
      <HelmetTitle title="FitBelievers | Register" />
      
      <div className="lg:grid lg:max-w-6xl mx-auto rounded-xl bg-white shadow-lg lg:grid-cols-12">
        <section className="relative rounded-xl bg-gray-900  flex h-32 items-end lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1617195737496-bc30194e3a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            className="absolute rounded-xl inset-0 h-full w-full object-cover opacity-80"
          />

          <div className="hidden lg:relative lg:block lg:p-12">
            <a className="block text-white" href="#">
              <span className="sr-only">Home</span>
              <Logo />
            </a>

            <h2 className="mt-6 text-2xl font-display tracking-wide text-white sm:text-3xl md:text-4xl">
              Welcome to Squid
            </h2>

            <p className="mt-4 leading-relaxed text-white/90">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi
              nam dolorum aliquam, quibusdam aperiam voluptatum.
            </p>
          </div>
        </section>

        <main className="flex items-center rounded-lg justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <a className="inline-flex size-16 items-center justify-center rounded-full bg-white text-priborder-primary sm:size-20">
                <span className="sr-only">Home</span>
                <img src={logo} alt="" />
              </a>

              <h1 className="mt-2 text-2xl font-display text-gray-900 sm:text-3xl md:text-4xl">
                Welcome to Squid
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSignIn)}
              className="mt-8 grid grid-cols-6 gap-6"
            >
              {/* name */}
              <div className="col-span-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="name"
                >
                  Username <sup className="text-red-600">*</sup>
                </label>
                <div className="relative ">
                  <span className="absolute left-3 top-2.5">
                    <HiUser className="text-gray-400 size-5" />
                  </span>

                  <input
                    id="name"
                    type="text"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="Abdullah"
                    {...register("name", {
                      required: "username is required",
                    })}
                  />
                  {errors.name && <ErrorMsg>{errors.name?.message}</ErrorMsg>}
                </div>
              </div>

              {/* email */}
              <div className="col-span-6">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="email"
                >
                  Email Address <sup className="text-red-600">*</sup>
                </label>
                <div className="relative ">
                  <span className="absolute left-3 top-2.5">
                    <HiMail className="text-gray-400 size-5" />
                  </span>

                  <input
                    id="email"
                    type="email"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="name@gmail.com"
                    {...register("email", {
                      required: "email is required",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Email is not valid",
                      },
                    })}
                  />
                  {errors.email && <ErrorMsg>{errors.email?.message}</ErrorMsg>}
                </div>
              </div>

              {/* photo field */}
              <label
                htmlFor="dropzone-file"
                className="flex col-span-6 w-full items-center p-2.5 mx-auto  text-center bg-white border-2 border-dotted rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
              >
                <MdOutlineFileUpload className="text-gray-400 size-6" />

                <h2 className="mx-2.5 text-gray-400">
                  {imageTxt ? imageTxt : "Upload image"}
                </h2>

                <input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  {...register("photo", { onChange: handleFileChange })}
                />
              </label>

              {/* password */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="password"
                >
                  Password
                </label>

                <div className="relative">
                  <span className="absolute left-3 top-2.5">
                    <IoKey className="text-gray-400 size-5" />
                  </span>

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="******"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Requires at least 6 characters",
                      },
                      pattern: {
                        value: /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}|:"<>?]).*$/,
                        message:
                          "Requires one capital letter and a special character",
                      },
                    })}
                    onKeyUp={() => trigger("password")}
                  />
                  {errors.password && (
                    <ErrorMsg>{errors.password?.message}</ErrorMsg>
                  )}

                  <span className="absolute text-gray-500 top-3.5 end-0 grid place-content-center px-4">
                    {showPassword ? (
                      <IoMdEyeOff onClick={handleShowPassword} />
                    ) : (
                      <IoMdEye onClick={handleShowPassword} />
                    )}
                  </span>
                </div>
              </div>

              {/* confirm pass */}
              <div className="col-span-6 sm:col-span-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="******"
                    {...register("confirmPass", {
                      required: "enter password again to confirm",
                      validate: (value) =>
                        value === watch("password", "") ||
                        "password did not match",
                    })}
                    onKeyUp={() => trigger("confirmPass")}
                  />
                  {errors.confirmPass && (
                    <ErrorMsg>{errors.confirmPass?.message}</ErrorMsg>
                  )}

                  <span className="absolute text-gray-500 inset-y-0 end-0 grid place-content-center px-4">
                    {showPassword ? (
                      <IoMdEyeOff onClick={handleShowPassword} />
                    ) : (
                      <IoMdEye onClick={handleShowPassword} />
                    )}
                  </span>
                </div>
              </div>

              {/* newsletter checkbox */}
              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about classes, events etc.
                  </span>
                </label>
              </div>

              <div className="col-span-6">
                <Button type="submit" disabled={loading} gradientMonochrome="lime" fullSized className="shrink-0 rounded-xl">
                  Create account
                </Button>
              </div>

              <p className="col-span-6 text-sm font-light text-center text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary dark:text-gray-200 hover:underline"
                >
                  Please login
                </Link>
              </p>
            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default RegisterPage;

import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { HiMail } from "react-icons/hi";
import { IoKey } from "react-icons/io5";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import useAuth from "../../hooks/useAuth";
import useShowPassword from "../../hooks/useShowPassword";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ErrorMsg from "../../components/Shared/ErrorMsg/ErrorMsg";
import { Button } from "flowbite-react";

const LoginPage = () => {
  const { signIn, loginWithGoogle, loading, setLoading } = useAuth();
  const { showPassword, handleShowPassword } = useShowPassword();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async ({ email, password }) => {
    try {
      const result = await signIn(email, password);
      if (result.user) {
        reset();
        navigate(from, { replace: true });
        return toast.success("Login successful");
      }
    } catch (err) {
      const errorCode = err.code;
      if (errorCode === "auth/invalid-credential") {
        toast.error("Email and password do not match. Please try again.");
      }
      setLoading(false)
    }
  };

  const handleLoginWithGoogle = async () => {
    try {
      const result = await loginWithGoogle();
      if (result.user) {
        navigate(from, { replace: true });
        toast.success(`Logged in as ${result.user.displayName}`);
      }
    } catch (err) {
      const errorCode = err.code;
      setLoading(false)
      toast.error(errorCode);
    }
  };

  return (
    <section className="min-h-screen flex items-center">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2">
          <img src="https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-6 py-8 md:px-8 lg:w-1/2"
        >
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          {/* google login */}
          <button
            type="button"
            onClick={handleLoginWithGoogle}
            className="flex items-center w-full justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <FcGoogle />
            <span className="mx-2">Sign in with Google</span>
          </button>

          <div className="py-2 flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <button className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
              or login with email
            </button>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          {/* email field */}
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="email"
            >
              Email Address
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
                  required: "Please enter your email",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Email is not valid",
                  },
                })}
              />
              {errors.email && <ErrorMsg>{errors.email?.message}</ErrorMsg>}
            </div>
          </div>

          {/* password field */}
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <a className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
                Forget Password?
              </a>
            </div>

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
                  required: "Please enter your password",
                })}
              />
              {errors.password && (
                <ErrorMsg>{errors.password?.message}</ErrorMsg>
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

          <div className="mt-6">
            <Button
              type="submit"
              disabled={loading}
              gradientMonochrome="lime"
              fullSized
              className="shrink-0 rounded-xl"
            >
              Login
            </Button>
          </div>

          <p className="mt-8 text-xs font-light text-center text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary dark:text-gray-200 hover:underline"
            >
              Create One
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;

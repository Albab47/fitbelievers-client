import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FcGoogle } from "react-icons/fc";
import { HiMail } from "react-icons/hi";
import { IoKey } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";

const LoginPage = () => {

  return (
    <section className="h-screen flex items-center">
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2">
          <img src="https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80" />
        </div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          {/* google login */}
          <button className="flex items-center w-full justify-center px-6 py-3 mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
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
            <div className="relative flex items-center">
              <span className="absolute left-3">
                <HiMail className="text-gray-400 size-5" />
              </span>

              <input
                id="email"
                type="email"
                className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2 shadow-sm rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="name@gmail.com"
              />
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

            <div className="relative flex items-center">
              <span className="absolute left-3">
                <IoKey className="text-gray-400 size-5" />
              </span>

              <input
                id="password"
                type="password"
                className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2 shadow-sm rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="******"
              />

              <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                <IoMdEye className="text-gray-500" />
              </span>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-dark capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-primary/80 focus:outline-none focus:ring focus:ring-lime-300 focus:ring-opacity-50">
              Login
            </button>
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
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

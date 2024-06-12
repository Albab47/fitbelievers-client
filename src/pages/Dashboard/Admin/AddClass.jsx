import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import { GiGymBag } from "react-icons/gi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import ErrorMsg from "../../../components/Shared/ErrorMsg/ErrorMsg";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadImage } from "../../../utils/api";
import toast from "react-hot-toast";

const AddClass = () => {
  const axiosSecure = useAxiosSecure();
  const [imageTxt, setImageText] = useState("");
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageText(file.name);
      setValue("image", file);
    }
  };

  const onAddClass = async (classData) => {
    setLoading(true)
    console.log(classData);
    const imgURL = await uploadImage(classData.image);
    classData.image = imgURL;
    classData.numberOfBookings = 0;

    try {
      const { data } = await axiosSecure.post(`/classes`, classData);
      console.log(data);
      if (data.insertedId) {
        toast.success("Successfully Class Added");
        reset();
        navigate("/");
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.error(err);
    }
  };

  return (
    <div className="bg-gray-100 py-6 flex flex-col justify-center sm:py-8">
      <div className="py-3 mx-auto">
        <div className="px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <div className="">
            {/* form header */}
            <header className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-lime-50 font-bold rounded-full flex flex-shrink-0 justify-center items-center text-primary text-3xl font-mono">
                <GiGymBag />
              </div>
              <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                <h2 className="leading-relaxed">Add a new class</h2>
                <p className="text-sm text-gray-500 font-normal leading-relaxed">
                  Add new with these required fields
                </p>
              </div>
            </header>

            <form onSubmit={handleSubmit(onAddClass)} className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="space-y-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="name"
                  >
                    Class Name <sup className="text-red-600">*</sup>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="Class Name"
                    {...register("name", {
                      required: "This field is required",
                    })}
                  />
                  {errors.name && <ErrorMsg>{errors.name?.message}</ErrorMsg>}
                </div>

                <div className="">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="description"
                  >
                    Description <sup className="text-red-600">*</sup>
                  </label>

                  <textarea
                    id="description"
                    className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="i.e. Certified Calisthenics Trainer"
                    {...register("description", {
                      required: "description is required",
                    })}
                  ></textarea>
                  {errors.description && (
                    <ErrorMsg>{errors.description?.message}</ErrorMsg>
                  )}
                </div>

                <div className="">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="details"
                  >
                    Details <sup className="text-red-600">*</sup>
                  </label>

                  <textarea
                    id="details"
                    className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="Detail information about the class"
                    {...register("details", {
                      required: "details is required",
                    })}
                  ></textarea>
                  {errors.details && (
                    <ErrorMsg>{errors.details?.message}</ErrorMsg>
                  )}
                </div>

                <div className="space-y-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="additionalInfo"
                  >
                    Additional Info
                  </label>
                  <input
                    id="additionalInfo"
                    type="text"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="i.e bring towel"
                    {...register("additionalInfo")}
                  />
                  {errors.additionalInfo && <ErrorMsg>{errors.additionalInfo?.message}</ErrorMsg>}
                </div>

                {/* photo field */}
                <label
                  htmlFor="dropzone-file"
                  className="flex w-full items-center p-3 justify-center bg-white border-2 border-dotted rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
                >
                  <MdOutlineFileUpload className="text-gray-400 size-6" />

                  <h2 className="mx-2.5 text-gray-400">
                    {imageTxt ? imageTxt : "Upload image"}
                  </h2>

                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    {...register("image", {
                      onChange: handleFileChange,
                    })}
                  />
                </label>

              </div>

              <div className="pt-4 flex items-center space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary font-bold flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClass;

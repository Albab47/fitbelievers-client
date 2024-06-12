import { Controller, useForm } from "react-hook-form";
import PageHeader from "../../components/Shared/PageHeader/PageHeader";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ErrorMsg from "../../components/Shared/ErrorMsg/ErrorMsg";
import { MdOutlineFileUpload } from "react-icons/md";
import { useState } from "react";
import { Checkbox, Label } from "flowbite-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import SecondaryLoader from "../../components/Shared/Loader/SecondaryLoader";
import { uploadImage } from "../../utils/api";

const animatedComponents = makeAnimated();

const skills = [
  { id: 1, label: "Calisthenics" },
  { id: 2, label: "Boxing" },
  { id: 3, label: "Nutrition" },
  { id: 4, label: "Strength Training" },
  { id: 5, label: "Bodybuilding" },
  { id: 6, label: "Yoga" },
];

const dayOptions = [
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
];

const BeATrainerPage = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imageTxt, setImageText] = useState("");
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    render,
    control,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageText(file.name);
      setValue("photo", file);
    }
  };

  const onSubmit = async (trainerData) => {
    console.log(trainerData);
    setLoading(true)
    const imgURL = await uploadImage(trainerData.photo);
    trainerData.photo = imgURL;

    try {
      const { data } = await axiosSecure.post(`/applied-trainers`, trainerData);
      if (data.insertedId) {
        console.log(data);
        toast.success("Successfully Applied for trainer role");
        reset();
        navigate("/");
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      console.error(err);
    }
  };

  if (loading) return <SecondaryLoader />;

  return (
    <div>
      <PageHeader heading="Be a Trainer" />

      <section className="container 2xl:px-36 my-12">
        <div className="bg-white rounded shadow-md p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-6 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="text-gray-600">
              <p className="font-medium text-lg">Personal Details</p>
              <p>Please fill out all the fields.</p>
            </div>

            <div className="lg:col-span-2">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-5 gap-y-3.5 text-sm grid-cols-1 md:grid-cols-5"
              >
                {/* name */}
                <div className="md:col-span-5 space-y-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="name"
                  >
                    Full Name <sup className="text-red-600">*</sup>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="Your full name"
                    {...register("name", {
                      required: "full name is required",
                    })}
                  />
                  {errors.name && <ErrorMsg>{errors.name?.message}</ErrorMsg>}
                </div>

                {/* email and photo */}
                <div className="md:col-span-5 flex flex-col gap-4 sm:flex-row space-y-2 md:space-y-5">
                  <div className="w-full sm:w-1/2">
                    <label
                      className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                      htmlFor="email"
                    >
                      Email <sup className="text-red-600">*</sup>
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                      placeholder="Your email"
                      value={user?.email}
                      {...register("email", {
                        required: "email is required",
                      })}
                      readOnly
                    />
                    {errors.email && (
                      <ErrorMsg>{errors.email?.message}</ErrorMsg>
                    )}
                  </div>

                  {/* photo field */}
                  <label
                    htmlFor="dropzone-file"
                    className="flex w-full sm:w-1/2 items-center p-2.5 justify-center bg-white border-2 border-dotted rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
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
                </div>

                {/* expertise */}
                <div className="md:col-span-2 space-y-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="expertise"
                  >
                    Areas of expertise <sup className="text-red-600">*</sup>
                  </label>
                  <input
                    id="expertise"
                    type="text"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="eg: strength training"
                    {...register("expertise", {
                      required: "expertise is required",
                    })}
                  />
                  {errors.expertise && (
                    <ErrorMsg>{errors.expertise?.message}</ErrorMsg>
                  )}
                </div>

                {/* experience */}
                <div className="md:col-span-2 space-y-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="experience"
                  >
                    Experience <sup className="text-red-600">*</sup>
                  </label>
                  <input
                    id="experience"
                    type="text"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="i.e:  5 years"
                    {...register("experience", {
                      required: "experience is required",
                    })}
                  />
                  {errors.experience && (
                    <ErrorMsg>{errors.experience?.message}</ErrorMsg>
                  )}
                </div>

                {/* Age */}
                <div className="md:col-span-1 space-y-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="age"
                  >
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="i.e 25"
                    {...register("age")}
                  />
                  {errors.age && <ErrorMsg>{errors.age?.message}</ErrorMsg>}
                </div>

                {/* skills */}
                <div className="md:col-span-5 space-y-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="name"
                  >
                    Skills <sup className="text-red-600">*</sup>
                  </label>

                  <div className="flex flex-wrap gap-5">
                    {skills.map((skill) => (
                      <div key={skill.id} className="flex items-center gap-2">
                        <Checkbox
                          id={`skill-${skill.id}`}
                          color="lime"
                          value={skill.label}
                          {...register("skills")}
                        />
                        <Label htmlFor={`skill-${skill.id}`} className="flex">
                          {skill.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Available days in a week */}
                <div className="md:col-span-3 space-y-3">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="name"
                  >
                    Available days <sup className="text-red-600">*</sup>
                  </label>
                  <Controller
                    control={control}
                    name="availableDays"
                    render={({ field }) => (
                      <Select
                        {...field}
                        isMulti
                        closeMenuOnSelect={false}
                        options={dayOptions}
                        components={animatedComponents}
                        value={dayOptions.filter(option => field.value?.includes(option.value))}
                        onChange={(selectedOptions) =>
                          field.onChange(
                            selectedOptions.map((option) => option.value)
                          )
                        }
                      />
                    )}
                  />
                  {errors.availableDays && (
                    <ErrorMsg>{errors.availableDays?.message}</ErrorMsg>
                  )}
                </div>

                {/* Available time */}
                <div className="md:col-span-2">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="availableTime"
                  >
                    Available time <sup className="text-red-600">*</sup>
                  </label>
                  <input
                    id="availableTime"
                    type="text"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    placeholder="i.e. 9am-5pm"
                    {...register("availableTime", {
                      required: "AvailableTime is required",
                    })}
                  />
                  {errors.availableTime && (
                    <ErrorMsg>{errors.availableTime?.message}</ErrorMsg>
                  )}
                </div>

                <div className="md:col-span-5">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="qualifications"
                  >
                    Qualification <sup className="text-red-600">*</sup>
                  </label>

                  <textarea
                    id="qualifications"
                    className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="i.e. Certified Calisthenics Trainer (make sure to add a comma after each point)"
                    {...register("qualifications", {
                      required: "qualifications is required",
                    })}
                  ></textarea>
                  {errors.qualifications && (
                    <ErrorMsg>{errors.qualifications?.message}</ErrorMsg>
                  )}
                </div>

                <div className="md:col-span-5">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                    htmlFor="background"
                  >
                    Background <sup className="text-red-600">*</sup>
                  </label>

                  <textarea
                    id="background"
                    className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
                    rows="4"
                    placeholder="i.e. Certified Calisthenics Trainer"
                    {...register("background", {
                      required: "backgrounds is required",
                    })}
                  ></textarea>
                  {errors.background && (
                    <ErrorMsg>{errors.background?.message}</ErrorMsg>
                  )}
                </div>

                <div className="md:col-span-5 text-right">
                  <div className="inline-flex items-end">
                    <button
                      disabled={loading}
                      type="submit"
                      className="bg-primary text-dark hover:bg-lime-500 font-bold py-2 px-4 rounded"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BeATrainerPage;

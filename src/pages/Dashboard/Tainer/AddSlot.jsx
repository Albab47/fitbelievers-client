import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/Dashboard/Shared/PageTitle";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import ErrorMsg from "../../../components/Shared/ErrorMsg/ErrorMsg";
import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import { Checkbox, Label } from "flowbite-react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import toast from "react-hot-toast";
const animatedComponents = makeAnimated();

const slotNameOptions = [
  { value: "Morning", label: "Morning Slot" },
  { value: "Afternoon", label: "Afternoon Slot" },
  { value: "Evening", label: "Evening Slot" },
  { value: "Morning", label: "Early Morning Slot" },
  { value: "Afternoon", label: "Late Afternoon Slot" },
  { value: "Night", label: "Night Slot" },
];

const slotTimeOptions = [
  { value: "07:00 AM - 08:00 AM", label: "07:00 AM - 08:00 AM" },
  { value: "08:00 AM - 09:00 AM", label: "08:00 AM - 09:00 AM" },
  { value: "09:00 AM - 10:00 AM", label: "09:00 AM - 10:00 AM" },
  { value: "10:00 AM - 11:00 AM", label: "10:00 AM - 11:00 AM" },
  { value: "11:00 AM - 12:00 PM", label: "11:00 AM - 12:00 PM" },
  { value: "12:00 PM - 01:00 PM", label: "12:00 PM - 01:00 PM" },
  { value: "01:00 PM - 02:00 PM", label: "01:00 PM - 02:00 PM" },
  { value: "02:00 PM - 03:00 PM", label: "02:00 PM - 03:00 PM" },
  { value: "03:00 PM - 04:00 PM", label: "03:00 PM - 04:00 PM" },
  { value: "04:00 PM - 05:00 PM", label: "04:00 PM - 05:00 PM" },
  { value: "05:00 PM - 06:00 PM", label: "05:00 PM - 06:00 PM" },
  { value: "06:00 PM - 07:00 PM", label: "06:00 PM - 07:00 PM" },
  { value: "07:00 PM - 08:00 PM", label: "07:00 PM - 08:00 PM" },
  { value: "08:00 PM - 09:00 PM", label: "08:00 PM - 09:00 PM" },
];

const AddSlot = () => {
  const { user, loading, setLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
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

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["trainer", user?.email],
    enabled: !!user.email,
    queryFn: async () => {
      const { data } = await axiosSecure(`/trainer/${user?.email}`);
      return data;
    },
  });

  const { data: classOptions = [] } = useQuery({
    queryKey: ["classOptions"],
    queryFn: async () => {
      const { data } = await axiosSecure(`/classes?optionData=true`);
      const options = data.map((option) => ({
        value: option.name,
        label: option.name,
      }));
      return options;
    },
  });

  const {
    _id,
    name,
    expertise,
    background,
    availableDays,
    availableTime,
    qualifications,
    experience,
    skills,
    age,
  } = trainer;

  const dayOptions = availableDays?.map((day) => ({ value: day, label: day }));

  const onAddSlot = async (slotData) => {
    slotData.trainer.photo = user?.photoURL;
    slotData.trainer.id = _id;
    setLoading(true);

    try {
      const { data } = await axiosSecure.post(`/slots`, slotData);
      console.log(data);
      if (data.insertedId) {
        toast.success("Slot Added Successfully");
        reset();
        navigate("/");
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  if (loading || isLoading) return <SecondaryLoader />;

  return (
    <div className="container px-4">
      <PageTitle title={"Add New slot"} />

      <section className="max-w-5xl p-6 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800 mt-2">
        <h1 className="text-lg -ml-1 font-semibold text-dark capitalize dark:text-white">
          Trainer info:
        </h1>
        <form onSubmit={handleSubmit(onAddSlot)}>
          <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
            {/* name */}
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Full Name
              </label>
              <input
                type="text"
                className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="Your full name"
                value={name}
                readOnly
                {...register("trainer.name")}
              />
            </div>

            {/* email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="Your email"
                value={user?.email}
                readOnly
                {...register("trainer.email")}
              />
            </div>

            {/* expertise */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Areas of expertise
              </label>
              <input
                type="text"
                className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="eg: strength training"
                value={expertise}
                readOnly
                {...register("trainer.expertise")}
              />
            </div>

            {/* experience */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Experience <sup className="text-red-600">*</sup>
              </label>
              <input
                type="text"
                className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="i.e:  5 years"
                value={experience}
                readOnly
                {...register("trainer.experience")}
              />
              {errors.experience && (
                <ErrorMsg>{errors.experience?.message}</ErrorMsg>
              )}
            </div>

            {/* Age */}
            <div className="">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Age
              </label>
              <input
                type="number"
                className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="i.e 25"
                value={age}
                readOnly
                {...register("trainer.age")}
              />
            </div>

            {/* skills */}
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-600 dark:text-gray-200">
                Skills <sup className="text-red-600">*</sup>
              </label>

              <div className="flex flex-wrap gap-1.5 ml-1">
                {skills?.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Checkbox
                      id={i}
                      color="lime"
                      value={skill}
                      checked
                      {...register("trainer.skills")}
                    />
                    <Label htmlFor={i} className="flex">
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Available time */}
            <div className="md:col-span-2">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="availableTime"
              >
                Available time
              </label>
              <input
                id="availableTime"
                type="text"
                className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                placeholder="i.e. 9am-5pm"
                value={availableTime}
                readOnly
                {...register("trainer.availableTime")}
              />
            </div>

            <div>
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
                placeholder="i.e. Certified Calisthenics Trainer"
                value={qualifications}
                readOnly
                {...register("trainer.qualifications")}
              ></textarea>
            </div>

            <div className="">
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
                value={background}
                readOnly
                {...register("trainer.background")}
              ></textarea>
            </div>

            <h1 className="text-lg md:col-span-2 -ml-1 font-semibold text-dark capitalize dark:text-white">
              Slot info:
            </h1>

            {/* Slot name */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="slotName"
              >
                Slot Name <sup className="text-red-600">*</sup>
              </label>
              <Controller
                control={control}
                name="slotName"
                render={({ field }) => (
                  <Select
                    {...field}
                    closeMenuOnSelect={false}
                    options={slotNameOptions}
                    components={animatedComponents}
                    value={slotNameOptions.find(
                      (option) => option === field.value
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption.value)
                    }
                  />
                )}
                rules={{ required: "This field is required" }}
              />
              {errors.slotName && (
                <ErrorMsg>{errors.slotName?.message}</ErrorMsg>
              )}
            </div>

            {/* Days */}
            <div className="space-y-2">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Slot days <sup className="text-red-600">*</sup>
              </label>
              <Controller
                control={control}
                name="slotDays"
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    closeMenuOnSelect={false}
                    options={dayOptions}
                    components={animatedComponents}
                    value={dayOptions?.filter((option) =>
                      field.value?.includes(option.value)
                    )}
                    onChange={(selectedOptions) =>
                      field.onChange(
                        selectedOptions.map((option) => option.value)
                      )
                    }
                  />
                )}
                rules={{ required: "This field is required" }}
              />
              {errors.slotDays && (
                <ErrorMsg>{errors.slotDays?.message}</ErrorMsg>
              )}
            </div>

            {/* Slot time */}
            <div>
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="slotName"
              >
                Slot Time <sup className="text-red-600">*</sup>
              </label>
              <Controller
                control={control}
                name="slotTime"
                render={({ field }) => (
                  <Select
                    {...field}
                    closeMenuOnSelect={false}
                    options={slotTimeOptions}
                    components={animatedComponents}
                    value={slotTimeOptions.find(
                      (option) => option === field.value
                    )}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption.value)
                    }
                  />
                )}
                rules={{ required: "This field is required" }}
              />
              {errors.slotTime && (
                <ErrorMsg>{errors.slotTime?.message}</ErrorMsg>
              )}
            </div>

            {/* Classes include */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
                Classes includes <sup className="text-red-600">*</sup>
              </label>
              <Controller
                control={control}
                name="classesIncludes"
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    closeMenuOnSelect={false}
                    options={classOptions}
                    components={animatedComponents}
                    value={classOptions.filter((option) =>
                      field.value?.includes(option.value)
                    )}
                    onChange={(selectedOptions) =>
                      field.onChange(
                        selectedOptions.map((option) => option.value)
                      )
                    }
                  />
                )}
                rules={{ required: "This field is required" }}
              />
              {errors.classesIncludes && (
                <ErrorMsg>{errors.classesIncludes?.message}</ErrorMsg>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-lime-400 font-medium rounded-lg hover:bg-lime-500 focus:outline-none focus:bg-lime-500"
            >
              Add Slot
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddSlot;

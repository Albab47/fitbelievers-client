import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import { HiMail, HiUser } from "react-icons/hi";
import ErrorMsg from "../../../components/Shared/ErrorMsg/ErrorMsg";
import { Button } from "flowbite-react";
import toast from "react-hot-toast";
import { uploadImage } from "../../../utils/api";
import HelmetTitle from "../../../components/Shared/HelmetTitle/HelmetTitle";

const ProfilePage = () => {
  const { user, updateUserProfile, loading, setLoading } = useAuth();
  // const [updateProfile, setUpdateProfile] = useState(false);
  const [imageTxt, setImageText] = useState("");
  const [imgPreview, setImgPreview] = useState();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const objectURL = URL.createObjectURL(file);

    if (file) {
      setImageText(file.name);
      setImgPreview(objectURL);
      setValue("photo", file);
    }
  };

  const onUpdate = async ({ name, photo }) => {
    setLoading(true);
    const photoURL = await uploadImage(photo);

    try {
      const { data } = await updateUserProfile(name, photoURL);
      console.log(data);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-12 container px-4 md:mt-48 flex justify-center">
      <HelmetTitle title="Dashboard | Profile" />
      <div className=" flex flex-col justify-center p-6 shadow-md rounded-xl sm:px-12 bg-gray-50 text-gray-800">
        <img
          src={user.photoURL}
          className="w-32 h-32 mx-auto rounded-full bg-gray-500 aspect-square"
        />
        <div className="space-y-4 text-center divide-y divide-gray-300">
          <div className="my-2 space-y-1">
            <h2 className="text-xl font-semibold sm:text-2xl">
              {user?.displayName}
            </h2>
            <p className="px-5 text-xs sm:text-base text-gray-600">
              <span className="font-medium">Last login:</span> {user?.metadata?.lastSignInTime}
            </p>
          </div>

          <div className="flex flex-col justify-center pt-2 space-x-4 align-center">
            <p className="text-gray-500">
              <span className="font-medium text-gray-700">Email:</span>{" "}
              {user?.email}
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onUpdate)}
          className="container flex flex-col mx-auto space-y-12"
        >
          <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm bg-gray-50">
            <div className="space-y-2 col-span-full lg:col-span-1">
              <p className="font-medium">Profile</p>
              <p className="text-xs">Update your profile</p>
            </div>
            <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
              {/* name */}
              <div className="col-span-full sm:col-span-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="name"
                >
                  Full Name
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
                    defaultValue={user?.displayName}
                    {...register("name", {
                      required: "username is required",
                    })}
                  />
                  {errors.name && <ErrorMsg>{errors.name?.message}</ErrorMsg>}
                </div>
              </div>

              {/* email */}
              <div className="col-span-full sm:col-span-3">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="email"
                >
                  Your Email
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5">
                    <HiMail className="text-gray-400 size-5" />
                  </span>

                  <input
                    id="email"
                    type="email"
                    className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
                    value={user?.email}
                    readOnly
                  />
                </div>
              </div>

              {/* photo field */}
              <div className="col-span-full">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  htmlFor="photo"
                >
                  Photo
                </label>
                <div className="flex items-center space-x-2">
                  <img
                    src={imgPreview || user?.photoURL}
                    alt="user profile image"
                    className="w-10 h-10 rounded-full bg-gray-300"
                  />
                  {/* photo field */}
                  <label
                    htmlFor="dropzone-file"
                    className="px-3 py-1 text-sm border rounded-md border-gray-800"
                  >
                    Change
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      {...register("photo", { onChange: handleFileChange })}
                    />
                  </label>
                </div>
              </div>

              <div className="col-span-6 flex justify-end">
                <Button
                  type="submit"
                  disabled={loading}
                  gradientMonochrome="lime"
                  className="shrink-0 rounded-xl"
                >
                  Update
                </Button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;

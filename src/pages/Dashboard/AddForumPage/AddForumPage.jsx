import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useRole from "../../../hooks/useRole";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ErrorMsg from "../../../components/Shared/ErrorMsg/ErrorMsg";
import { MdOutlineFileUpload } from "react-icons/md";
import { uploadImage } from "../../../utils/api";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import HelmetTitle from "../../../components/Shared/HelmetTitle/HelmetTitle";

const AddForumPage = () => {
  const { role } = useRole();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [imageTxt, setImageText] = useState("");
  const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageText(file.name);
      setValue("image", file);
    }
  };

  const onPostSubmit = async (data) => {
    setLoading(true);

    const postData = {
      ...data,
      upvote: 0,
      downvote: 0,
      timestamp: new Date(),
      postedBy: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
        role: role,
      },
    };
    const imgURL = await uploadImage(postData?.image);
    postData.image = imgURL;
    console.log(postData);

    try {
      const { data } = await axiosSecure.post(`/posts`, postData);
      if (data.insertedId) {
        console.log(data);
        toast.success("Post Added Successfully");
        reset();
        // navigate("/");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <HelmetTitle title="FitBelievers | Add New Post" />
      
      {/* <!-- Author: FormBold Team --> */}
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form onSubmit={handleSubmit(onPostSubmit)} className="py-6 px-9">
          <div className="space-y-3">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="title"
            >
              Title: <sup className="text-red-600">*</sup>
            </label>
            <input
              id="title"
              type="text"
              className="border-gray-200 bg-white text-sm text-gray-700 block w-full py-2.5 shadow-sm rounded-lg px-4 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-primary dark:focus:border-primary/90 focus:ring-primary/50 focus:outline-none focus:ring focus:ring-opacity-30"
              placeholder="Post title"
              {...register("title", {
                required: "Title is required",
              })}
            />
            {errors.title && <ErrorMsg>{errors.title?.message}</ErrorMsg>}
          </div>

          {/* image field */}
          <div className="mb-6 pt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              Post image: <sup className="text-red-600">*</sup>
            </label>

            <div>
              <label
                htmlFor="dropzone-file"
                className="flex w-full items-center p-10 justify-center bg-white border-2 border-dotted rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
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
              {errors.image && <ErrorMsg>{errors.image?.message}</ErrorMsg>}
            </div>
          </div>

          {/* post content */}
          <div className="mb-6">
            <textarea
              className="mt-2 w-full rounded-lg border-gray-200 align-top shadow-sm sm:text-sm"
              rows="4"
              placeholder="Write your post here..."
              {...register("content", {
                required: "You must write something to submit",
              })}
            ></textarea>
            {errors.content && <ErrorMsg>{errors.content?.message}</ErrorMsg>}
          </div>

          <div>
            <button
              disabled={loading}
              className="hover:shadow-form w-full rounded-md bg-primary hover:bg-primary/90 py-3 px-8 text-center text-base font-semibold text-white outline-none"
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddForumPage;

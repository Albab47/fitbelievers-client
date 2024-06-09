import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SecondaryLoader from "../../../components/Shared/Loader/SecondaryLoader";
import { Badge } from "flowbite-react";
import toast from "react-hot-toast";

const ApTrainerDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate()

  const { data: trainer = {}, isLoading } = useQuery({
    queryKey: ["appliedTrainer", id],
    queryFn: async () => {
      const { data } = await axiosSecure(`/applied-trainers/${id}`);
      return data;
    },
  });

  const {
    name,
    email,
    photo,
    expertise,
    experience,
    age,
    skills,
    availableTime,
    availableDays,
    qualifications,
    background,
  } = trainer;

  const handleAccept = async() => {
    console.log(trainer._id);
    delete trainer._id;
    console.log(trainer);
    
    try {
      const { data } = await axiosSecure.post("/trainers", trainer);
      console.log(data);
      toast.success("Trainer Accepted Successfully")
      navigate('/dashboard/applied-trainers')
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <SecondaryLoader />;

  return (
    <section className="container px-4">
      <div className="relative block overflow-hidden max-w-5xl my-16 mx-auto px-6 rounded-lg border bg-white p-4 sm:p-6 lg:p-8">
        <div className="sm:flex sm:flex-row-reverse sm:justify-between sm:gap-4">
          <div className="sm:shrink-0 flex justify-center mb-6 sm:mb-0">
            <img
              alt=""
              src={photo}
              className="size-52 md:size-64 rounded-lg object-cover shadow-sm"
            />
          </div>

          <div className="space-y-4">
            <span className="text-dark font-semibold text-md">
              Personal info:
            </span>
            <h3 className="text-md text-light">Name: {name}</h3>

            <p className="mt-1 text-md text-light">Expertise in: {expertise}</p>
            <p className="mt-1 text-md text-light">Email: {email}</p>
            <p className="mt-1 text-md text-light">
              Available time: {availableTime}
            </p>
            <p className="mt-1 text-md text-light">Experience: {experience}</p>
            <p className="mt-1 text-md text-light">Age: {age}</p>
          </div>
        </div>

        <div className="mt-6">
          <span className="font-semibold text-light">Skills:</span>
          <div className="mt-1.5 flex flex-wrap gap-2">
            {skills?.map((skill, i) => (
              <Badge key={i} color={"lime"} size="sm">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-12">
          <div>
            <span className="font-semibold text-light">Available days: </span>
            <ul className="list-disc list-inside pl-2 mt-1.5">
              {availableDays?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <span className="font-semibold text-light">Qualification: </span>
            <ul className="list-disc list-inside pl-2 mt-1.5">
              {qualifications?.split(",").map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4">
          <span className="font-semibold text-light">Background:</span>
          <p className="text-pretty text-sm mt-1.5 text-gray-500">
            {background}
          </p>
        </div>

        <div className="flex justify-end mt-8">
          <div className="space-x-2">
            <button className="py-2 text-sm font-semibold px-4 bg-red-600 text-white rounded-lg">
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="py-2 text-sm font-semibold px-4 bg-[#5cb85c] text-white rounded-lg"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApTrainerDetails;

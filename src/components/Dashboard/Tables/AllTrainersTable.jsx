import PropTypes from "prop-types";
import { FaTrashAlt } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";

const AllTrainersTable = ({ trainers, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false)
  console.log(trainers);

  const handleDeleteTrainer = async (id) => {
    console.log(id);
    setLoading(true)
    
    try {
      const { data } = await axiosSecure.delete(`/trainers/${id}`);
      console.log(data);
      if (data.deletedCount > 0) {
        toast.success("Trainer Deleted Successfully");
        refetch();
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
        setLoading(false)
    }
  };

  return (
    <section className="container px-4 mx-auto">
      {/* table heading */}
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          All trainers
        </h2>

        <span className="px-3 py-1 text-xs text-lime-600 bg-lime-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {trainers?.length} trainers
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Expertise
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Available Time
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Available Days
                    </th>

                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {trainers?.map((trainer) => (
                    <tr key={trainer._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <div className="flex items-center gap-x-2">
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src={trainer.photo}
                              alt=""
                            />
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white ">
                                {trainer.name}
                              </h2>
                              <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                {trainer.email}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {trainer.expertise}
                      </td>

                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-lg gap-x-2 bg-lime-100/60 dark:bg-gray-800">
                          <h2 className="text-sm font-normal text-lime-500">
                            {trainer.availableTime}
                          </h2>
                        </div>
                      </td>

                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center py-1 gap-x-2  dark:bg-gray-800">
                          {trainer.availableDays.map((day) => (
                            <h2
                              key={day}
                              className="text-sm font-normal text-gray-500"
                            >
                              {day + ","}
                            </h2>
                          ))}
                        </div>
                      </td>

                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <button
                          disabled={loading}
                          onClick={() => handleDeleteTrainer(trainer._id)}
                          className="bg-red-100 px-3 py-1 rounded-lg flex gap-1 items-center text-red-600 hover:text-white transition-colors duration-200 dark:hover:text-dark dark:white hover:bg-red-600 focus:outline-none"
                        >
                          <FaTrashAlt size="13" />
                          Delete Trainer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AllTrainersTable.propTypes = {
  trainers: PropTypes.array,
  refetch: PropTypes.func,
};

export default AllTrainersTable;

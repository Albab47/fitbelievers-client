import PropTypes from "prop-types";
import { IoMdEye } from "react-icons/io";

const ActivityLogTable = ({ users, handleShow }) => {

  return (
    <section className="container px-4 mx-auto">
      {/* table heading */}
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          User activity
        </h2>
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
                      Applicant
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                    >
                      Status
                    </th>

                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {users?.map((user) => (
                    <tr key={user._id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                          {user.email}
                        </p>
                      </td>
                      <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                          <h2 className="text-sm font-normal text-emerald-500">
                            {user.status}
                          </h2>
                        </div>
                      </td>

                      <td className="p-1 text-sm whitespace-nowrap">
                        <button
                          onClick={() => handleShow(user?.email)}
                          className="border bg-gray-100 p-2 rounded-lg flex gap-1 items-center text-gray-500 transition-colors duration-200 dark:hover:text-dark dark:text-gray-300 hover:bg-primary focus:outline-none"
                        >
                          <IoMdEye className="size-4" />
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

ActivityLogTable.propTypes = {
  users: PropTypes.array,
  handleShow: PropTypes.func,
};

export default ActivityLogTable;

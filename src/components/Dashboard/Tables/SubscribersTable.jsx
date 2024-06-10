import { BiDetail } from "react-icons/bi";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const SubscribersTable = ({ subscribers }) => {
  return (
    <section className="container px-4 mx-auto">
      {/* table heading */}
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Newsletter Subscribers list
        </h2>

        <span className="px-3 py-1 text-xs text-lime-600 bg-primary/15 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {subscribers?.length} subscribers
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
                      className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Email Address
                    </th>

                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {subscribers?.map((subscriber) => (
                    <tr key={subscriber._id}>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {subscriber.name}
                      </td>

                      <td className="px-4 py-4 text-sm text-left text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {subscriber.email}
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

SubscribersTable.propTypes = {
    subscribers: PropTypes.array,
};

export default SubscribersTable;

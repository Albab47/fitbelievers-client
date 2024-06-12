import React from "react";

const PaymentsTable = ({ payments }) => {
  return (
    <section className="">
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
                      Package
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Amount
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      Date
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400"
                    >
                      TransactionId
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {payments?.map((payment) => (
                    <tr key={payment._id}>
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {payment.packageName}
                      </td>

                      <td className="px-4 py-4 text-sm text-left text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        ${payment.price}
                      </td>

                      <td className="px-4 py-4 text-sm text-left text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 text-sm text-left text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {payment.transactionId}
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

export default PaymentsTable;

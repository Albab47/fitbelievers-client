import { FaCircleCheck } from "react-icons/fa6";
import PropTypes from "prop-types"; 

const PackageTable = ({onPackageSelection, packageSelection}) => {
    
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8 lg:-mx-4 lg:flex-row lg:items-stretch lg:space-y-0">
          {/* Basic */}
          <div onClick={() => onPackageSelection('Basic')} className="w-full px-6 py-4 transition-colors duration-300 transform rounded-lg md:mx-5 md:w-96 bg-gray-50 dark:bg-gray-800">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Basic
              </p>
              <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">
                $10
              </h4>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                /per month
              </p>
            </div>

            <div className="mt-8 space-y-8">
              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Gym access during regular hours
                </span>
              </div>

              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Cardio and strength equipment
                </span>
              </div>

              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Locker rooms and showers facilities
                </span>
              </div>
            </div>

            <button className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-dark capitalize transition-colors duration-300 transform bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:bg-primary/90">
              {packageSelection === "Basic" ?  "Basic Selected" : "Choose Basic" }
            </button>
          </div>

          {/* Standard */}
          <div onClick={() => onPackageSelection('Standard')} className="w-full px-6 py-4 transition-colors duration-300 transform rounded-lg md:mx-5 md:w-96 bg-gray-50 dark:bg-gray-800">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Standard
              </p>
              <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">
                $20
              </h4>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                /per month
              </p>
            </div>

            <div className="mt-8 space-y-8">
              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Includes all Basic benefits
                </span>
              </div>

              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Group fitness classes (yoga, spinning)
                </span>
              </div>

              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Sauna or steam room access
                </span>
              </div>
            </div>

            <button className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-dark capitalize transition-colors duration-300 transform bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:bg-primary/90">
              {packageSelection === "Standard" ?  "Standard Selected" : "Choose Standard" }
            </button>
          </div>

          {/* Premium */}
          <div onClick={() => onPackageSelection("Premium")} className="w-full px-6 py-4 transition-colors duration-300 transform rounded-lg md:mx-5 md:w-96 bg-gray-50 dark:bg-gray-800">
            <div className="text-center">
              <p className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                Premium
              </p>
              <h4 className="mt-2 text-4xl font-semibold text-gray-800 dark:text-gray-100">
                $50
              </h4>
              <p className="mt-4 text-gray-500 dark:text-gray-300">
                /per month
              </p>
            </div>

            <div className="mt-8 space-y-8">
              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  ncludes all Standard benefits
                </span>
              </div>

              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Personal training sessions
                </span>
              </div>

              <div className="flex items-center">
                <FaCircleCheck className="text-green-400" />

                <span className="mx-4 text-gray-700 dark:text-gray-300">
                  Discounts on massage, nutrition counseling
                </span>
              </div>
            </div>

            <button className="w-full px-4 py-2 mt-10 font-medium tracking-wide text-dark capitalize transition-colors duration-300 transform bg-primary rounded-md hover:bg-primary/90 focus:outline-none focus:bg-primary/90">
              {packageSelection === "Premium" ?  "Premium Selected" : "Choose Premium" }
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

PackageTable.propTypes = {
  onPackageSelection: PropTypes.func,
  packageSelection: PropTypes.string,
};

export default PackageTable;

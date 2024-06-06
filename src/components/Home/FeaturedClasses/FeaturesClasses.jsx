import SectionTitle from "../../Shared/SectionTitle/SectionTitle";
import FeaturedClass from "./FeaturedClass";

const FeaturesClasses = ({classes}) => {
  
  return (
    <section className="bg-white dark:bg-gray-900 my-28">
      <div className="container 2xl:px-36">
        <SectionTitle heading="Our Popular Classes" subHeading="most booked" />

        {/* grid container */}
        <div className="py-8 md:py-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classes.map((classData) => (
            <FeaturedClass key={classData._id} classData={classData} />
          ))}
        </div>
      </div>
    </section>
  );
};

import PropTypes from "prop-types"; 

FeaturesClasses.propTypes = {
  classes: PropTypes.array,
};

export default FeaturesClasses;

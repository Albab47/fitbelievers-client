import PropTypes from "prop-types";

const SectionTitle = ({heading, subHeading}) => {
  return (
    <div className="mt-6 flex justify-center">
      <div>
        <span className="block mb-4 text-lg text-center font-semibold text-primary">
          {subHeading}
        </span>
        <h1 className="text-4xl sm:text-5xl font-display text-center text-gray-800 capitalize lg:text-6xl dark:text-white">
          {heading}
        </h1>

        <div className="flex justify-center mx-auto mt-6">
          <span className="inline-block w-40 h-1 bg-primary rounded-full"></span>
          <span className="inline-block w-3 h-1 mx-1 bg-primary rounded-full"></span>
          <span className="inline-block w-1 h-1 bg-primary rounded-full"></span>
        </div>
      </div>
    </div>
  );
};

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string,
  };


export default SectionTitle;

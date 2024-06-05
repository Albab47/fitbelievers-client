import { RingLoader } from "react-spinners";
import PropTypes from "prop-types";

const SecondaryLoader = ({ size = 40 }) => {
  return (
    <div className="h-screen flex justify-center items-center">
      <RingLoader
        color="#a3e635"
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

SecondaryLoader.propTypes = {
  size: PropTypes.number,
};

export default SecondaryLoader;

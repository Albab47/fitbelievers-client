import PropTypes from "prop-types";
import { BarLoader } from "react-spinners";
import Logo from "../Logo/Logo";

const Loader = ({ width = 100, height = 5 }) => {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <Logo />
      <BarLoader
        color="#a3e635"
        width={width}
        height={height}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

Loader.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Loader;

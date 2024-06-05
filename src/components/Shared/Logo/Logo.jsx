import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Logo = ({expended = true}) => {
  return (
    <Link to="/" className="flex text-teal-600" href="#">
      <img src={logo} className={`mr-2 h-7 sm:h-8"`} alt="Flowbite React Logo" />
      <span className={`self-center overflow-hidden transition-all ${expended ? "w-32" : "w-0"} text-white/90 font-display whitespace-nowrap text-3xl dark:text-white`}>
        Fit<span className="text-lime-400">Believers</span>
      </span>
    </Link>
  );
};

export default Logo;

import PropTypes from "prop-types"; 

Logo.propTypes = {
  expended: PropTypes.bool,
};
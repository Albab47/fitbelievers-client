import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";

const Logo = ({expended = true, blackLogo=true}) => {
  return (
    <Link to="/" className="flex items-center">
      <img src={logo} className={`mr-2 h-7 -mt-1 sm:h-8"`} alt="fitBelievers Logo" />
      <span className={`self-center ${blackLogo ? "text-dark" : "text-white/90" } overflow-hidden transition-all ${expended ? "w-32" : "w-0"} font-display whitespace-nowrap text-3xl dark:text-white`}>
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
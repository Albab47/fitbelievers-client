import PropTypes from "prop-types"; 

const ErrorMsg = ({children}) => {
  return (
    <small className="mt-2 text-red-600 dark:text-red-500">
      {children}
    </small>
  );
};

ErrorMsg.propTypes = {
  children: PropTypes.node,
};

export default ErrorMsg;
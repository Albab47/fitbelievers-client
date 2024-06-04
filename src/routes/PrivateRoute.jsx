import PropTypes from "prop-types"; 
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Shared/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  const location = useLocation()

  if(loading) {
    return <Loader />
  }

  if (currentUser) {
    return children;
  }

  return <Navigate to={'/login'} state={{from: location}} replace></Navigate>;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
import PropTypes from "prop-types"; 
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Shared/Loader/Loader";
import useRole from "../hooks/useRole";

const TrainersRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const {role, isLoading: roleLoading} = useRole();

  if(loading || roleLoading) return <Loader />;

  if (user && role === "trainer") {
    return children;
  }

  return <Navigate to='/dashboard'></Navigate>;
};

TrainersRoute.propTypes = {
  children: PropTypes.node,
};

export default TrainersRoute;
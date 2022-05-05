import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { LOCAL_STORAGE_TODOS_APP } from "../utils/constants";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem(LOCAL_STORAGE_TODOS_APP);
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;

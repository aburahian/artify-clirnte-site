import { Navigate } from "react-router";
import useAuth from "../Hook/useAuth";


const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate state={location?.pathname} to="/auth"></Navigate>;
  }

  return children;
};

export default PrivateRoute;

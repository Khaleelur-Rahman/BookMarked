import { Navigate, Outlet, Route } from "react-router-dom";
import { routeConstants } from "../constants/routeConstants";
import useUserLoggedIn from "../hooks/custom-hooks/useUserLoggedIn";

const PrivateRoutes = () => {
  const auth = useUserLoggedIn();

  return auth ? (
    <Outlet />
  ) : (
    <Navigate to={routeConstants.LOGIN.path} replace />
  );
};

export default PrivateRoutes;

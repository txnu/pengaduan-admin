import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthRouteProps {
  children: ReactNode; // Explicitly define the type for children
  isAuthenticated: boolean; // Explicitly define the type for isAuthenticated
}

const AuthRoute = ({ children, isAuthenticated }: AuthRouteProps) => {
  return isAuthenticated ? <>{children}</> : <Navigate to="/sign-in" />;
};

export default AuthRoute;

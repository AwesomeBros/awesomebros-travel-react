import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionStore } from "../lib/stores/session";

interface Props {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = "/login" }: Props) => {
  const { isAuthenticated } = useSessionStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

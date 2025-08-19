import { Loader } from "@/components/shared/loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionStore } from "../lib/stores/session";

interface Props {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = "/login" }: Props) => {
  const { isAuthenticated, isLoading } = useSessionStore();
  const location = useLocation();

  if (!isAuthenticated && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated && !isLoading) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionStore } from "../lib/stores/session";

interface Props {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = "/login" }: Props) => {
  const { session, isLoading } = useSessionStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

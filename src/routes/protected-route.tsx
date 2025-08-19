import { Loader } from "@/components/shared/loader";
import { useAuthOpenStore } from "@/lib/stores";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSessionStore } from "../lib/stores/session";

interface Props {
  redirectTo?: string;
}

export const ProtectedRoute = ({ redirectTo = "/" }: Props) => {
  // ✅ 기본값을 "/"로 변경
  const { isAuthenticated, isLoading } = useSessionStore();
  const { onOpen, setType } = useAuthOpenStore();
  const location = useLocation();

  if (!isAuthenticated && isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  if (!isAuthenticated && !isLoading) {
    setType("login");
    onOpen();
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location, openLoginModal: true }}
        replace
      />
    );
  }

  return (
    <>
      <Outlet />
    </>
  );
};

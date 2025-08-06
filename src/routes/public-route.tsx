import { Navigate, Outlet } from "react-router-dom";
import { useSessionStore } from "../lib/stores/session";

interface Props {
  redirectTo?: string;
}

export const PublicRoute = ({ redirectTo = "/" }: Props) => {
  const { session } = useSessionStore();

  if (session) {
    return <Navigate to={redirectTo} replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

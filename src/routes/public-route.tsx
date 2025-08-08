import { Outlet } from "react-router-dom";

interface Props {
  redirectTo?: string;
}

export const PublicRoute = ({ redirectTo = "/" }: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

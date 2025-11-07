import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRouter({ user, redirect = "/" }) {
  if (!user) return <Navigate to={redirect} />;
  return <Outlet />;
}

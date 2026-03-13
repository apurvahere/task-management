import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import type { JSX } from "react";
import Layout from "./Layout";

interface ProtectedRouteProps {
  children: JSX.Element;
}
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuth) return <Navigate to="/login" />;

  return <Layout>{children}</Layout>;
}

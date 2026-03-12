import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../../app/store";
import type { JSX } from "react";
import Layout from "./Layout";

export default function ProtectedRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuth) return <Navigate to="/login" />;

  return <Layout>{children}</Layout>;
}

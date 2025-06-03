import { Navigate, Outlet } from "react-router-dom";

export const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login-register" replace />;
  }

  if (role !== "admin") {
    return <Navigate to="/main-screen" replace />;
  }

  return <Outlet />;
};

export const UserRoute = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login-register" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

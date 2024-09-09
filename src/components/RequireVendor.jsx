import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireVendor({ children }) {
  const { vendor } = useAuth();
  if (!vendor) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireVendor;

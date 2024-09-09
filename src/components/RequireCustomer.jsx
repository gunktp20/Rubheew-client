import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireVendor({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireVendor;

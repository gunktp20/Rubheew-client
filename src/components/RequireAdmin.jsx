import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireCustomer({ children }) {
  const { admin } = useAuth();
  if (!admin) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireCustomer;

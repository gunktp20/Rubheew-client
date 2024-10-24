import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RequireRider({ children }) {
  const { rider } = useAuth();
  if (!rider) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default RequireRider;

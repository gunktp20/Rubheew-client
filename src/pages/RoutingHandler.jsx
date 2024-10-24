import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function RoutingHandler({ children }) {
  const { customer, vendor, rider } = useAuth();
  if (!customer) {
    return <Navigate to="/vendors" replace />;
  }
  if (!vendor) {
    return <Navigate to="/vendor/menu/management" replace />;
  }
  if (!rider) {
    return <Navigate to="/rider/orders" replace />;
  }

  return children;
}

export default RoutingHandler;

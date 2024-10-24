import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const localUser = localStorage.getItem("user");
const localToken = localStorage.getItem("token");
const localVendor = localStorage.getItem("vendor");
const localCustomer = localStorage.getItem("customer");
const localRider = localStorage.getItem("rider");
const localAdmin = localStorage.getItem("admin");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null);
  const [vendor, setVendor] = useState(
    localVendor ? JSON.parse(localVendor) : null
  );
  const [admin, setAdmin] = useState(
    localAdmin ? JSON.parse(localAdmin) : null
  );
  const [rider, setRider] = useState(
    localRider ? JSON.parse(localRider) : null
  );
  const [cartItemsNumber, setCartItemsNumber] = useState(0);
  const [orderItemsNumber, setOrderItemsNumber] = useState(0);
  const [customer, setCustomer] = useState(
    localCustomer ? JSON.parse(localCustomer) : null
  );
  const [token, setToken] = useState(localToken ? localToken : null);

  const setCredentials = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const setVendorCredentials = (token, vendor) => {
    localStorage.setItem("token", token);
    localStorage.setItem("vendor", JSON.stringify(vendor));
    setToken(token);
    setVendor(vendor);
  };

  const setCustomerCredentials = (token, customer) => {
    localStorage.setItem("token", token);
    localStorage.setItem("customer", JSON.stringify(customer));
    setToken(token);
    setCustomer(customer);
  };

  const setRiderCredentials = (token, rider) => {
    localStorage.setItem("token", token);
    localStorage.setItem("rider", JSON.stringify(rider));
    setToken(token);
    setRider(rider);
  };

  const setAdminCredentials = (token, admin) => {
    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(admin));
    setToken(token);
    setAdmin(admin);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("vendor");
    localStorage.removeItem("customer");
    localStorage.removeItem("user");
    localStorage.removeItem("rider");
    localStorage.removeItem("admin");
    setToken(null);
    setVendor(null);
    setCustomer(null);
    setUser(null);
    setAdmin(null);
    setRider(null);
  };

  return (
    <AuthContext.Provider
      value={{
        rider,
        token,
        user,
        vendor,
        customer,
        admin,
        setCredentials,
        setVendorCredentials,
        setCustomerCredentials,
        logout,
        cartItemsNumber,
        orderItemsNumber,
        setOrderItemsNumber,
        setCartItemsNumber,
        setRiderCredentials,
        setAdminCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// สร้าง hook สำหรับการใช้งาน context
export const useAuth = () => useContext(AuthContext);

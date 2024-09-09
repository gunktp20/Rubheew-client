import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

const localUser = localStorage.getItem("user")
const localToken = localStorage.getItem("token")
const localVendor = localStorage.getItem("vendor")

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localUser ? JSON.parse(localUser) : null);
  const [vendor, setVendor] = useState(localVendor ? JSON.parse(localVendor) : null);
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

  const logout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("vendor");
    localStorage.removeItem("user");
    setToken(null);
    setVendor(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ token, user, vendor,setCredentials , setVendorCredentials , logout}}>
      {children}
    </AuthContext.Provider>
  );
};

// สร้าง hook สำหรับการใช้งาน context
export const useAuth = () => useContext(AuthContext);

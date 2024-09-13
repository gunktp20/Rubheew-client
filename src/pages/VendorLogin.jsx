import { useEffect, useState } from "react";
import api from "../service/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function VendorLogin() {
  const { token , setVendorCredentials } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    setError("");
    setSuccess("");
    if (!username || !password) {
      return setError("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    try {
      const { data } = await api.post("/vendor/login", {
        username,
        password,
      });
      setVendorCredentials(data.token, data.vendor);
      navigate("/vendor/menu/management");
    } catch (err) {
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center">
        <Navbar/>
        <div className="flex flex-col justify-center items-center w-[400px] bg-purple-50 gap-3 p-5 border-[2px]">
        <div className="text-xl">เข้าสู่ระบบ ร้านค้า</div>

        {success && (
          <div className="bg-green-50 text-sm border-green-200 rounded-md px-2 border-[1px] w-[100%] py-2 text-green-700">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-sm border-red-200 rounded-md px-2 border-[1px] w-[100%] py-2 text-red-700">
            {error}
          </div>
        )}

        <input
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          name="username"
          className="w-[100%] h-[32px] pl-2"
        ></input>
        <input
          placeholder="รหัสผ่าน"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          className="w-[100%] h-[32px] pl-2"
        ></input>

        <button
          onClick={login}
          className="bg-purple-300 text-white w-[100%] h-[32px]"
        >
          เข้าสู่ระบบ
        </button>
        <NavLink to="/vendor/register">สลับไป สมัครสมาชิก</NavLink>
      </div>
    </div>
  );
}

export default VendorLogin;
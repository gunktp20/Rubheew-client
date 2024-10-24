import { useState, useEffect } from "react";
import api from "../service/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Dialogg from "../components/Dialog";
import wallpaper from "../assets/images/wall.jpg"

function AdminLogin() {
  const { setAdminCredentials, token } = useAuth();

  const [error, setError] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    setError("");
    if (!username || !password) {
      return setError("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    try {
      const { data } = await api.post("/admin/login", {
        username,
        password,
      });
      console.log(data);
      setAdminCredentials(data.token, data.admin);
      // setCredentials(data.token, data.user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, []);
  const [dialog, setDialog] = useState(false);

  return (
    <div className="flex flex-col items-center h-[100vh] bg-[#fcfcf9]">
      {/* <div className="w-[100%] h-[100%] flex absolute ">
        <div className="bg-[#000000ab] w-[100%] h-[100%] absolute"></div>
        <img
          src={wallpaper}
          className="w-[100%] h-[100%] object-cover object-top"
        ></img>
      </div> */}
      <Navbar open={dialog} setOpen={setDialog} />
      <Dialogg open={dialog} setOpen={setDialog} />
      <div className="z-[10] flex flex-col justify-center items-center w-[430px] bg-white gap-3 p-5 border-[1px] shadow-sm rounded-sm">
        <div className="text-xl">ลงชื่อเข้าใช้ ผู้ดูแล</div>
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
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <input
          placeholder="รหัสผ่าน"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>

        <div className="flex items-center w-[100%]">
          <input
            type="checkbox"
            id="showPassword"
            className="h-4 w-4 rounded text-red-500 focus:ring-0 bg-[#f54749]"
            checked={showPassword}
            onChange={togglePassword}
          />
          <label htmlFor="showPassword" className="ml-2 text-sm text-gray-700">
            แสดงรหัสผ่าน
          </label>
        </div>

        <button
          onClick={login}
          className="bg-[#f54749] text-white w-[100%] h-[32px]"
        >
          เข้าสู่ระบบ
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;

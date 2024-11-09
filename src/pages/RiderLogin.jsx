import { useState, useEffect } from "react";
import api from "../service/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Dialogg from "../components/Dialog";
import wallpaper from "../assets/images/wall.jpg";

import Footer from "../components/Footer"
import handGripSmartphone from "../assets/images/hands-grip-smartphone-food-delivery-app-open-food-containers-hands-grip-smartphone-food-delivery-app-open-food-339865821.webp"

function RiderLogin() {
  const { setRiderCredentials, setCredentials, token } = useAuth();

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
      const { data } = await api.post("/rider/login", {
        username,
        password,
      });
      console.log(data);
      setRiderCredentials(data.token, data.rider);
      setCredentials(data.token, data.rider);
      navigate("/rider/orders");
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

      <div className="flex h-[530px] bg-red-500 rounded-md overflow-hidden sm:h-fit">
        <div className="flex relative items-center justify-center sm:hidden">
          <div className="bg-[#00000095] absolute w-[100%] h-[100%]"></div>
          <div className="text-white absolute w-[330px]">
            <div className="text-2xl">ยินดีต้อนรับเข้าสู่ Rubheew</div>
            <div className="text-sm mt-3">แพลตฟอร์มให้บริการจัดส่งอาหาร สำหรับทั้ง ลูกค้าและ ผู้ประกอบการ</div>
          </div>
          <img src={handGripSmartphone} className="w-[400px] object-cover"></img>
        </div>
        <div className="z-[10] flex flex-col items-center w-[430px] bg-white gap-3 p-5 border-[1px] shadow-sm rounded-sm pt-10">
          <div className="text-xl">ลงชื่อเข้าใช้ คนขับ</div>
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
          <div className="flex items-center gap-2 text-sm">
            <div>หากคุณยังไม่มีบัญชี</div>
            <NavLink to="/rider/register" className="text-sm text-[#f54749]">
              สมัครสมาชิก
            </NavLink>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
}

export default RiderLogin;

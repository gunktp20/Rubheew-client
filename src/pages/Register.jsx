import { useEffect, useState } from "react";
import api from "../service/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Dialogg from "../components/Dialog";
import wallpaper from "../assets/images/wall.jpg"

function Register() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone_number, setPhone_Number] = useState("");

  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    setError("");
    setSuccess("");
    setIsLoading(true);
    if (!username || !password || !email) {
      return setError("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    if (password !== confirmPassword) {
      return setError("ยืนยันรหัสผ่าน ต้องตรงกับ รหัสผ่าน");
    }

    try {
      // ประมวล 5 วิ
      const { data } = await api.post("/customer/register", {
        username,
        email,
        password,
        fname,
        lname,
        phone_number,
      });

      console.log(data);
      setSuccess("สมัครสมาชิกเสร็จสิ้น กรุณายืนยันตัวตนในเมลล์ของคุณ");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data?.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      return navigate("/");
    }
  }, []);

  const [dialog, setDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
      <div className="flex flex-col justify-center items-center w-[430px] bg-white gap-3 p-5 border-[1px] shadow-sm rounded-sm z-[10]">
        <div className="text-xl">สมัครสมาชิก</div>

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
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>

        <input
          placeholder="อีเมลล์"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>

        <input
          placeholder="ชื่อจริง"
          value={fname}
          onChange={(e) => {
            setFname(e.target.value);
          }}
          name="email"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <input
          placeholder="นามสกุล"
          value={lname}
          onChange={(e) => {
            setLname(e.target.value);
          }}
          name="email"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <input
          placeholder="เบอร์ติดต่อ"
          value={phone_number}
          onChange={(e) => {
            setPhone_Number(e.target.value);
          }}
          name="phone_number"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <input
          placeholder="รหัสผ่าน"
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <input
          placeholder="ยืนยันรหัสผ่าน"
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
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
          onClick={register}
          disabled={isLoading}
          className="bg-[#f54749] text-white w-[100%] h-[32px] flex justify-center items-center"
        >
          {isLoading ? (
            <div className="loader w-[20px] h-[20px]"></div>
          ) : (
            "สมัครสมาชิก"
          )}
        </button>
        <NavLink to="/login" className="text-sm">
          สลับไป เข้าสู่ระบบ
        </NavLink>
      </div>
    </div>
  );
}

export default Register;

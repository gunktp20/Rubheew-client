import { useEffect, useState } from "react";
import api from "../service/api";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Dialogg from "../components/Dialog";
import wallpaper from "../assets/images/wall.jpg"

import Footer from "../components/Footer"
import handGripSmartphone from "../assets/images/hands-grip-smartphone-food-delivery-app-open-food-containers-hands-grip-smartphone-food-delivery-app-open-food-339865821.webp"

function VendorRegister() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [username, setUsername] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [promptPay, setPromptPay] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const register = async () => {
    setError("");
    setSuccess("");
    if (
      !username ||
      !password ||
      !vendorName ||
      !phoneNumber ||
      !confirmPassword ||
      !promptPay ||
      !selectedFile
    ) {
      return setError("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
    if (password !== confirmPassword) {
      return setError("ยืนยันรหัสผ่าน ต้องตรงกับ รหัสผ่าน");
    }
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("vendor_name", vendorName);
    formData.append("phone_number", phoneNumber);
    formData.append("prompt_pay", promptPay);
    formData.append("image", selectedFile);

    try {
      const { data } = await api.post("/vendor/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      setSuccess("สมัครสมาชิกเสร็จสิ้น");
    } catch (err) {
      console.log(err);
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
    // เช็คว่ามีไฟล์หรือไม่
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
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
    <div className="h-[100vh] flex flex-col items-center bg-[#fcfcf9] sm:h-[100%]">
      {/* <div className="w-[100%] h-[100%] flex absolute ">
        <div className="bg-[#000000ab] w-[100%] h-[100%] absolute"></div>
        <img
          src={wallpaper}
          className="w-[100%] h-[100%] object-cover object-top"
        ></img>
      </div> */}

      <Navbar setOpen={setDialog} open={dialog} />
      <Dialogg setOpen={setDialog} open={dialog} />

      <div className="flex h-[530px] bg-red-500 rounded-md overflow-hidden sm:h-fit">
        <div className="flex relative items-center justify-center sm:hidden">
          <div className="bg-[#00000095] absolute w-[100%] h-[100%]"></div>
          <div className="text-white absolute w-[330px]">
            <div className="text-2xl">ยินดีต้อนรับเข้าสู่ Rubheew</div>
            <div className="text-sm mt-3">แพลตฟอร์มให้บริการจัดส่งอาหาร สำหรับทั้ง ลูกค้าและ ผู้ประกอบการ</div>
          </div>
          <img src={handGripSmartphone} className="w-[400px] object-cover"></img>
        </div>
        <div className="z-[10] flex flex-col justify-center items-center w-[430px] bg-white gap-3 p-5 border-[1px] shadow-sm rounded-sm">
          <div className="text-xl">สมัครสมาชิกร้านค้า</div>

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
            placeholder="ชื่อร้านค้า"
            value={vendorName}
            onChange={(e) => {
              setVendorName(e.target.value);
            }}
            name="vendor_name"
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
          <input
            placeholder="เบอร์โทรศัพท์"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            name="phone_number"
            className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
          ></input>
          <input
            placeholder="หมายเลขพร้อมเพย์"
            value={promptPay}
            onChange={(e) => {
              setPromptPay(e.target.value);
            }}
            name="promptPay"
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

          <div class="grid w-full items-center gap-4 mt-2">
            <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              อัพโหลดรูปภาพ Banner ร้านของคุณ
            </label>
            <input
              class="flex w-full rounded-md border border-[#f54749] border-input bg-white text-sm text-gray-400 file:border-0 file:bg-[#f54749] file:text-white file:text-sm file:font-medium"
              type="file"
              id="picture"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {preview && (
            <div>
              <h3 className="text-sm mb-2">รูปภาพปัจจุบัน</h3>
              <img
                src={`${preview}`}
                alt="Preview"
                style={{ maxWidth: "300px", maxHeight: "300px" }}
              />
            </div>
          )}

          <button
            onClick={register}
            className="bg-[#f54749] text-white w-[100%] h-[32px]"
          >
            สมัครสมาชิก
          </button>

          <div className="flex items-center gap-2 text-sm">
            <div>หากคุณมีบัญชีร้านค้า</div>
            <NavLink to="/vendor/login" className="text-sm text-[#f54749]">
              เข้าสู่ระบบ
            </NavLink>
          </div>

        </div>
      </div>

      <Footer position={"relaitve"}/>
    </div>
  );
}

export default VendorRegister;

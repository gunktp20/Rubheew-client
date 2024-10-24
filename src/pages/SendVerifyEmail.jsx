import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import api from "../service/api";
import { BiError } from "react-icons/bi";
import { FaRegCheckCircle } from "react-icons/fa";

function SendVerifyEmail() {
  const { token } = useParams();
  const [status, setStatus] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const verifyEmail = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.get("/customer/verify-email/" + token);
      console.log(data);
      setStatus("success");
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setStatus("error");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    verifyEmail();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[100vh] w-[100%] flex ">
        <div className="flex justify-center items-center gap-6 w-[100%] h-[100%] flex-col">
          <div className="loader"></div>
          <div className="text-[#303030] text-[20px]">
            กำลังประมวลผลคำขอของคุณ
          </div>
          <div className="text-[#838383]">กรุณารอสักครู่...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100vh] w-[100%] flex flex-col items-center justify-center">
      {/* <img
          src={status === "success" ? verified_success : verify_error}
          className="w-[400px] h-[400px]"
        /> */}
      {status === "error" ? <BiError className="text-[40px] mb-4 text-[#c2393b]" /> : <FaRegCheckCircle className="text-[40px] mb-4 text-[#c2393b]" />}
      <div className="text-[#838383]" id="alert-execution">
        {status === "success"
          ? "ขอขอบคุณที่ไว้วางใจและเลือกใช้แพลตฟอร์มของเรา"
          : "มีข้อผิดพลาด โปรดลองอีกครั้ง"}
      </div>
      <div className="mt-8">
        <Link
          to="/"
          id="back-to-home-btn"
          className="px-9 py-2 text-[#f54749] capitalize rounded-md border-[#f54749] border-[2px] hover:bg-[#f54749] hover:text-white"
        >
          กลับไปหน้าหลัก
        </Link>
      </div>
    </div>
  );
}

export default SendVerifyEmail;

import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NavbarVendor from "../components/NavbarVendor";
import VendorDialog from "../components/VendorDialog";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminDialog from "../components/AdminDialog";

function AdminInsertDestination() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [destination_name, setDestinationName] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");

  const [dialog, setDialog] = useState(false);

  const navigate = useNavigate();

  const insertDestination = async () => {
    if (!destination_name) {
      return setError("กรุณากรอกชื่อปลายทาง");
    }
    if (!lat) {
      return setError("กรุณากรอก ละติจูด Lat");
    }
    if (!lng) {
      return setError("กรุณากรอก ลองจิจูด Lng");
    }
    setError("");
    setSuccess("");
    try {
      const { data } = await api.post(
        "/destination/",
        {
          destination_name,
          lat,
          lng,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      navigate("/admin/destinations");
    } catch (err) {
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#fcfcf9] h-[100vh]">
      <AdminDialog open={dialog} setOpen={setDialog} />
      <NavbarAdmin open={dialog} setOpen={setDialog} />
      <div className="flex flex-col justify-center items-center w-[430px] bg-[#fff] gap-2 p-5 border-[1px] shadow-sm rounded-sm">
        <div className="text-xl">เพิ่มปลายทางของคุณ</div>

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

        <div className="flex flex-col w-[100%]">
          <div className="text-[13px] text-gray-500 flex justify-start w-[100%]">
            ชื่อปลายทาง
          </div>
          <input
            placeholder="ชื่อปลายทางของคุณเช่น ชื่อหอพัก สถานที่ อื่นๆ"
            value={destination_name}
            onChange={(e) => {
              setDestinationName(e.target.value);
            }}
            name="destination_name"
            className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
          ></input>
        </div>
        {/* ละติจูด Lat */}
        <div className="flex flex-col w-[100%]">
          <div className="text-[13px] text-gray-500 flex justify-start w-[100%]">
            ละติจูด Lat
          </div>
          <input
            placeholder="lat"
            value={lat}
            onChange={(e) => {
              setLat(e.target.value);
            }}
            name="lat"
            className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
          ></input>
        </div>
        {/* 	ลองจิจูด Lng */}
        <div className="flex flex-col w-[100%]">
          <div className="text-[13px] text-gray-500 flex justify-start w-[100%]">
            ลองจิจูด Lng
          </div>
          <input
            placeholder="lng"
            value={lng}
            onChange={(e) => {
              setLng(e.target.value);
            }}
            name="lng"
            className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
          ></input>
        </div>
        {/* บันทึก */}
        <button
          onClick={insertDestination}
          className="bg-[#f54749] mt-1 text-white w-[100%] h-[32px]"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}

export default AdminInsertDestination;

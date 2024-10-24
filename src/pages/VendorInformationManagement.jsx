import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NavbarVendor from "../components/NavbarVendor";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Swal from "sweetalert2";
import VendorDialog from "../components/VendorDialog";

function VendorInformationManagement() {
  const { token, vendor } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [vendorInfo, setVendorInfo] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [newPromptPay, setNewPromptPay] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const navigate = useNavigate();

  const updateVendorInfo = async () => {
    setError("");
    setSuccess("");

    try {
      const { data } = await api.put(
        "/vendor/",
        {
          phone_number: newPhoneNumber,
          description: newDescription,
          prompt_pay: newPromptPay,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getVendorInfo();
      setSuccess(data.msg);
    } catch (err) {
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  const getVendorInfo = async () => {
    try {
      const { data } = await api.get("/vendor/" + vendor?.id);
      console.log(data);
      setVendorInfo(data);
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
    getVendorInfo();
  }, []);

  const [dialog, setDialog] = useState(false);

  return (
    <div className="flex flex-col items-center bg-[#fcfcf9] h-[100vh]">
      <VendorDialog open={dialog} setOpen={setDialog} />
      <NavbarVendor open={dialog} setOpen={setDialog} />
      <div className="flex flex-col justify-center items-center w-[400px] bg-[#fff] gap-3 p-5 border-[1px] shadow-sm rounded-sm">
        <div className="text-xl mb-2">ข้อมูลร้านค้า</div>

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

        <div className="flex w-[100%]">
          <div className="flex justify-between w-[100%] text-sm">
            <div>ชื่อร้าน </div> <div>{vendorInfo?.vendor_name}</div>
          </div>
        </div>
        <div className="flex w-[100%]">
          <div className="flex justify-between w-[100%] text-sm">
            <div>เบอร์ติดต่อ </div> <div>{vendorInfo?.phone_number}</div>
          </div>
        </div>
        <div className="flex w-[100%]">
          <div className="flex justify-between w-[100%] text-sm">
            <div>เลขพร้อมเพย์ </div> <div>{vendorInfo?.prompt_pay}</div>
          </div>
        </div>
        <div className="w-[100%] bg-gray-200 h-[1px] mt-4 mb-3"></div>
        <div className="flex w-[100%] flex-col">
          <div className="flex justify-between mb-2 w-[100%] text-sm">
            <div>รายละเอียดข่าวสาร เวลา เปิด/ปิด</div>
          </div>
          <input
            readOnly
            value={vendorInfo?.description}
            className="mb-3 text-sm w-[100%] h-[32px] pl-2 rounded-sm bg-[#00000007]"
          ></input>
        </div>

        <input
          placeholder="เบอร์ติดต่อใหม่"
          value={newPhoneNumber}
          onChange={(e) => {
            setNewPhoneNumber(e.target.value);
          }}
          name="phoneNumber"
          className="w-[100%] h-[32px] text-sm pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <input
          placeholder="หมายเลข พร้อมเพย์ ใหม่"
          value={newPromptPay}
          onChange={(e) => {
            setNewPromptPay(e.target.value);
          }}
          name="newPromptPay"
          className="w-[100%] h-[32px] text-sm pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <textarea
          onChange={(e) => {
            setNewDescription(e.target.value);
          }}
          value={newDescription}
          className="border-[1px] text-sm w-[100%] border-[#00000031] rounded-sm pl-2"
          placeholder="รายละเอียดข่าวสาร หรือ เวลา เปิด/ปิด"
        ></textarea>

        <button
          onClick={updateVendorInfo}
          disabled={newPhoneNumber && newPromptPay && newDescription}
          className="bg-[#f54749] text-white w-[100%] h-[32px]"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}

export default VendorInformationManagement;

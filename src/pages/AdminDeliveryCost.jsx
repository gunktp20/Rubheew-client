import NavbarVendor from "../components/NavbarVendor";
import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import VendorDialog from "../components/VendorDialog";
import { MdSearchOff } from "react-icons/md";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminDialog from "../components/AdminDialog";
import moment from "moment";
import Footer from "../components/Footer";

function AdminDeliveryCost() {
  // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile
  const [dialog, setDialog] = useState(false);
  const [menus, setMenus] = useState([]);
  const [reports, setReports] = useState([]);
  const [vendorInfo, setVendorInfo] = useState(null);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const { token, vendor } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchDeliveryCost = async () => {
    try {
      const { data } = await api.get("/delivery-cost");
      setDeliveryCost(data);
    } catch (err) {
      console.log(err);
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  const updateShippingFee = async () => {
    setError("");
    setSuccess("");
    try {
      const { data } = await api.put(
        "/delivery-cost",
        {
          shipping_fee: shippingFee,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShippingFee(0);
      setDeliveryCost(data);
      setSuccess("อัพเดทค่าส่งของคุณสำเร็จ");
    } catch (err) {
      console.log(err);
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  const handleUpdateShippingFee = () => {
    if (shippingFee < 0 || shippingFee == null || !shippingFee) {
      return setError("กรุณากรอกค่าส่งของคุณ");
    }
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการจะลบเมนูนี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateShippingFee();
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  useEffect(() => {
    fetchDeliveryCost();
  }, []);

  return (
    <div className="bg-[#fcfcf9] h-[100vh]">
      {/* <VendorDialog open={dialog} setOpen={setDialog}/> */}
      {/* <NavbarVendor open={dialog} setOpen={setDialog}/> */}
      <NavbarAdmin open={dialog} setOpen={setDialog} />
      <AdminDialog open={dialog} setOpen={setDialog} />
      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="sm:w-[100%] p-3">
          {/* start form */}
          <div className="flex flex-col justify-center items-center w-[430px] bg-[#fff] p-5 border-[1px] shadow-sm rounded-sm sm:w-[100%]">
            <div className="text-xl mb-3">จัดการค่าส่ง</div>

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
            {/* <div className="text-[13px] text-gray-500 flex justify-start w-[100%] mb-1 ">
              เลือกผู้ขับสำหรับร้านของคุณ
            </div>
            <select
              value={riderId}
              onChange={(event) => {
                //   setRiderId(event.target.value);
              }}
              className={`mb-3 block h-[32px] w-full pl-2 text-[13.5px] text-gray-900 bg-transparent border-[1px] border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f54749] peer`}
            >
              {riders?.map((rider, index) => {
              return (
                <option key={index} value={rider?.id}>
                  {rider?.fname}-{rider?.lname}
                </option>
              );
            })}
            </select> */}
            <div className="mt-2 text-[13px] text-gray-500 flex justify-start w-[100%] mb-1">
              ค่าส่งปัจจุบัน
            </div>
            <input
              readOnly
              placeholder="ค่าส่ง"
              value={deliveryCost}
              className="mb-3 text-sm w-[100%] h-[32px] pl-2 rounded-sm bg-[#00000007]"
            ></input>
            {/* <div className="text-[13px] text-gray-500 flex justify-start w-[100%] mb-1">
            เบอร์โทรศัพท์ผู้ขับ
          </div>
          <input
            readOnly
            placeholder="เบอร์โทรศัพท์"
            value={riders?.find((r) => r?.id == riderId)?.phone_number}
            className="mb-3 text-sm w-[100%] h-[32px] pl-2 rounded-sm bg-[#00000007]"
          ></input> */}
            <div className="text-[13px] text-gray-500 flex justify-start w-[100%] mb-1">
              อัพเดทค่าส่งของคุณ
            </div>
            <input
              placeholder="อัพเดทค่าส่งของคุณ"
              value={shippingFee}
              onChange={(e) => {
                setShippingFee(e.target.value);
              }}
              name=""
              type="number"
              className="w-[100%] mb-3 text-sm h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
            ></input>

            <button
              onClick={handleUpdateShippingFee}
              className="bg-[#f54749] text-white w-[100%] h-[32px]"
            >
              บันทึกค่าส่ง
            </button>
          </div>
          {/* end */}
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default AdminDeliveryCost;

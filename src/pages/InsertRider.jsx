import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NavbarVendor from "../components/NavbarVendor";
import VendorDialog from "../components/VendorDialog";
import { MdSearchOff } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";

function InsertRider() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [menu_name, setMenuName] = useState("");
  const [riderId, setRiderId] = useState("");
  const [riders, setRiders] = useState([]);
  const [dialog, setDialog] = useState(false);

  const [vendorRider, setVendorRider] = useState(null);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const getRiders = async () => {
    try {
      const { data } = await api.get("/rider");
      setRiderId(data[0]?.id);
      setRiders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const insertRider = async () => {
    setError("");
    setSuccess("");

    if (!riderId) {
      return setError("กรุณาเลือกผู้ขับ");
    }
    try {
      const { data } = await api.put(
        "/vendor/insert/rider",
        { rider_id: riderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      getVendorRider()
      setSuccess("เพิ่มผู้ขับในร้านของคุณ เสร็จสิ้น");
    } catch (err) {
      console.log(err);
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  const getVendorRider = async () => {
    try {
      const { data } = await api.get("/vendor/rider/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setVendorRider(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRider = async () => {
    try {
      const { data } = await api.delete("/rider/" + vendorRider.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setVendorRider(null)
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการนำผู้ขับคนนี้ออกหรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ นำออก!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteRider();
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
    if (!token) {
      return navigate("/");
    }
    getRiders();
    getVendorRider();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#fcfcf9] h-[100vh]">
      <VendorDialog open={dialog} setOpen={setDialog} />
      <NavbarVendor open={dialog} setOpen={setDialog} />
      <div className="flex w-[75%] gap-5 mt-5 md:flex-col sm:flex-col sm:justify-center md:justify-center sm:items-center md:items-center sm:w-[90%] md:w-[90%]">
        {/* form */}
        <div className="flex flex-col justify-center items-center w-[430px] bg-[#fff] p-5 border-[1px] shadow-sm rounded-sm sm:w-[100%]">
          <div className="text-xl mb-3">เพิ่มคนขับของร้าน</div>

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
          <div className="text-[13px] text-gray-500 flex justify-start w-[100%] mb-1 ">
            เลือกผู้ขับสำหรับร้านของคุณ
          </div>
          <select
            value={riderId}
            onChange={(event) => {
              setRiderId(event.target.value);
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
          </select>
          <div className="text-[13px] text-gray-500 flex justify-start w-[100%] mb-1">
            ชื่อผู้ใช้
          </div>
          <input
            readOnly
            placeholder="ชื่อผู้ใช้"
            value={riders?.find((r) => r?.id == riderId)?.username}
            className="mb-3 text-sm w-[100%] h-[32px] pl-2 rounded-sm bg-[#00000007]"
          ></input>
          <div className="text-[13px] text-gray-500 flex justify-start w-[100%] mb-1">
            เบอร์โทรศัพท์ผู้ขับ
          </div>
          <input
            readOnly
            placeholder="เบอร์โทรศัพท์"
            value={riders?.find((r) => r?.id == riderId)?.phone_number}
            className="mb-3 text-sm w-[100%] h-[32px] pl-2 rounded-sm bg-[#00000007]"
          ></input>

          <button
            onClick={insertRider}
            className="bg-[#f54749] text-white w-[100%] h-[32px]"
          >
            เพิ่มผู้ขับ
          </button>
        </div>

        {/* container */}
        {!vendorRider && (
          <div className="w-[100%] flex items-center justify-center bg-[#0000000a] md:py-9 sm:py-9 sm:w-[100%]">
            <div className="flex flex-col justify-center items-center sm:w-[100%]">
              <MdSearchOff className="text-[100px] text-[#00000030]" />
              <div className="text-[#00000030] text-[13px] font-semibold">
                ไม่พบผู้ขับร้านของคุณ
              </div>
            </div>
          </div>
        )}

        {/* end */}

        {/*  */}
        {vendorRider && (
          <div className="bg-[#fff] shadow-sm p-3 w-[100%] md:grid-cols-3 sm:grid-cols-2 relative sm:w-[100%] border-[1px] h-fit">
            {/* close */}
            <div
              className="cursor-pointer absolute right-3"
              onClick={() => {
                handleDelete();
              }}
            >
              <IoClose className="text-lg hover:bg-[#e64345] transition-all rounded-full hover:text-white" />
            </div>
            <div className="flex justify-between">
              <div className="flex flex-col w-[100%]">
                <div className="flex gap-5 text-sm">
                  <div>ชื่อ-นามสกุล</div>
                  <div className="text-[#f54749]">
                    {vendorRider?.fname}-{vendorRider?.lname}
                  </div>
                </div>

                <div className="flex gap-5 text-sm mt-3">
                  <div>ชื่อผู้ใช้</div>
                  <div className="text-[#f54749] ">{vendorRider?.username}</div>
                </div>
                <div className="bg-[#e5e5e5] w-[100%] h-[1px] my-4"></div>
                <div className="flex gap-5 text-sm">
                  <div>เบอร์มือถือ</div>
                  <div className="text-[#f54749]">
                    {vendorRider?.phone_number}
                  </div>
                </div>
              </div>
              <div className="w-[50px]">
                {/* <img src={`http://localhost:5000/image/menu/${m.image}`}></img> */}
              </div>
            </div>

            {/* <div className="flex gap-4 mb-1 text-sm">
            สถานะ{" "}
            <div
              className={`text-sm flex items-center ${
                m.vendor.open ? "text-green-500" : "text-gray-400"
              } `}
            >
              {vendorRider.open ? "เปิดให้บริการ" : "ปิดให้บริการ"}
            </div>
          </div> */}
          </div>
        )}
        {/*  */}
      </div>
    </div>
  );
}

export default InsertRider;

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

function AdminVendorsRegistrations() {
  // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile
  const [dialog, setDialog] = useState(false);
  const [menus, setMenus] = useState([]);
  const [vendorRegistrations, setVendorRegistrations] = useState([]);
  const [vendorInfo, setVendorInfo] = useState(null);
  const { token, vendor } = useAuth();
  const navigate = useNavigate();

  const getVendorInfo = async () => {
    try {
      const { data } = await api.get("/vendor/" + vendor.id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setVendorInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchVendorsRegistration = async () => {
    try {
      const { data } = await api.get("/admin/vendor/registration", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setVendorRegistrations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const rejectVendor = async (vendor_id) => {
    try {
      const { data } = await api.delete(`/admin/${vendor_id}/vendor`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      // setMenus(data.menus);
      fetchVendorsRegistration();
    } catch (err) {
      console.log(err);
    }
  };

  const approveVendor = async (vendor_id) => {
    try {
      const { data } = await api.put(
        `/admin/${vendor_id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      // setMenus(data.menus);
      fetchVendorsRegistration();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการจะ ปฏิเสธ ร้านค้านี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ปฏิเสธ!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          rejectVendor(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  const handleApprove = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการจะ อนุมัติ ร้านค้านี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ อนุมัติ!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          approveVendor(id);
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
    fetchVendorsRegistration();
  }, []);

  return (
    <div className="bg-[#fcfcf9] h-[100vh]">
      {/* <VendorDialog open={dialog} setOpen={setDialog}/> */}
      {/* <NavbarVendor open={dialog} setOpen={setDialog}/> */}
      <NavbarAdmin open={dialog} setOpen={setDialog} />
      <AdminDialog open={dialog} setOpen={setDialog} />
      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-6">การลงเทียนของร้านค้า</div>

        {vendorRegistrations.length == 0 && (
          <div className="mt-7 flex rounded-sm justify-center items-center h-[300px] w-[80%]">
            <div className="flex flex-col justify-center items-center">
              <MdSearchOff className="text-[100px] text-[#00000030]" />
              <div className="text-[#00000030] text-[13px] font-semibold">
                ไม่พบการละทะเบียนร้านค้า
              </div>
            </div>
          </div>
        )}

        <div className="sm:w-[100%]">
          <div className="grid gap-2 grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:flex sm:flex-col items-center justify-center w-[100%]">
            {vendorRegistrations.map((vendor, index) => {
              return (
                <div
                  className="bg-[#fff] shadow-sm p-3 w-[300px] md:grid-cols-3 sm:grid-cols-2 sm:w-[90%] border-[1px]"
                  key={index}
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="text-md">{vendor?.vendor_name}</div>
                      </div>
                      <div className="text-[#f54749] text-sm">
                        {vendor?.phone_number}
                      </div>
                    </div>
                    <div className="w-[50px]">
                      <img
                        src={`http://localhost:5000/image/vendor/${vendor?.image}`}
                      ></img>
                    </div>
                  </div>

                  <div className="bg-[#e5e5e5] w-[100%] h-[1px] my-2"></div>

                  <div className="flex gap-4 mb-1 text-sm">
                    <div className="text-sm">ชื่อผู้ใช้งาน</div>
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {vendor?.username}
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex gap-4 mb-1 text-sm">
                    <div className="text-sm">สมัครเมื่อ</div>
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {moment(vendor?.createdAt)
                        .add(543, "year")
                        .format("DD/MM/YYYY h:mm")}
                    </div>
                  </div>
                  <div className="flex gap-3 mt-3">
                    <button
                      className="bg-orange-500 text-white px-2 rounded-md"
                      onClick={() => {
                        handleApprove(vendor.id);
                      }}
                    >
                      อนุมัติ
                    </button>
                    <button
                      onClick={() => {
                        handleReject(vendor.id);
                      }}
                      className="bg-red-500 text-white px-2 rounded-md"
                    >
                      ปฏิเสธ
                    </button>
                  </div>
                  {/* <div className="flex gap-4 mb-1 text-sm">
                    ประเภท{" "}
                    <div className="bg-[#f5474a1c] rounded-lg flex w-fit px-4 text-[#f54749] text-[13.7px] shadow-sm border-[#f5474a28] border-[1px]">
                      {m.category.category_name}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      className="bg-orange-500 text-white px-2 rounded-md"
                      onClick={() => {
                        navigate(`/vendor/menu/${m.id}/edit`);
                      }}
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(m.id);
                      }}
                      className="bg-red-500 text-white px-2 rounded-md"
                    >
                      ลบ
                    </button>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer position={"relative"}/>
    </div>
  );
}

export default AdminVendorsRegistrations;

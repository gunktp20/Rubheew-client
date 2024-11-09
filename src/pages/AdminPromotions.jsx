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

function AdminPromotions() {
  // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile
  const [dialog, setDialog] = useState(false);
  const [menus, setMenus] = useState([]);
  const [reports, setReports] = useState([]);
  const [vendorInfo, setVendorInfo] = useState(null);
 
  const { token, vendor } = useAuth();
  const navigate = useNavigate();

  const [promotions, setPromotions] = useState(null);
  const fetchPromotions = async () => {
    try {
      const { data } = await api.get("/promotion", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setPromotions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const deleteBanner = async (p_id) => {
    try {
      const { data } = await api.delete(`/promotion/${p_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      // setMenus(data.menus);
      fetchPromotions();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการจะลบ Banner นี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteBanner(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  return (
    <div className="bg-[#fcfcf9] h-[100vh]">
      {/* <VendorDialog open={dialog} setOpen={setDialog}/> */}
      {/* <NavbarVendor open={dialog} setOpen={setDialog}/> */}
      <NavbarAdmin open={dialog} setOpen={setDialog} />
      <AdminDialog open={dialog} setOpen={setDialog} />
      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-6">จัดการโปรโมชั่น</div>
        <div className="w-[85%] flex justify-end mb-5">
          <button
            onClick={() => {
              navigate("/admin/insert/promotion");
            }}
            className="border-[#f54749] border-[2px] px-7 rounded-sm text-[#f54749] text-sm py-2 hover:bg-[#f54749] transition-all hover:text-white sm:w-[100%]"
          >
            อัพโหลดรูปแบนเนอร์
          </button>
        </div>
        {promotions?.length == 0 && (
          <div className="mt-7 flex rounded-sm justify-center items-center h-[300px] w-[80%]">
            <div className="flex flex-col justify-center items-center">
              <MdSearchOff className="text-[100px] text-[#00000030]" />
              <div className="text-[#00000030] text-[13px] font-semibold">
                คุณยังมีโปรโมชั่นใดๆ
              </div>
            </div>
          </div>
        )}

        <div className="sm:w-[100%]">
          <div className="grid gap-2 grid-cols-3 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 sm:flex sm:flex-col items-center justify-center w-[100%]">
            {promotions?.map((promotion, index) => {
              return (
                <div
                  className="bg-[#fff] shadow-sm p-3 w-[400px] md:grid-cols-2 sm:grid-cols-1 sm:w-[90%] border-[1px]"
                  key={index}
                >
                  <div className="flex justify-between cursor-pointer items-center">
                    <div className="flex flex-col w-[100%]">
                      <div className="flex gap-2 items-center bg-red-500 w-[100%]">
                        <img
                          className="w-[100%] h-[200px] object-cover object-top"
                          src={`http://localhost:5000/image/promotion/${promotion?.image}`}
                        ></img>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="text-sm">
                          {promotion?.customer?.username}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#e5e5e5] w-[100%] h-[1px] my-2"></div>

                  <div className="flex gap-4 mb-1 text-sm">
                    <div className="text-sm">คำอธิบาย</div>
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {promotion?.description}
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex gap-4 mb-1 text-sm">
                    <div className="text-sm">รายงานเมื่อ</div>
                    <div className={`text-sm flex items-center`}>
                      {moment(promotion?.createdAt)
                        .add(543, "year")
                        .format("DD/MM/YYYY h:mm")}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleDelete(promotion?.id);
                    }}
                    className="bg-red-500 mt-2 text-white px-2 rounded-md"
                  >
                    ลบ
                  </button>
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

export default AdminPromotions;

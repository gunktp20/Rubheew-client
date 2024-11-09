import NavbarVendor from "../components/NavbarVendor";
import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import VendorDialog from "../components/VendorDialog";
import Footer from "../components/Footer";
import { MdSearchOff } from "react-icons/md";

function MenuManagement() {
   // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile
   const [dialog, setDialog] = useState(false)
  const [menus, setMenus] = useState([]);
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

  const fetchAllMenus = async () => {
    try {
      const { data } = await api.get("/vendor/menus/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setMenus(data.menus);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMenu = async (menu_id) => {
    try {
      const { data } = await api.delete("/menu/" + menu_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setMenus(data.menus);
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
        text: "คุณต้องการจะลบเมนูนี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteMenu(id);
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
    fetchAllMenus();
  }, []);

  return (
    <div className="bg-[#fcfcf9] h-[100vh]">
      <VendorDialog open={dialog} setOpen={setDialog}/>
      <NavbarVendor open={dialog} setOpen={setDialog}/>
      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-6">รายการอาหารในร้านของคุณ</div>

        {menus.length == 0 && (
            <div className="mt-7 flex rounded-sm justify-center items-center h-[300px] w-[80%]">
              <div className="flex flex-col justify-center items-center">
                <MdSearchOff className="text-[100px] text-[#00000030]" />
                <div className="text-[#00000030] text-[13px] font-semibold">
                  ไม่พบรายการออเดอร์ของคุณ
                </div>
              </div>
            </div>
          )}


        <div className="sm:w-[100%]">
          <div className="grid gap-2 grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:flex sm:flex-col items-center justify-center w-[100%]">
            {menus.map((m, index) => {
              return (
                <div
                  className="bg-[#fff] shadow-sm p-3 w-[300px] md:grid-cols-3 sm:grid-cols-2 sm:w-[90%] border-[1px]"
                  key={index}
                >
                  
                  <div className="flex justify-between">
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center justify-center">
                        <div className="text-sm">{m.menu_name}</div>
                      </div>
                      <div className="text-[#f54749]">{m.price}</div>
                    </div>
                    <div className="w-[50px]">
                      <img
                        src={`http://localhost:5000/image/menu/${m.image}`}
                      ></img>
                    </div>
                  </div>

                  <div className="bg-[#e5e5e5] w-[100%] h-[1px] my-2"></div>

                  <div className="flex gap-4 mb-1 text-sm">
                    สถานะ{" "}
                    <div
                      className={`text-sm flex items-center ${
                        m.vendor.open ? "text-green-500" : "text-gray-400"
                      } `}
                    >
                      {m.vendor.open ? "เปิดให้บริการ" : "ปิดให้บริการ"}
                    </div>
                  </div>
                  <div className="flex gap-4 mb-1 text-sm">
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
                  </div>
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

export default MenuManagement;

import NavbarVendor from "../components/NavbarVendor";
import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import VendorDialog from "../components/VendorDialog";
import moment from "moment";
import { MdSearchOff } from "react-icons/md";
import Footer from "../components/Footer";

function VendorOrders() {
  // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile
  const [dialog, setDialog] = useState(false);
  const [orders, setOrders] = useState([]);
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

  const fetchAllOrders = async () => {
    try {
      const { data } = await api.get("/order/vendor/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (order_id) => {
    try {
      const { data } = await api.delete("/order/" + order_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      fetchAllOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const confirmOrder = async (id) => {
    try {
      const { data } = await api.get(`/order/vendor/${id}/confirm`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      fetchAllOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const handleConfirm = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการจะยืนยันออเดอร์ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ยืนยัน!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          confirmOrder(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
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
        text: "คุณต้องการจะลบออเดอร์นี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteOrder(id);
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
    fetchAllOrders();
  }, []);

  return (
    <div className="bg-[#fcfcf9] h-[100vh]">
      <VendorDialog open={dialog} setOpen={setDialog} />
      <NavbarVendor open={dialog} setOpen={setDialog} />
      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-6">รายออเดอร์ของร้านคุณ</div>
        {orders.length == 0 && (
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
            {orders.map((order, index) => {
              return (
                <div
                  className="bg-[#fff] shadow-sm p-3 w-[300px] md:grid-cols-3 sm:grid-cols-2 sm:w-[90%] border-[1px]"
                  key={index}
                >
                  <div
                    className="flex justify-between cursor-pointer"
                    onClick={() => {
                      navigate("/vendor/order/" + order.id + "/info");
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center justify-center">
                        <div
                          className="text-sm"
                          onClick={() => {
                            navigate("/vendor/order/" + order.id + "/info");
                          }}
                        >
                          {order.destination.destination_name}
                        </div>
                      </div>
                      <div
                        className="text-[#f54749]"
                        onClick={() => {
                          navigate("/vendor/order/" + order.id + "/info");
                        }}
                      >
                        {order.total_price} บาท
                      </div>
                    </div>
                    <div className="w-[50px]">
                      {order.slip_image ? (
                        <img
                          onClick={() => {
                            navigate("/vendor/order/" + order.id + "/info");
                          }}
                          className="w-[50px] h-[70px]"
                          src={`http://localhost:5000/image/slip/${order.slip_image}`}
                        ></img>
                      ) : (
                        <div className="w-[50px] h-[70px] "></div>
                      )}
                    </div>
                  </div>

                  <div className="bg-[#e5e5e5] w-[100%] h-[1px] my-2"></div>
                  <div className="flex gap-4 mb-1 text-sm">
                    ออเดอร์{""}
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {order?.order_items?.length} รายการ
                    </div>
                  </div>
                  <div className="flex gap-4 mb-1 text-sm">
                    สถานะ{" "}
                    <div
                      className={`text-sm flex items-center text-purple-600 capitalize`}
                    >
                      {order.status === "pending" && "รอดำเนินการ"}
                      {order.status === "confirmed" && "ยืนยันแล้ว"}
                      {order.status === "preparing" && "อยู่ในครัว"}
                      {order.status === "out_for_delivery" &&
                        "คนขับกำลังนำคำสั่งซื้อไปส่ง..."}
                      {order.status === "delivered" &&
                        "ลูกค้าได้รับสินค้าเรียบร้อย"}
                      {/* // "pending",
                      // "confirmed",
                      // "preparing",
                      // "out_for_delivery",
                      // "delivered",
                      // "cancelled" */}
                    </div>
                  </div>

                  <div className="flex gap-4 mb-1 text-sm">
                    ชื่อผู้รับ{""}
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {order.customer.fname}-{order.customer.lname}
                    </div>
                  </div>

                  <div className="flex gap-4 mb-1 text-sm">
                    เมื่อ{""}
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {moment(order.createdAt)
                        .add(543, "year")
                        .format("DD/MM/YYYY h:mm")}
                    </div>
                  </div>

                  {/* <div className="flex gap-4 mb-1 text-sm">
                    ประเภท{" "}
                    <div className="bg-[#f5474a1c] rounded-lg flex w-fit px-4 text-[#f54749] text-[13.7px] shadow-sm border-[#f5474a28] border-[1px]">
                      {m.category.category_name}
                    </div>
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

export default VendorOrders;

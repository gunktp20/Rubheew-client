import NavbarVendor from "../components/NavbarVendor";
import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import VendorDialog from "../components/VendorDialog";

function VendorOrder() {
  // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile

  const { order_id } = useParams();
  const [dialog, setDialog] = useState(false);
  const [order, setOrder] = useState([]);
  const [vendorInfo, setVendorInfo] = useState(null);
  const { token, vendor } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deliveryCost, setDeliveryCost] = useState(0);

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

  const fetchDeliveryCost = async () => {
    try {
      const { data } = await api.get("/delivery-cost");
      setDeliveryCost(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchOrder = async () => {
    try {
      const { data } = await api.get(`/order/vendor/${order_id}/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setOrder(data);
    } catch (err) {
      navigate("/");
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
      navigate("/vendor/orders/list");
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
      fetchOrder();
    } catch (err) {
      console.log(err);
    }
  };

  const moveToRider = async (id) => {
    setError("");
    setSuccess("");
    try {
      const { data } = await api.get(`/order/vendor/${id}/move-to-rider`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      fetchOrder();
    } catch (err) {
      console.log(err);
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  const handleMoveToRider = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณพร้อมมอบ ออเดอร์นี้ ให้กับผู้ขับหรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ยืนยัน!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          moveToRider(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
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
        text: "คุณต้องการที่จะปฏิเสธออเดอร์นี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ปฏิเสธ!",
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
    fetchOrder();
    fetchDeliveryCost();
  }, []);

  return (
    <div className="bg-[#fcfcf9] h-[100vh]">
      <VendorDialog open={dialog} setOpen={setDialog} />
      <NavbarVendor open={dialog} setOpen={setDialog} />
      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-5">รายออเดอร์ของร้านคุณ</div>

        <div className="mt-8 border-[1px] gap-5 border-[#dfdfdf] flex bg-[#fff] w-[700px] shadow-sm rounded-md p-5 py-6 sm:w-[90%] h-fit sm:flex-col">
          <div className="w-[100%] flex sm:justify-center">
            {order.slip_image ? (
              <img
                className=" border-[1px] border-gray-300 shadow-sm rounded-sm"
                src={`http://localhost:5000/image/slip/${order.slip_image}`}
              ></img>
            ) : (
              <div className="w-[300px] h-[300px] flex justify-center items-center bg-gray-100 text-gray-500">
                ลูกค้ายังไม่ยืนยัน สลิป
              </div>
            )}
          </div>
          {/* info */}
          <div className="flex sm:mt-5 w-[100%]">
            <div className="flex w-[100%] justify-end">
              {/* start */}
              <div className="mt-2 flex flex-col w-[100%]">
                <div className="flex justify-between items-center w-[100%]">
                  <div className="text-sm">ปลายทาง</div>
                  <div className="text-sm text-purple-600">
                    {order?.destination?.destination_name}
                  </div>
                </div>
                <div className="flex justify-between items-center w-[100%] mt-6">
                  <div className="text-sm">ผู้รับ</div>
                  <div className="text-sm text-blue-600">
                    {order?.customer?.fname}-{order?.customer?.lname}
                  </div>
                </div>
                <div className="flex justify-between items-center w-[100%] mt-6">
                  <div className="text-sm">ยอดรวมรายการอาหาร</div>
                  <div className="text-sm">
                    {order?.total_price?.toFixed(2)} บาท
                  </div>
                </div>
                {/* ค่าส่ง */}
                <div className="flex justify-between items-center w-[100%] mt-6">
                  <div className="text-sm">ค่าส่ง</div>
                  <div className="text-sm">{deliveryCost?.toFixed(2)}</div>
                </div>

                {/* รวมค่าส่ง */}
                <div className="bg-gray-300 w-[100%] h-[1px] mt-6"></div>
                <div className="flex justify-between items-center w-[100%] mt-7">
                  <div className="text-sm">ยอดรวมทั้งหมด</div>
                  <div className="text-sm mt- text-[#f54749] font-semibold">
                    {(order?.total_price + deliveryCost).toFixed(2)}{" "}
                    บาท
                  </div>
                </div>

                {/* end preview */}

                {order.status === "pending" && (
                  <button
                    disabled={!order?.slip_image}
                    onClick={() => {
                      handleConfirm(order?.id);
                    }}
                    className={`bg-[#f54749] mt-5 text-sm text-white px-5 py-2 rounded-sm disabled:bg-[#dedede] disabled:cursor-not-allowed`}
                  >
                    ยืนยันคำสั่งซื้อ
                  </button>
                )}

                {order.status === "pending" && (
                  <button
                    onClick={() => {
                      handleDelete(order?.id);
                    }}
                    className={`mt-3 text-sm px-5 py-2 rounded-sm bg-gray-100 text-gray-400`}
                  >
                    ยกเลิก
                  </button>
                )}

                <div className="flex gap-4 mb- text-sm w-[100%] justify-between mt-7">
                  สถานะ{" "}
                  <div
                    className={`text-sm flex items-center text-purple-600 capitalize`}
                  >
                    {order?.status === "pending" && "รอดำเนินการ"}
                    {order?.status === "confirmed" && "ยืนยันแล้ว"}
                    {order?.status === "preparing" && "อยู่ในครัว"}
                    {order?.status === "out_for_delivery" &&
                      "คนขับกำลังนำคำสั่งซื้อไปส่ง..."}
                    {order?.status === "delivered" &&
                      "ลูกค้าได้รับสินค้าเรียบร้อย"}
                    {/* // "pending",
                      // "confirmed",
                      // "preparing",
                      // "out_for_delivery",
                      // "delivered",
                      // "cancelled" */}
                  </div>
                </div>

                {order.status === "out_for_delivery" && (
                  <button
                    onClick={() => {}}
                    className={`bg-[#f54749] mt-5 text-sm text-white px-5 py-2 rounded-sm disabled:bg-[#dedede] disabled:cursor-not-allowed flex justify-center items-center gap-3 cursor-not-allowed`}
                  >
                    คำขับกำลังนำคำสั่งซื้อไปส่ง{" "}
                    <div className="loader w-[20px] h-[20px]"></div>
                  </button>
                )}

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

                {order.status === "preparing" && (
                  <button
                    // disabled={!order?.slip_image}
                    onClick={() => {
                      handleMoveToRider(order?.id);
                    }}
                    className={`bg-[#f54749] mt-5 text-sm text-white px-5 py-2 rounded-sm disabled:bg-[#dedede] disabled:cursor-not-allowed`}
                  >
                    ส่งมอบให้คนขับ
                  </button>
                )}

                {/* end slip */}
              </div>
              {/* end */}
            </div>
          </div>
        </div>

        <div className="mt-8 border-[1px] border-[#dfdfdf] flex flex-col bg-[#fff] w-[700px] shadow-sm rounded-md p-5 py-6 sm:w-[90%] h-fit">
          <div className="flex w-[100%] justify-between">
            <div className="flex items-center gap-3">
              <div>
                <img
                  className="w-[70px]"
                  src={`http://localhost:5000/image/vendor/${order?.vendor?.image}`}
                ></img>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex text-[15px]">
                  {order?.vendor?.vendor_name}
                </div>
                <div className="flex text-[12px]">
                  ทั้งหมด {order?.cart_items?.length} รายการ
                </div>
              </div>
            </div>
          </div>

          <div className="w-[100%] bg-gray-200 h-[1px] mt-4 mb-3"></div>

          <table id="cart">
            <tr>
              <th>เมนู</th>
              <th>ราคา</th>
              <th>จำนวน</th>
              <th>ราคารวม</th>
            </tr>
            {order?.order_items?.map((item) => {
              return (
                <tr>
                  <td className="flex items-center gap-3">
                    <img
                      src={`http://localhost:5000/image/menu/${item?.menu?.image}`}
                      className="w-[50px]"
                    ></img>
                    <div className="text-sm">{item?.menu.menu_name}</div>
                  </td>
                  <td className="text-sm">{item?.menu.price}</td>
                  <td className="text-sm">
                    <div className="flex gap-3 items-center">
                      <div className="text-[15px]">{item?.quantity}</div>
                    </div>
                  </td>
                  <td className="text-sm">{item?.price}</td>
                </tr>
              );
            })}
          </table>
          <div className="text-[13px] mt-3 text-gray-500 flex justify-start w-[100%] mb-1">
            หมายเหตุถึงร้านค้า
          </div>
          <input
            readOnly
            placeholder="หมายเหตุ"
            value={order?.note}
            className="mb-3 text-sm w-[100%] h-[32px] pl-2 rounded-sm bg-[#00000007]"
          ></input>

          <div className="flex mt-4 w-[100%] justify-between items-center">
            <div className="flex gap-3 text-sm">
              <div>ยอดรวมทั้งหมด</div>
              <div>{order?.total_price}</div>
              <div>บาท</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorOrder;

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../service/api";
import NavbarCustomer from "../components/NavbarCustomer";
import { useNavigate } from "react-router-dom";
import { MdSearchOff } from "react-icons/md";

function Orders() {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const { data } = await api.get("/order/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="w-[100%] flex flex-col bg-[#fcfcf9] h-[100vh]">
      <NavbarCustomer />

      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-6">รายการออเดอร์ของคุณ</div>

        {orders.length == 0 && (
          <div className="mt-7 flex rounded-sm justify-center items-center h-[300px] w-[80%]">
            <div className="flex flex-col justify-center items-center">
              <MdSearchOff className="text-[100px] text-[#00000030]" />
              <div className="text-[#00000030] text-[13px] font-semibold">
                ไม่พบชุดรายการสินค้าของคุณ
              </div>
              <button
                onClick={() => {
                  // dispatch(setCreateVisible(!createBoardVisible))
                  navigate("/");
                }}
                className="text-[#f54749] border-[#f54749] border-[1px] px-5 outline-none text-[15px] mt-4 h-[40px] rounded-sm transition-all hover:border-[#f54749] hover:bg-[#f54749] hover:shadow-sm hover:text-white"
              >
                เลือกรายการอาหารของคุณ
              </button>
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
                      if (order?.status === "pending" && !order?.slip_image) {
                        navigate("/qr-payment/" + order?.id);
                        return;
                      }
                      navigate("/order/" + order?.id);
                    }}
                  >
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center justify-center">
                        <div
                          className="text-sm"
                          onClick={() => {
                            if (
                              order?.status === "pending" &&
                              !order?.slip_image
                            ) {
                              navigate("/qr-payment/" + order?.id);
                              return;
                            }
                            navigate("/order/" + order?.id);
                          }}
                        >
                          {order?.vendor?.vendor_name}
                        </div>
                      </div>
                      <div
                        className="text-[#f54749]"
                        onClick={() => {
                          if (
                            order?.status === "pending" &&
                            !order?.slip_image
                          ) {
                            navigate("/qr-payment/" + order?.id);
                            return;
                          }
                          navigate("/order/" + order?.id);
                        }}
                      >
                        {order?.total_price} บาท
                      </div>
                    </div>

                    <div>
                      <img
                        className="w-[70px]"
                        src={`http://localhost:5000/image/vendor/${order?.vendor?.image}`}
                      ></img>
                    </div>
                  </div>
                  <div className="bg-[#e5e5e5] w-[100%] h-[1px] my-2"></div>
                  <div className="flex gap-4 mb-1 text-sm">
                    สถานะ{" "}
                    <div
                      className={`text-sm flex items-center text-purple-600 capitalize`}
                    >
                      {order?.status === "pending" && "รอดำเนินการ"}
                      {order?.status === "confirmed" && "ยืนยันแล้ว"}
                      {order?.status === "preparing" && "สินค้าอยู่ในครัว"}
                      {order?.status === "out_for_delivery" &&
                        "คนขับกำลังนำส่งคำสั่งซื้อ..."}
                      {order?.status === "delivered" &&
                        "คุณได้รับสินค้าเรียบร้อย"}
                    </div>
                  </div>
                  <div className="flex gap-4 mb-1 text-sm">
                    ปลายทาง{""}
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {order.destination.destination_name}
                    </div>
                  </div>

                  {/* 
                  <div className="flex gap-4 mb-1 text-sm">
                    เมื่อ{""}
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {moment(order.createdAt)
                        .add(543, "year")
                        .format("DD/MM/YYYY h:mm")}
                    </div>
                  </div>  */}
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
    </div>
  );
}

export default Orders;

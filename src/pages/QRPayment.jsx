import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import NavbarCustomer from "../components/NavbarCustomer";
import NavbarVendor from "../components/NavbarVendor";
import PromptPayQRCode from "../components/PromptPayQRCode";
import ppLogo from "../assets/images/prompt-pay-logo.png";

function QRPayment() {
  const { token, vendor } = useAuth();
  const { order_id } = useParams();
  const [order, setOrder] = useState(null);
  const [qrcode, setQRcode] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const getOrderInfo = async () => {
    try {
      const { data } = await api.get("/order/" + order_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(data);
      if (data?.slip_image) {
        setPreview("http://localhost:5000/image/slip/" + data?.slip_image);
      }
      setOrder(data);
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  };

  const generateQR = async () => {
    try {
      const { data } = await api.get(
        "/payment/generateQR/" + order_id,
        // {
        //   amount: parseFloat(2),
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setQRcode(data.Result);
      //   setOrder(data);
    } catch (err) {
      //   navigate("/");
      console.log(err);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
    // เช็คว่ามีไฟล์หรือไม่
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  const checkoutOrder = async () => {
    if (!selectedFile && !preview) {
      setError("กรุณาแนบรูปสลิปการจ่ายเงิน");
      return;
    }

    if (!selectedFile && preview) {
      navigate("/orders");
      return;
    }

    const formData = new FormData();

    formData.append("image", selectedFile);

    try {
      const { data } = await api.put("/order/" + order_id, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/order/" + order_id);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [deliveryCost, setDeliveryCost] = useState(0);
  const fetchDeliveryCost = async () => {
    try {
      const { data } = await api.get("/delivery-cost");
      setDeliveryCost(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderInfo();
    generateQR();
    fetchDeliveryCost()
  }, []);

  return (
    <div className="flex flex-col h-[100%] bg-[#fcfcf9] pb-10">
      {vendor ? <NavbarVendor /> : <NavbarCustomer />}
      <div className="w-[100%] flex justify-center gap-5 sm:flex-col sm:items-center">
        <div className="mt-8 border-[1px] border-[#dfdfdf] flex flex-col bg-[#fff] w-[650px] shadow-sm rounded-md p-5 py-6 sm:w-[90%] h-fit">
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

          <div className="flex mt-4 w-[100%] justify-between items-center">
            <div className="flex gap-3 text-sm">
              <div>ยอดรวมทั้งหมด</div>
              <div>{order?.total_price}</div>
              <div>บาท</div>
            </div>
          </div>
        </div>

        <div className="flex-col sm:justify-center flex sm:items-center">
          {/* qr code */}
          <div className="h-max mt-8 border-[1px] border-[#dfdfdf] flex flex-col bg-[#fff] w-[300px] shadow-sm rounded-md p-5 py-6 items-center sm:w-[90%]">
            <img className="w-[60%] sm:w-[60%]" src={ppLogo}></img>
            <img className="w-[200px] sm:w-[230px]" src={qrcode}></img>

            <div className="mt-2 flex flex-col w-[100%]">
              <div className="flex justify-between items-center w-[100%]">
                <div className="text-sm">ยอดรวมรายการอาหาร</div>
                <div className="text-sm">
                  {order?.total_price?.toFixed(2)} บาท
                </div>
              </div>
              {/* ค่าส่ง */}
              <div className="flex justify-between items-center w-[100%]">
                <div className="text-sm">ค่าส่ง</div>
                <div className="text-sm mt-5">
                  {deliveryCost?.toFixed(2)} บาท
                </div>
              </div>
              {/* รวมค่าส่ง */}
              <div className="bg-gray-300 w-[100%] h-[1px] mt-6"></div>
              <div className="flex justify-between items-center w-[100%] mt-7">
                <div className="text-sm">ยอดรวมทั้งหมด</div>
                <div className="text-sm mt- text-[#f54749] font-semibold">
                  {(order?.total_price + deliveryCost).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
          {/* slip */}
          {order?.status === "pending" && (
            <div className="h-max mt-8 border-[1px] border-[#dfdfdf] flex flex-col bg-[#fff] w-[300px] shadow-sm rounded-md p-5 py-6 items-center sm:w-[90%]">
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

              {/* preview */}
              <div class="grid w-full items-center gap-4 mt-2">
                <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  อัพโหลดรูปภาพ Slip ของคุณ
                </label>
                <input
                  class="flex w-full rounded-md border border-[#f54749] border-input bg-white text-sm text-gray-400 file:border-0 file:bg-[#f54749] file:text-white file:text-sm file:font-medium"
                  type="file"
                  id="picture"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>

              {preview && (
                <div>
                  <h3 className="text-sm mb-2">รูปภาพปัจจุบัน</h3>
                  <img
                    src={`${preview}`}
                    alt="Preview"
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                </div>
              )}
              {/* end preview */}
              <button
                onClick={checkoutOrder}
                className="mt-5 bg-[#f54749] text-white w-[100%] h-[32px]"
              >
                ยืนยันคำสั่งซื้อ
              </button>
            </div>
          )}

          {order?.status !== "pending" && (
            <div className="h-max mt-8 border-[1px] border-[#dfdfdf] flex flex-col bg-[#fff] w-[300px] shadow-sm rounded-md p-5 py-6 items-center sm:w-[90%]">
              {/* preview */}
              <div class="grid w-full mb-5 items-center gap-4 mt-2">
                <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  รูปภาพ Slip ของคุณ
                </label>
              </div>

              {preview && (
                <div>
                  <img
                    src={`${preview}`}
                    alt="Preview"
                    style={{ maxWidth: "300px", maxHeight: "300px" }}
                  />
                </div>
              )}
              {/* end preview */}
              <div className="flex gap-4 mb-1 text-sm mt-3">
                สถานะ{" "}
                <div
                  className={`text-sm flex items-center text-purple-600 capitalize`}
                >
                  {order?.status === "pending" && "รอดำเนินการ"}
                  {order?.status === "confirmed" && "ยืนยันแล้ว"}
                  {order?.status === "preparing" && "สินค้าอยู่ในครัว"}
                  {order?.status === "out_for_delivery" &&
                    "คนขับกำลังนำส่งคำสั่งซื้อ..."}
                  {order?.status === "delivered" && "คุณได้รับสินค้าเรียบร้อย"}
                </div>
              </div>
            </div>
          )}
          {/* end slip */}
        </div>
      </div>
      {/* <PromptPayQRCode phoneNumber={phoneNumber} amount={amount} /> */}
    </div>
  );
}

export default QRPayment;

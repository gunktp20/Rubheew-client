import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import NavbarCustomer from "../components/NavbarCustomer";
import api from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import NavbarRider from "../components/NavbarRider";

function RiderOrder() {
  const { order_id } = useParams();
  const [dialog, setDialog] = useState(false);
  const [order, setOrder] = useState(null);
  const { token } = useAuth();
  const [dd, setDD] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [note, setNote] = useState("");

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

  const fetchOrderById = async () => {
    try {
      const { data } = await api.get("/test-order/" + 10016);
      console.log(data);
      setDD(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getOrderInfo = async () => {
    try {
      const { data } = await api.get("/rider/order/" + order_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      if (data?.delivery_image) {
        setPreview("http://localhost:5000/image/delivery/" + data?.delivery_image);
      }
      setOrder(data);
    } catch (err) {
      console.log(err);
    }
  };

  const completeOrder = async () => {
    setError("");
    setSuccess("");
    if (!selectedFile) {
      return setError("กรุณาอัพโหลดรูปภาพยืนยัน");
    }
    const formData = new FormData();

    formData.append("note", note);
    formData.append("image", selectedFile);

    try {
      const { data } = await api.put(`/order/${order_id}/complete/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      setSuccess("ออเดอร์ของคุณถูกส่งสำเร็จ");
    } catch (err) {
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  useEffect(() => {
    getOrderInfo();
    fetchOrderById();
  }, []);

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: "poi",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "transit",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    marginRight: "30px",
  };

  return (
    <div className="bg-[#fcfcf9] h-[100vh]">
      <NavbarRider open={dialog} setOpen={setDialog} />

      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-6">รายการออเดอร์ของคุณ</div>

        {/* destination section */}
        <div className="mt-8 border-[1px] gap-5 border-[#dfdfdf] flex bg-[#fff] w-[700px] shadow-sm rounded-md p-5 py-6 sm:w-[90%] h-fit sm:flex-col">
          {/* google map */}
          <LoadScript
            googleMapsApiKey={"AIzaSyDakKAIrjvqKRXzVvOfJut27nHbJ94SMTo"}
            libraries={["places"]}
            loadingElement={<div>Loading...</div>}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={dd?.position}
              zoom={15}
              options={mapOptions}
            >
              {/* <Marker position={origin} /> */}
              <Marker position={dd?.position} />

              {/* {directionsResponse && <DirectionsRenderer directions={directionsResponse} />} */}
            </GoogleMap>
          </LoadScript>

          {/* info */}
          <div className="flex w-[100%]">
            <div className="flex w-[100%] justify-center">
              {/* start */}

              <div className="w-[100%]">
                {" "}
                <div class="grid w-full items-center gap-4 mt-2 ">
                  {/* start */}
                  <div className="flex flex-col mb-3">
                    <div className="flex justify-between items-center w-[100%]">
                      <div className="text-sm">ปลายทาง</div>
                      <div className="text-sm clear-start text-purple-600">
                        {order?.destination?.destination_name}
                      </div>
                    </div>
                    {/* ค่าส่ง */}
                    <div className="flex justify-between items-center mt-3 w-[100%]">
                      <div className="text-sm">ผู้รับ</div>
                      <div className="text-sm clear-start text-blue-600">
                        {order?.customer?.fname}-{order?.customer?.lname}
                      </div>
                    </div>
                    {/* เบอร์ติดต่อ */}
                    <div className="flex justify-between items-center mt-3 w-[100%]">
                      <div className="text-sm">เบอร์ติดต่อ</div>
                      <div className="text-sm clear-start text-red-600">
                        {order?.customer?.phone_number}
                      </div>
                    </div>
                    {/* เบอร์ติดต่อ */}
                    <div className="flex justify-between items-center mt-3 w-[100%]">
                      <div className="text-sm">ออเดอร์</div>
                      <div className="text-sm clear-start">
                        {order?.order_items.length} รายการ
                      </div>
                    </div>

                    {/* รวมค่าส่ง */}
                    <div className="bg-gray-300 w-[100%] h-[1px] mt-6"></div>
                    <div className="flex justify-between items-center w-[100%] mt-7">
                      <div className="text-sm">ยอดรวมทั้งหมด</div>
                      <div className="text-sm mt- text-[#f54749] font-semibold">
                        {order?.total_price + 15}.00 บาท
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  {order?.status !== "delivered" && (
                    <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      อัพโหลดรูปภาพสำหรับลูกค้า
                    </label>
                  )}
                  {order?.status === "delivered" && (
                    <label class="text-sm text-gray-400 mb-3 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      รูปภาพยืนยันการส่งของคุณ
                    </label>
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
                  {order?.status !== "delivered" && (
                    <input
                      class="flex w-full rounded-md border border-[#f54749] border-input bg-white text-sm text-gray-400 file:border-0 file:bg-[#f54749] file:text-white file:text-sm file:font-medium"
                      type="file"
                      id="picture"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  )}
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
                {order?.status !== "delivered" && (
                  <button
                    onClick={completeOrder}
                    className="bg-[#f54749] mt-5 text-white w-[100%] h-[32px]"
                  >
                    ยืนยันออเดอร์ของคุณ
                  </button>
                )}
              </div>
              {/* end */}
            </div>
          </div>
        </div>
        {/* start container */}

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
                  ทั้งหมด {order?.order_items?.length} รายการ
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
            {order?.order_items?.map((item, index) => {
              return (
                <tr key={index}>
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

        {/* end container */}
      </div>
    </div>
  );
}

export default RiderOrder;

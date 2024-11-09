import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import NavbarCustomer from "../components/NavbarCustomer";
import api from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import { FaImage } from "react-icons/fa";
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
import Swal from "sweetalert2";
import Footer from "../components/Footer"

const steps = [
  {
    label: "รอยืนยันออเดอร์",
  },
  {
    label: "คำสั่งซื้อของคุณอยู่ในครัว",
  },
  {
    label: "คนขับกำลังนำส่งสินค้าของคุณ",
  },
  {
    label: "คำสั่งซื้อเสร็จสมบูรณ์",
  },
];

function Order() {
  const { token } = useAuth();
  const [order, setOrder] = useState(null);
  const [dd, setDD] = useState(null);
  const navigate = useNavigate();
  const { order_id } = useParams();

  const [activeStep, setActiveStep] = React.useState(2);

  const getOrderInfo = async () => {
    try {
      const { data } = await api.get("/order/" + order_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setActiveStep();
      setOrder(data);
      console.log(Number(data?.destination?.lat))
      console.log(Number(data?.destination?.lng))
      setPosition({
        lat: Number(data?.destination?.lat),
        lng: Number(data?.destination?.lng)
      });

      if (data?.status === "pending" && !data?.slip_image) {
        navigate("/qr-payment/" + order_id);
        setActiveStep(1);
        return;
      } else if (data?.status === "pending" && data?.slip_image) {
        setActiveStep(1);
        return;
      } else if (data?.status === "preparing") {
        setActiveStep(2);
        return;
      } else if (data?.status === "out_for_delivery") {
        setActiveStep(3);
        return;
      } else if (data?.status === "delivered") {
        setActiveStep(4);
        return;
      }
    } catch (err) {
      console.log(err);
      //   navigate("/");
      //   console.log(err);
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

  useEffect(() => {
    fetchOrderById();
    getOrderInfo();
  }, []);

  const viewDeliveryImage = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        html: `
       <img src='http://localhost:5000/image/delivery/${order?.delivery_image}'></img>
      `,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // deleteMenu(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    marginRight: "30px",
  };

  const [position, setPosition] = useState();

  return (
    <div className="w-[100%] flex flex-col bg-[#fcfcf9] h-[100%]">
      <NavbarCustomer />
      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-6">รายการออเดอร์ของคุณ</div>

        {/* destination section */}
        <div className="mt-8 border-[1px] gap-5 border-[#dfdfdf] flex bg-[#fff] w-[700px] shadow-sm rounded-md p-5 py-6 sm:w-[90%] h-fit sm:flex-col">
          {/* google map */}
          <LoadScript
            googleMapsApiKey={"AIzaSyC-9AuCqJG-9jstHnaM1CX5BM3Kza_mSQc"}
            libraries={["places"]}
            loadingElement={<div>Loading...</div>}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={position}
              zoom={15}
              options={mapOptions}
            >
              {/* <Marker position={origin} /> */}
              <Marker position={position} />

              {/* {directionsResponse && <DirectionsRenderer directions={directionsResponse} />} */}
            </GoogleMap>
          </LoadScript>

          {/* info */}
          <div className="flex w-[100%]">
            <div className="flex w-[100%] justify-center">
              {/* start */}
              <Box sx={{ maxWidth: 400 }}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step
                      key={step.label}
                      sx={{
                        "& .MuiStepLabel-root .Mui-completed": {
                          color: "#1fd249d7", // circle color (COMPLETED)
                        },
                        "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                          {
                            color: "grey.500",
                          },
                        "& .MuiStepLabel-root .Mui-active": {
                          color: "grey.500",
                        },

                        "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                          {
                            color: "common.white",
                          },
                        "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                          fill: "common.white",
                        },
                      }}
                    >
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <Typography
                              className={`flex items-center gap-4 ${
                                activeStep !== 3 ? "hidden" : ""
                              }`}
                              variant="caption"
                            >
                              กรุณารอสักครู่{" "}
                              <div className="loader w-[15px] h-[15px] border-l-[#f54749] border-r-[#f54749] border-b-[#f54749]"></div>
                            </Typography>
                          ) : null
                        }
                      >
                        {step.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>

                {order?.status !== "delivered" && (
                  <button
                    onClick={() => {
                      navigate("/qr-payment/" + order_id);
                    }}
                    className={`bg-[#f54749] mt-5 text-sm text-white px-5 py-2 rounded-sm disabled:bg-[#dedede] disabled:cursor-not-allowed`}
                  >
                    ดูรายละเอียดการชำระเงิน
                  </button>
                )}
                {order?.status == "delivered" && (
                  <button
                    onClick={() => {
                      viewDeliveryImage();
                    }}
                    className={`bg-[#f54749] mt-5 text-sm text-white px-5 py-2 rounded-sm disabled:bg-[#dedede] disabled:cursor-not-allowed flex items-center justify-center gap-4`}
                  >
                    ดูรูปภาพจากผู้ขับ <FaImage />
                  </button>
                )}
              </Box>
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
      <Footer position={"relative"}/>
    </div>
  );
}

export default Order;

import { IoIosArrowForward } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { LuClipboardCheck } from "react-icons/lu";
import { MdOutlineAccountBox } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { HiMenuAlt1 } from "react-icons/hi";
import Dialog from '../components/Dialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import GoogleMap from "../assets/images/penn1.webp"

function RiderOrder() {
    5
    const [destination, setDestination] = React.useState(null);
    // นำ param ที่อยู่ใน path มาใช้โดยชื่อต้องตรงกับที่กำหนดไว้ในเส้นทางที่ไฟล์ App.jsx
    const { order_id } = useParams()
    // ใช้สำหรับนำทางไปหน้าอื่น
    const navigate = useNavigate()
    // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile
    const [open, setOpen] = useState(false)
    // ตัวแปรสำหรับ React โดยตัวแรกคือ ข้อมูล ตัวที่สองคือ function สำหรับการ set ค่าให้กับตัวแปร
    const [order, setOrder] = useState(null)

    const fetchOrderById = async () => {
        try {
            const response = await axios.get("http://localhost:5000/orders/" + order_id)
            console.log(response.data)
            setOrder(response.data)
        } catch (err) {
            console.log(err)
        }
    }

    const mapOptions = {
        disableDefaultUI: true, // ปิดการแสดง UI ปกติของ Google Maps
        styles: [
          {
            featureType: "poi", // ปิดการแสดงสถานที่อื่นๆ เช่น ร้านอาหาร
            elementType: "labels",
            stylers: [{ visibility: "on" }],
          },
          {
            featureType: "transit", // ปิดการแสดงระบบขนส่งสาธารณะ
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

    // useEffect จะทำงานในทุกครั้งที่ Component ถูก render
    useEffect(() => {
        // ทำงานในนี้ทุกครั้งที่ หน้า จอถูก render ใหม่
        fetchOrderById()
    }, [])

    return (
        <div>
            {/* Main container */}
            <Dialog open={open} setOpen={setOpen} />

            <div className='flex flex-col h-svh'>
                {/* Navbar */}
                <div onClick={() => {
                    navigate("/rider-orders")
                }} className=' cursor-pointer bg-[#f5ebdc] w-[100%] h-[50px] flex items-center shadow-md h-[64px] pl-6 '>
                    <div className='text-[35px] mr-6'>{'<'}</div>
                    <div className='text-[20px] font-semibold'>คนส่ง</div>
                </div>
                {/* Content Container*/}
                <div className=' w-[100%] h-[100%] flex'>
                    {/* Sidebar Container*/}
                    <div className='bg-[#f5ebdc] pt-5 w-[300px] h-[100%] mr-2 flex flex-col pl-5 pr-5 justify-between sm:hidden'>
                        {/* top-menu */}
                        <div className='w-[100% flex flex-col gap-[26px]'>
                            <button className='bg-[#fff] h-[50px] text-[18px] shadow-md rounded-[10px] font-semibold '>
                                นาย ส่งด่วน ทันใจ
                            </button>
                            <button className='bg-[#fff] h-[50px] shadow-md rounded-[10px] text-[15px] font-semibold flex items-center justify-center gap-4 text-[#714b3c]'>
                                <CgNotes className='text-[20px]' /> ข้อมูลส่วนตัว <IoIosArrowForward className='text-[25px]' />
                            </button>
                            <button className='bg-[#fff] h-[50px] shadow-md rounded-[10px] text-[15px] font-semibold flex items-center justify-center gap-4 text-[#714b3c]'>
                                <LuClipboardCheck className='text-[20px]' /> จำนวนออเดอร์ <IoIosArrowForward className='text-[25px]' />
                            </button>
                        </div>

                        {/* bottom-menu */}
                        <div className='w-[100%] flex flex-col mb-10'>
                            {/* Support category menu */}
                            <div className='font-semibold mb-3'>ความช่วยเหลือ และ สนับสนุน</div>
                            <button className='bg-[#fff] h-[46px] shadow-md rounded-[10px] text-[14px] font-semibold flex items-center justify-center gap-4 text-[#714b3c]'>
                                <LuClipboardCheck className='text-[20px]' /> ติดต่อเรา Rub Heew <IoIosArrowForward className='text-[25px]' />
                            </button>

                            {/* Account category menu */}
                            <div className='font-semibold mb-3 mt-4'>บัญชี</div>
                            {/* Profile Account  */}
                            <button className='bg-[#fff] h-[46px] shadow-md rounded-[10px] text-[14px] font-semibold flex items-center justify-center gap-4 text-[#714b3c] mb-2'>
                                <MdOutlineAccountBox className='text-[20px]' /> โปรไฟล์ส่วนตัว <IoIosArrowForward className='text-[25px]' />
                            </button>
                            {/* Bank Account */}
                            <button className='bg-[#fff] h-[46px] shadow-md rounded-[10px] text-[14px] font-semibold flex items-center justify-center gap-4 text-[#714b3c]'>
                                <RiBankLine className='text-[20px]' /> บัญชีธนาคาร <IoIosArrowForward className='text-[25px]' />
                            </button>
                        </div>

                    </div>

                    {/* Order container */}
                    <div className='w-[100%] h-[100%] sm:pt-10 p-20 px-32 md:px-5 sm:px-5 flex flex-col gap-3'>
                        <div className='w-[100%] h-[30px] hidden sm:block' onClick={() => {
                            setOpen(!open)
                        }}>
                            <HiMenuAlt1 className='text-[30px] text-gray-500' />
                        </div>

                        <div className="bg-[#f5ebdc] w-[100%] flex-col p-7 rounded-lg">
                            <div className="text-[#714b3c] text-[27px] font-semibold">ออเดอร์ {order_id}</div>
                            <div className="bg-white my-4 h-[50px] flex items-center rounded-lg text-[#714b3c] text-[18px] pl-6">รหัสคำสั่งซื้อ : {order?.id}</div>
                            <div className="bg-white my-4 h-[50px] flex items-center rounded-lg text-[#714b3c] text-[18px] pl-6">ที่อยู่ลูกค้า : {order?.destination}</div>
                            <div className="bg-white my-4 h-[50px] flex items-center rounded-lg text-[#714b3c] text-[18px] pl-6">เบอร์ติดต่อผู้รับ : {order?.phone_number}</div>
                            <div className="flex pl-10 sm:flex-col sm:pl-0">
                                {/* Google map */}
                                <div className="flex border-[#502314] border-[5px] w-fit rounded-md">
                                    <LoadScript
                                        googleMapsApiKey={"AIzaSyDakKAIrjvqKRXzVvOfJut27nHbJ94SMTo"}
                                        libraries={["places"]}
                                        loadingElement={<div>Loading...</div>}
                                    >
                                        <GoogleMap
                                            mapContainerStyle={mapContainerStyle}
                                            center={order.position}
                                            zoom={15}
                                            options={mapOptions}
                                        >
                                            {/* <Marker position={origin} /> */}
                                            <Marker position={order.position} />

                                            {/* {directionsResponse && <DirectionsRenderer directions={directionsResponse} />} */}
                                        </GoogleMap>
                                    </LoadScript>
                                </div>
                                {/* Google map */}
                                <div className="flex rounded-md flex-grow sm:mt-5">
                                    <div className="flex justify-end items-end w-[100%] gap-4">
                                        <div className="cursor-pointer bg-[#502314] text-white px-5 py-2 rounded-md">
                                            แนบรูป
                                        </div>
                                        <div className="flex mt-2">
                                            {/* <div className="bg-[#502314] text-white px-5 py-2 rounded-md mr-2">
                                                ยืนยันออเดอร์
                                            </div> */}
                                            <div className="cursor-pointer bg-[#927364] text-white px-5 py-2 rounded-md">
                                                ยืนยันออเดอร์
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RiderOrder

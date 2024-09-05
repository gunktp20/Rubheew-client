import { IoIosArrowForward } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { LuClipboardCheck } from "react-icons/lu";
import { MdOutlineAccountBox } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiBankLine } from "react-icons/ri";
import { HiMenuAlt1 } from "react-icons/hi";
import Dialog from '../components/Dialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import GoogleMap from "../assets/images/penn1.webp"

function RiderOrder() {

    const orders = [
        { id: "10001" },
        { id: "10002" },
        { id: "10003" },
        { id: "10004" },
        { id: "10005" }
    ]

    const [open, setOpen] = useState(false)
    const { order_id } = useParams()
    // const [orders, setOrders] = useState([])

    // const fetchAllOrders = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:3000/orders")
    //     setOrders(response.data)
    //   } catch (err) {
    //     console.log(err)
    //   }
    // }

    // useEffect(() => {
    //   // ทำงานในนี้ทุกครั้งที่ หน้า จอถูก render ใหม่
    //   fetchAllOrders()

    // }, [])



    return (
        <div>
            {/* Main container */}
            <Dialog open={open} setOpen={setOpen} />

            <div className='flex flex-col h-svh'>
                {/* Navbar */}
                <div className='bg-[#f5ebdc] w-[100%] h-[50px] flex items-center shadow-md h-[64px] pl-6 '>
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
                    <div className='w-[100%] h-[100%] p-20 px-32 md:px-5 sm:px-5'>
                        <div className="bg-[#f5ebdc] w-[100%] flex-col p-7 rounded-lg">
                            <div className="text-[#714b3c] text-[27px] font-semibold">ออเดอร์ {order_id}</div>
                            <div className="bg-white my-4 h-[50px] flex items-center rounded-lg text-[#714b3c] text-[18px] pl-6">รหัสคำสั่งซื้อ : 10011</div>
                            <div className="bg-white my-4 h-[50px] flex items-center rounded-lg text-[#714b3c] text-[18px] pl-6">ที่อยู่ลูกค้า : The muse A</div>
                            <div className="flex pl-10 sm:flex-col sm:pl-0">
                                {/* Google map */}
                                <div className="flex border-[#502314] border-[5px] w-fit rounded-md">
                                    <img src={GoogleMap} className="w-[250px] sm:w-max"></img>
                                </div>
                                {/* Google map */}
                                <div className="flex rounded-md flex-grow sm:mt-5">
                                    <div className="flex flex-col justify-end items-end w-[100%]">
                                        <div className="bg-[#502314] text-white px-5 py-2 rounded-md">
                                            แนบรูป
                                        </div>
                                        <div className="flex mt-2">
                                            <div className="bg-[#502314] text-white px-5 py-2 rounded-md mr-2">
                                                ยืนยันออเดอร์
                                            </div>
                                            <div className="bg-[#927364] text-white px-5 py-2 rounded-md">
                                                เสร็จสิ้น
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

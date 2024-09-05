import { IoIosArrowForward } from "react-icons/io";
import { CgNotes } from "react-icons/cg";
import { LuClipboardCheck } from "react-icons/lu";
import { MdOutlineAccountBox } from "react-icons/md";
import { RiBankLine } from "react-icons/ri";
import { HiMenuAlt1 } from "react-icons/hi";
import Dialog from '../components/Dialog';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function RiderOrders() {
  // ใช้สำหรับนำทางไปหน้าอื่น
  const navigate = useNavigate()
  // ตัวแปรสำหรับ React โดยตัวแรกคือ ข้อมูล ตัวที่สองคือ function สำหรับการ set ค่าให้กับตัวแปร
  const [orders, setOrders] = useState([])

  // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile
  const [open, setOpen] = useState(false)

  // ดึงข้อมูลจาก API เพื่อเรียกดูข้อมูล orders ทั้งหมดของ rider คนนั้นๆ
  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders")
      setOrders(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect จะทำงานในทุกครั้งที่ Component ถูก render
  useEffect(() => {
    // ทำงานในนี้ทุกครั้งที่ หน้า จอถูก render ใหม่
    fetchAllOrders()
  }, [])

  return (
    <div>
      {/* Main container */}
      <Dialog open={open} setOpen={setOpen} />
      <div className='flex flex-col h-svh'>

        {/* Navbar */}
        <button className='bg-[#f5ebdc] w-[100%] h-[50px] flex items-center shadow-md h-[64px] pl-6 '>
          <div className='text-[35px] mr-6'>{'<'}</div>
          <div className='text-[20px] font-semibold'>คนส่ง</div>
        </button>

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
            <div className=' cursor-pointer w-[100%] h-[30px] hidden sm:block' onClick={() => {
              setOpen(!open)
            }}>
              <HiMenuAlt1 className='text-[30px] text-gray-500' />
            </div>
            {/* นำ Orders ทั้งหมดมา map เพื่อแสดงรายการ order ของ rider ทั้งหมด */}
            {orders.map((order, index) => {
              return (
                <div key={index} className='gap-2 flex flex-col text-[24px] text-[15px] h-max p-3 w-[100%] bg-[#f5ebdc] shadow-sm rounded-md flex items-center justify-between px-6'>
                  <div className="flex items-start w-[100%] mb-2">
                    <div className='text-[#714b3c] font-semibold text-[20px]'>ออเดอร์ {order.id}</div>
                  </div>
                  <div className="flex items-start w-[100%] items-center">
                    <div className='text-[#714b3c] font-semibold text-[15px] flex gap-3 items-center'><div className="text-sm font-normal">ปลายทาง : </div> <div>{order.destination}</div></div>
                  </div>
                  <div className="flex items-start w-[100%] items-center">
                    <div className='text-[#714b3c] font-semibold text-[15px] flex gap-3 items-center'><div className="text-sm font-normal">เบอร์ติดต่อ ผู้รับ : </div> <div>{order.phone_number}</div></div>
                  </div>
                  <div className="flex w-[100%] justify-end">
                    <button
                      onClick={() => {
                        // นำทางไปหน้า Confirm Order สำหรับ rider ด้วย order id เมื่อคลิก
                        navigate("/rider-order/" + order.id)
                      }}
                      className='bg-[#927364] text-white text-[14px] h-[35px] px-[15px] rounded-md'>
                      เสร็จสิ้น
                    </button>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
  )
}

export default RiderOrders

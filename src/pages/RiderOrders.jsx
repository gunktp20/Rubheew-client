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
import { useNavigate } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

function RiderOrders() {

  const [values, setValues] = useState({
    order_1: "",
    order_2: "",
    order_3: "",
    order_4: "",
    order_5: "",
  })

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarText, setSnackBarText] = useState("");
  const [snackBarType, setSnackBarType] = useState("error");

  const handleCloseSnackbar = () => {
    setSnackBarOpen(false)
    setSnackBarText("")
  }

  const [orders, setOrders] = useState([])

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:3000/orders")
      setOrders(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    // ทำงานในนี้ทุกครั้งที่ หน้า จอถูก render ใหม่
    fetchAllOrders()

  }, [])

  return (
    <div>
      {/* Main container */}
      <Dialog open={open} setOpen={setOpen} />
      <Snackbar
        open={snackBarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          severity={snackBarType}
          variant="filled"
          sx={{
            width: "100%",
            fontSize: "14px",
            alignItems: "center",
            paddingX: "2rem",
            border: snackBarType === "error" ? 1 : 0,
            borderColor: snackBarType === "error" ? "#d7414128" : null,
          }}
        >
          {snackBarText}
        </Alert>
      </Snackbar>
      
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
            <div className='w-[100%] h-[30px] hidden sm:block' onClick={() => {
                setOpen(!open)
              }}>
              <HiMenuAlt1 className='text-[30px] text-gray-500' />
            </div>

            {orders.map((order, index) => {
              return (
                <div className='gap-2 flex flex-col text-[24px] text-[15px] h-max p-3 w-[100%] bg-[#f5ebdc] shadow-sm rounded-md flex items-center justify-between px-6'>
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
                    <button onClick={()=>{
                      navigate("/rider-order/" + order.id)
                    }} className='bg-[#927364] text-white text-[14px] h-[35px] px-[15px] rounded-md'>เสร็จสิ้น</button>
                  </div>
                </div>
              )
            })}

            {/* <div className='w-[100%] h-[30px] hidden sm:block' onClick={() => {
              setOpen(!open)
            }}>
              <HiMenuAlt1 className='text-[30px] text-gray-500' />
            </div>
            <div className='font-semibold text-[30px] mb-7'>ออเดอร์</div>
            <div className='flex flex-col gap-4'>

                  <div className='text-[24px] text-[15px] h-[50px] w-[100%] bg-[#f5ebdc] shadow-sm rounded-md flex items-center justify-between px-6 '>
                    <div className='text-[#714b3c] font-semibold'>ออเดอร์ 1</div>
                    <input className='text-[#714b3c] value:pl-5 font-normal placeholder:font-semibold placeholder-[#714b3c] bg-transparent outline-none focus:outline focus:outline-[#714b3c] focus:outline-[1px] placeholder-text-right placeholder:text-center' onChange={(e)=>{
                      if(e.target.value.length === 7){
                        return
                      }
                      setValues({ ...values,[e.target.name]:e.target.value})
                    }} name={'order_1'} placeholder='ว่าง' value={values.order_1}></input>
                    <button onClick={()=>{
                      if(!values.order_1){
                        setSnackBarOpen(true)
                        setSnackBarText("กรุณากรอก หมายเลข Order")
                        return;
                      }
                      navigate("/rider-order/" + values.order_1)
                    }} className='bg-[#927364] text-white text-[14px] h-[35px] px-[15px] rounded-md'>เสร็จสิ้น</button>
                  </div>

                  <div className='text-[24px] text-[15px] h-[50px] w-[100%] bg-[#f5ebdc] shadow-sm rounded-md flex items-center justify-between px-6 '>
                    <div className='text-[#714b3c] font-semibold'>ออเดอร์ 2</div>
                    <input className='text-[#714b3c] value:pl-5 font-normal placeholder:font-semibold placeholder-[#714b3c] bg-transparent outline-none focus:outline focus:outline-[#714b3c] focus:outline-[1px] placeholder-text-right placeholder:text-center' onChange={(e)=>{
                       if(e.target.value.length === 7){
                        return
                      }
                      setValues({ ...values,[e.target.name]:e.target.value})
                    }} name={'order_2'} placeholder='ว่าง' value={values.order_2}></input>
                    <button onClick={()=>{
                       if(!values.order_2){
                        setSnackBarOpen(true)
                        setSnackBarText("กรุณากรอก หมายเลข Order")
                        return;
                      }
                      navigate("/rider-order/" + values.order_2)
                    }} className='bg-[#927364] text-white text-[14px] h-[35px] px-[15px] rounded-md'>เสร็จสิ้น</button>
                  </div>

                  <div className='text-[24px] text-[15px] h-[50px] w-[100%] bg-[#f5ebdc] shadow-sm rounded-md flex items-center justify-between px-6 '>
                    <div className='text-[#714b3c] font-semibold'>ออเดอร์ 3</div>
                    <input className='text-[#714b3c] value:pl-5 font-normal placeholder:font-semibold placeholder-[#714b3c] bg-transparent outline-none focus:outline focus:outline-[#714b3c] focus:outline-[1px] placeholder-text-right placeholder:text-center' onChange={(e)=>{
                       if(e.target.value.length === 7){
                        return
                      }
                      setValues({ ...values,[e.target.name]:e.target.value})
                    }} name={'order_3'} placeholder='ว่าง' value={values.order_3}></input>
                    <button onClick={()=>{
                       if(!values.order_3){
                        setSnackBarOpen(true)
                        setSnackBarText("กรุณากรอก หมายเลข Order")
                        return;
                      }
                      navigate("/rider-order/" + values.order_3)
                    }} className='bg-[#927364] text-white text-[14px] h-[35px] px-[15px] rounded-md'>เสร็จสิ้น</button>
                  </div>

                  <div className='text-[24px] text-[15px] h-[50px] w-[100%] bg-[#f5ebdc] shadow-sm rounded-md flex items-center justify-between px-6 '>
                    <div className='text-[#714b3c] font-semibold'>ออเดอร์ 4</div>
                    <input className='text-[#714b3c] value:pl-5 font-normal placeholder:font-semibold placeholder-[#714b3c] bg-transparent outline-none focus:outline focus:outline-[#714b3c] focus:outline-[1px] placeholder-text-right placeholder:text-center' onChange={(e)=>{
                       if(e.target.value.length === 7){
                        return
                      }
                      setValues({ ...values,[e.target.name]:e.target.value})
                    }} name={'order_4'} placeholder='ว่าง' value={values.order_4}></input>
                    <button onClick={()=>{
                       if(!values.order_4){
                        setSnackBarOpen(true)
                        setSnackBarText("กรุณากรอก หมายเลข Order")
                        return;
                      }
                      navigate("/rider-order/" + values.order_4)
                    }} className='bg-[#927364] text-white text-[14px] h-[35px] px-[15px] rounded-md'>เสร็จสิ้น</button>
                  </div>

                  <div className='text-[24px] text-[15px] h-[50px] w-[100%] bg-[#f5ebdc] shadow-sm rounded-md flex items-center justify-between px-6 '>
                    <div className='text-[#714b3c] font-semibold'>ออเดอร์ 5</div>
                    <input className='text-[#714b3c] value:pl-5 font-normal placeholder:font-semibold placeholder-[#714b3c] bg-transparent outline-none focus:outline focus:outline-[#714b3c] focus:outline-[1px] placeholder-text-right placeholder:text-center' onChange={(e)=>{
                      setValues({ ...values,[e.target.name]:e.target.value})
                    }} name={'order_5'} placeholder='ว่าง' value={values.order_5}></input>
                    <button onClick={()=>{
                      if(!values.order_5){
                        setSnackBarOpen(true)
                        setSnackBarText("กรุณากรอก หมายเลข Order")
                        return;
                      }
                     navigate("/rider-order/" + values.order_5)
                    }} className='bg-[#927364] text-white text-[14px] h-[35px] px-[15px] rounded-md'>เสร็จสิ้น</button>
                  </div>

            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiderOrders

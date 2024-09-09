import { NavLink } from "react-router-dom"

function Navbar() {
  return (
    <div className="flex gap-4 bg-gray-200 w-[100%] p-4 text-[12px] mb-5">
        <NavLink className="px-2 py-1 bg-gray-50 rounded-md border-b-[2px]" to="/register">สมัครสมาชิก ลูกค้า</NavLink>
        <NavLink className="px-2 py-1 bg-gray-50 rounded-md border-b-[2px]" to="/login">เข้าสู่ระบบ ลูกค้า</NavLink>
        <NavLink className="px-2 py-1 bg-gray-50 rounded-md border-b-[2px]" to="/vendor/register">สมัครสมาชิก ร้านค้า</NavLink>
        <NavLink className="px-2 py-1 bg-gray-50 rounded-md border-b-[2px]" to="/vendor/login">เข้าสู่ระบบ ร้านค้า</NavLink>
    </div>
  )
}

export default Navbar

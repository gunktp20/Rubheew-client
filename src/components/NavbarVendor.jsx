import { NavLink } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"

function NavbarVendor() {

    const { logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () =>{
    logout()
    navigate("/login")
  }

  return (
    <div className="flex gap-4 bg-gray-200 w-[100%] p-4 text-[12px] mb-5 justify-between">
      <div className="flex gap-4">
      <NavLink className="px-2 py-1 bg-gray-50 rounded-md border-b-[2px]" to="/vendor/insert-menu">เพิ่มเมนู</NavLink>
      <NavLink className="px-2 py-1 bg-gray-50 rounded-md border-b-[2px]" to="/vendor/menu/management">จัดการเมนู</NavLink>
      </div>
        <button className="" onClick={()=>{
          onLogout()
        }}>ออกจากระบบ</button>
    </div>
  )
}

export default NavbarVendor

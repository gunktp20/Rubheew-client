import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function NavbarCustomer() {

  const { logout } = useAuth()
  const navigate = useNavigate()

  const onLogout = () =>{
    logout()
    navigate("/login")
  }

  return (
    <div className="flex justify-end gap-4 bg-gray-200 w-[100%] p-4 text-[12px] mb-5">
        <button className="" onClick={()=>{
          onLogout()
        }}>ออกจากระบบ</button>
    </div>
  )
}

export default NavbarCustomer

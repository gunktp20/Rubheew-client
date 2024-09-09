import { useEffect, useState } from "react"
import api from "../service/api"
import NavbarCustomer from "../components/NavbarCustomer"

function Vendors() {

  const [menus ,setMenus] = useState([])
  const fetchAllMenus = async () =>{
      try{
        const { data } = await api.get("/menu/")
        console.log(data)
        setMenus(data.menus)
      }catch(err){
        console.log(err)
      }
  }

  useEffect(()=>{
    fetchAllMenus()
  },[])

  return (
    <div className="w-[100%] flex flex-col">
      <NavbarCustomer/>
      <div className="flex flex-col w-[100%] items-center justify-center">
      <div className="mb-6">อาหารทั้งหมด</div>
        <div className="grid grid-cols-4 gap-2 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 items-center justify-center">
          {menus.map((m, index) => {
            return (
              <div
                className="bg-blue-100 p-3 w-[300px] md:grid-cols-3 sm:grid-cols-2"
                key={index}
              >
                <div className="flex gap-2 items-center">ชื่อเมนู : <div className="text-sm">{m.menu_name}</div></div>
                <div>ราคา : {m.price}</div>
                <div className="bg-blue-300 w-[100%] h-[1px] my-2"></div>
                <div className="flex gap-2 mb-1">
                  ชื่อร้าน : {" "}
                  <div className="text-red-500">{m.vendor.vendor_name}</div>
                </div>
                <div className="flex gap-2 mb-1">
                  เบอร์ร้าน : {" "}
                  <div className="text-red-500">{m.vendor.phone_number}</div>
                </div>
                <div className="flex gap-2 mb-1">
                  สถานะ : {" "}
                  <div
                    className={`text-sm flex items-center ${
                      m.vendor.open ? "text-green-500" : "text-gray-400"
                    } `}
                  >
                    {m.vendor.open ? "เปิดให้บริการ" : "ปิดให้บริการ"}
                  </div>
                </div>
                <div className="flex gap-2 mb-1">
                  ประเภท : {" "}
                  <div className="text-purple-700 text-sm flex items-center">
                    {m.category.category_name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Vendors

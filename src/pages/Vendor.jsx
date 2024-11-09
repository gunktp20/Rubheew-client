import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate, useParams } from "react-router-dom";
import NavbarCustomer from "../components/NavbarCustomer";
import { useAuth } from "../context/AuthContext";
import { RiAddLargeLine } from "react-icons/ri";
import { MdSearchOff } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import NavbarVendor from "../components/NavbarVendor";
import NavbarRider from "../components/NavbarRider";
import NavbarAdmin from "../components/NavbarAdmin";
import Footer from "../components/Footer"

function Vendor() {
  const { vendor_id } = useParams();
  const navigate = useNavigate();
  const [menus, setMenus] = useState([]);
  const [vendorInfo, setVendorInfo] = useState(null);
  const {
    token,
    cartItemsNumber,
    setCartItemsNumber,
    vendor,
    rider,
    customer,
    admin,
  } = useAuth();

  const insertMenuToCart = async (menu_id) => {
    try {
      const { data } = await api.post(
        "/cart/",
        {
          menu_id,
          vendor_id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItemsNumber(cartItemsNumber + 1);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllMenusByVendorId = async () => {
    try {
      const { data } = await api.get("/menu/vendor/" + vendor_id);
      console.log(data);
      setMenus(data.menus);
    } catch (err) {
      console.log(err);
    }
  };

  const getVendorInfo = async () => {
    try {
      const { data } = await api.get("/vendor/" + vendor_id);
      console.log(data);
      setVendorInfo(data);
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAllMenusByVendorId();
    getVendorInfo();
  }, []);

  return (
    <div className="flex flex-col h-[100%] bg-[#fcfcf9]">
      {vendor && <NavbarVendor />}
      {rider && <NavbarRider />}
      {customer && <NavbarCustomer />}
      {admin && <NavbarAdmin />}

      <div className="flex h-[100%] flex-col items-center">
        <div className="mb-6">อาหารทั้งหมด</div>
        {/* vendor container info */}
        <div className="flex w-[70%] gap-3 sm:flex-col justify-between border-[1px] shadow-sm rounded-sm bg-white p-5 mb-5 xl:w-[80%] lg:w-[85%] md:w-[85%] sm:w-[90%] sm:p-3">
          <div className="flex items-center gap-3">
            <div>
              <img
                className="w-[70px]"
                src={`http://localhost:5000/image/vendor/${vendorInfo?.image}`}
              ></img>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex text-[15px]">{vendorInfo?.vendor_name}</div>
              <div className="flex text-[12px]">
                {/* เบอร์ติดต่อ {cart.vendor.phone_number} */}
                อาหารทั้งหมด {menus?.length} รายการ
              </div>
              <div className="flex text-[12px]">
                สถานะร้านค้า{" "}
                <div
                  className={`ml-2 ${
                    vendorInfo?.open
                      ? "bg-green-500 text-white px-3 rounded-sm"
                      : "bg-gray-100 text-gray-400 px-3 rounded-sm"
                  }`}
                >
                  {vendorInfo?.open ? "เปิดให้บริการ" : "ไม่พร้อมให้บริการ"}
                </div>
              </div>
              
            </div>
            {/* end */}
          </div>
          {/* end */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-2">
              <div className="flex text-[13px]">รายละเอียดข่าวสาร เปิด / ปิด และ อื่นๆ</div>
              <div className="flex text-[12px] text-[#555555]">
                {/* เบอร์ติดต่อ {cart.vendor.phone_number} */}
                {vendorInfo?.description}
              </div>
              
            </div>
            {/* end */}
          </div>
          {/* end */}
        </div>

        {menus?.length == 0 && (
          <div className="mt-7 flex rounded-sm justify-center items-center h-[300px] w-[80%]">
            <div className="flex flex-col justify-center items-center">
              <MdSearchOff className="text-[100px] text-[#00000030]" />
              <div className="text-[#00000030] text-[13px] font-semibold">
                ร้านยังไม่มีรายการอาหารสำหรับคุณ
              </div>
              <button
                onClick={() => {
                  // dispatch(setCreateVisible(!createBoardVisible))
                  navigate("/");
                }}
                className="text-[#f54749] border-[#f54749] border-[1px] px-5 outline-none text-[15px] mt-4 h-[40px] rounded-sm transition-all hover:border-[#f54749] hover:bg-[#f54749] hover:shadow-sm hover:text-white"
              >
                เลือกรายการอาหารร้านอื่น
              </button>
            </div>
          </div>
        )}
        {/* grid container */}
        <div>
          <div className="grid grid-cols-5 gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
            {menus.map((m, index) => {
              return (
                <div
                  className="hover:shadow-md cursor-pointer transition-all bg-white shadow-sm p-3 w-[200px] border-[1px]"
                  key={index}
                >
                  <div>
                    <img
                      src={`http://localhost:5000/image/menu/${m.image}`}
                    ></img>
                  </div>
                  <div className="flex gap-2 mb-1 items-center mt-2 text-[17px]">
                    {m.menu_name}
                  </div>
                  <div className="text-[#a3a3a3] text-[14px]">
                    {m.price} บาท
                  </div>
                  <div className="w-[100%] h-[1px] bg-[#ededed] mb-3 mt-2"></div>
                  <div className="bg-[#f5474a1c] rounded-lg flex w-fit px-4 text-[#f54749] text-[13.7px] shadow-sm border-[#f5474a28] border-[1px]">
                    {m.category.category_name}
                  </div>

                  {customer && (
                    <button
                      onClick={() => {
                        insertMenuToCart(m.id);
                      }}
                      className="bg-[#f54749] hover:bg-[#e44245] text-white flex justify-center items-center gap-2 shadow-sm rounded-sm px-3 text-sm mt-3 h-[29px]"
                    >
                      เพิ่มลงตะกร้า <RiAddLargeLine />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
            <Footer position={"relative"}/>
    </div>
  );
}

export default Vendor;

// {menus.map((m, index) => {
//   return (
//     <div
//       className="bg-white shadow-sm p-3 w-[200px] md:grid-cols-3 sm:grid-cols-2"
//       key={index}
//     >
//       <div>
//         <img
//           src={`http://localhost:5000/image/menu/${m.image}`}
//         ></img>
//       </div>
//       <div className="flex gap-2 items-center mt-2 text-[17px]">
//         {m.menu_name}
//       </div>
//       <div className="text-[#a3a3a3] text-sm">{m.price}</div>
//       <div className="w-[100%] h-[1px] bg-[#f7f7f7] mb-3 mt-2"></div>
//       <div className="bg-[#f5474a1c] rounded-lg flex w-fit px-4 text-[#f54749] text-[13.7px] shadow-sm border-[#f5474a28] border-[1px]">
//         {m.category.category_name}
//       </div>

//       <button
//         onClick={() => {
//           insertMenuToCart(m.id);
//         }}
//         className="bg-[#f54749] text-white flex justify-center items-center gap-2 shadow-sm rounded-sm px-3 text-sm mt-3 h-[29px]"
//       >
//         เพิ่มลงตะกร้า <RiAddLargeLine />
//       </button>
//     </div>
//   );
// })}

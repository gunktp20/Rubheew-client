import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useEffect, useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { BiSolidStore } from "react-icons/bi";

function NavbarVendor({ open, setOpen }) {
  const { logout, vendor, token } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const [vendorInfo, setVendorInfo] = useState(true);
  const [pendingOrders, setPendingOrders] = useState([]);

  const getVendorInfo = async () => {
    try {
      const { data } = await api.get("/vendor/" + vendor.id);
      setVendorInfo(data);
    } catch (err) {
      console.log(err);
    }
  };
  const getPendingVendorOrders = async () => {
    try {
      const { data } = await api.get("/order/vendor/pending", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPendingOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleVendorOpen = async () => {
    try {
      await api.put(
        "/vendor/toggle-open",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setVendorInfo({ ...vendorInfo, open: !vendorInfo.open });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getVendorInfo();
    getPendingVendorOrders();
  }, []);

  return (
    <div className="z-[10] flex gap-4 bg-[#f54749] w-[100%] p-4 text-[12px] mb-5 justify-between">
      <div
        className=" cursor-pointer hidden sm:block h-fit"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <HiMenuAlt1 className="text-[25px] text-white" />
      </div>

      <div className="text-[30px] hidden sm:flex items-center text-white gap-2">
        <BiSolidStore className="text-white" />
        <div className="text-[15px]">ร้านค้า</div>
      </div>

      <div className={`flex gap-4 sm:hidden`}>
        <div className="text-[30px]">
          <BiSolidStore className="text-white" />
        </div>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/vendor/insert-menu"
        >
          เพิ่มเมนู
        </NavLink>

        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/vendor/menu/management"
        >
          จัดการเมนู
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/vendor/information/management"
        >
          ข้อมูลร้านค้า
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/vendor/rider/insert"
        >
          เพิ่มคนขับ
        </NavLink>
        <NavLink
          className="px-2 py-1 relative rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/vendor/orders/list"
        >
          ออเดอร์ของร้านค้า
          {pendingOrders > 1 && (
            <div className=" z-[5] absolute right-[-7px] top-[-4px] bg-[#f63437] text-[#fff] shadow-md text-[11px] rounded-full w-[20px] h-[20px] flex justify-center items-center">
              {pendingOrders}
            </div>
          )}
        </NavLink>
      </div>

      <div className="flex">
        <button
          onClick={toggleVendorOpen}
          className={`mr-5 bg-white shadow-sm px-5 border-l-[5px] ${
            vendorInfo?.open
              ? "text-green-500 border-l-green-500"
              : "text-gray-400 border-l-gray-400"
          }`}
        >
          {vendorInfo?.open ? "เปิดให้บริการ" : "ปิดให้บริการ"}
        </button>

        <button
          className="text-white"
          onClick={() => {
            onLogout();
          }}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}

export default NavbarVendor;

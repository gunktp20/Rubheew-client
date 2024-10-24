import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiFillTool } from "react-icons/ai";
import { GoChecklist } from "react-icons/go";
import { memo, useEffect } from "react";
import api from "../service/api";
import { FaUser } from "react-icons/fa6";
import { HiMenuAlt1 } from "react-icons/hi";

function NavbarAdmin({ open, setOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="z-[10] flex justify-between gap-7 bg-[#f54749] w-[100%] p-4 text-[12px] mb-5 items-center">
      <div
        className=" cursor-pointer hidden sm:block h-fit"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <HiMenuAlt1 className="text-[25px] text-white" />
      </div>

      <div className="text-[30px] hidden sm:flex items-center text-white gap-2">
        <AiFillTool className="text-white" />
        <div className="text-[15px]">ผู้ดูแลระบบ</div>
      </div>

      <div className={`flex gap-4 sm:hidden`}>
        <div className="text-[30px]">
          <AiFillTool className="text-white" />
        </div>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/admin/vendors/registrations"
        >
          การลงทะเบียนร้านค้า
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/admin/vendors/"
        >
          จัดการร้านค้า
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/admin/reports/"
        >
          รายงานทั้งหมด
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/admin/delivery-cost/"
        >
          จัดการค่าจัดส่ง
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/admin/promotions/"
        >
          โปรโมชั่น
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/admin/categories/"
        >
          ประเภทอาหาร
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
          to="/admin/destinations/"
        >
          จัดการปลายทาง
        </NavLink>
      </div>

      <button
        className="text-white"
        onClick={() => {
          onLogout();
        }}
      >
        ออกจากระบบ
      </button>
    </div>
  );
}

export default memo(NavbarAdmin);

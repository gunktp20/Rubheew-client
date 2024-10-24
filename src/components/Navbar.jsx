import { HiMenuAlt1 } from "react-icons/hi";
import { NavLink } from "react-router-dom";

function Navbar({ setOpen, open }) {
  return (
    <div className="flex z-[10] gap-6 bg-[#f54749] w-[100%] p-4 text-[12px] mb-5">
      <div
        className=" cursor-pointer hidden sm:block h-fit"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <HiMenuAlt1 className="text-[25px] text-white" />
      </div>

      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40] sm:hidden  text-white"
        to="/register"
      >
        สมัครสมาชิก ลูกค้า
      </NavLink>
      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40] sm:hidden  text-white"
        to="/login"
      >
        เข้าสู่ระบบ ลูกค้า
      </NavLink>
      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40] sm:hidden text-white"
        to="/vendor/register"
      >
        สมัครสมาชิก ร้านค้า
      </NavLink>
      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40] sm:hidden text-white"
        to="/vendor/login"
      >
        เข้าสู่ระบบ ร้านค้า
      </NavLink>
      <div className="h-[100%] w-[1px] bg-white sm:hidden"></div>
      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40] sm:hidden text-white"
        to="/rider/register"
      >
        สมัครสมาชิก คนขับ
      </NavLink>
      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40] sm:hidden text-white"
        to="/rider/login"
      >
        เข้าสู่ระบบ คนขับ
      </NavLink>
      {/* admin operations */}
      <div className="h-[100%] w-[1px] bg-white sm:hidden"></div>
      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40] sm:hidden text-white"
        to="/admin/login"
      >
        เข้าสู่ระบบ ผู้ดูแล
      </NavLink>
    </div>
  );
}

export default Navbar;

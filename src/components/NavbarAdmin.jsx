import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiFillTool } from "react-icons/ai";
import React, { memo } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaUserCircle } from "react-icons/fa";

function NavbarAdmin({ open, setOpen }) {
  const { logout , admin} = useAuth();
  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = () => {
    setAnchorElUser(true);
  };

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
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

      <Box sx={{ flexGrow: 0 }}>
        <Box
          onClick={() => {
            handleOpenUserMenu();
          }}
          className="px-4 py-1  rounded-md bg-[#d53e40] sm:bg-transparent text-white cursor-pointer gap-2 flex items-center"
        >
          <FaUserCircle className="w-[20px] h-[20px] sm:w-[25px] sm:h-[25px]" />
          <div className="sm:hidden">{admin.username}</div>
        </Box>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          <MenuItem
            onClick={() => {
              handleCloseUserMenu();
              onLogout();
            }}
          >
            <Typography sx={{ textAlign: "center", fontSize: "13px" }}>
              ออกจากระบบ
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}

export default memo(NavbarAdmin);

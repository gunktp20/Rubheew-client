import { HiMenuAlt1 } from "react-icons/hi";
import { NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

function Navbar({ setOpen, open }) {
  // State for Customer menu
  const [anchorElCustomer, setAnchorElCustomer] = React.useState(null);

  const handleOpenCustomerMenu = (event) => {
    setAnchorElCustomer(event.currentTarget);
  };
  const handleCloseCustomerMenu = () => {
    setAnchorElCustomer(false);
  };
  // State for Vendor menu
  const [anchorElVendor, setAnchorElVendor] = React.useState(null);

  const handleOpenVendorMenu = (event) => {
    setAnchorElVendor(event.currentTarget);
  };
  const handleCloseVendorMenu = () => {
    setAnchorElVendor(false);
  };
  // State for Rider menu
  const [anchorElRider, setAnchorElRider] = React.useState(null);

  const handleOpenRiderMenu = (event) => {
    setAnchorElRider(event.currentTarget);
  };
  const handleCloseRiderMenu = () => {
    setAnchorElRider(false);
  };

  // navigator
  const navigate = useNavigate();

  return (
    <div className="flex z-[10] gap-6 bg-[#f54749] w-[100%] p-4 text-[12px] mb-5 justify-end">

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="ตัวเลือก ผู้ใช้งานลูกค้า">
          <Box
            onClick={handleOpenCustomerMenu}
            className="px-4 py-1  rounded-md bg-[#d53e40]  text-white cursor-pointer gap-2 flex items-center"
          >
            <PersonIcon sx={{ width: "22px" }} />
            ลูกค้าทั่วไป
          </Box>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElCustomer}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElCustomer)}
          onClose={handleCloseCustomerMenu}
        >
          <MenuItem onClick={() => {
            navigate("/login");
          }}>
            <Typography
              sx={{ textAlign: "center", fontSize: "12px" }}
              onClick={() => {
                navigate("/login");
              }}
            >
              เข้าสู่ระบบ
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => {
            navigate("/register");
          }}>
            <Typography
              sx={{ textAlign: "center", fontSize: "12px" }}
              onClick={() => {
                navigate("/register");
              }}
            >
              สมัครสมาชิก
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="ตัวเลือก ร้านค้า">
          <Box
            onClick={handleOpenVendorMenu}
            className="px-4 py-1  rounded-md bg-[#d53e40]  text-white cursor-pointer gap-2 flex items-center"
          >
            <StoreIcon sx={{ width: "22px" }} />
            ร้านค้า
          </Box>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElVendor}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElVendor)}
          onClose={handleCloseVendorMenu}
        >
          <MenuItem onClick={() => {
            navigate("/vendor/login");
          }}>
            <Typography
              sx={{ textAlign: "center", fontSize: "12px" }}
              onClick={() => {
                navigate("/vendor/login");
              }}
            >
              เข้าสู่ระบบ
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => {
            navigate("/vendor/register");
          }}>
            <Typography
              sx={{ textAlign: "center", fontSize: "12px" }}
              onClick={() => {
                navigate("/vendor/register");
              }}
            >
              สมัครสมาชิก
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="ตัวเลือก ผู้ขับ">
          <Box
            onClick={handleOpenRiderMenu}
            className="px-4 py-1  rounded-md bg-[#d53e40]  text-white cursor-pointer gap-2 flex items-center"
          >
            <DeliveryDiningIcon sx={{ width: "22px" }} />
            ผู้ขับ
          </Box>
        </Tooltip>
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElRider}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElRider)}
          onClose={handleCloseRiderMenu}
        >
          <MenuItem onClick={() => {
            navigate("/rider/login");
          }}>
            <Typography
              sx={{ textAlign: "center", fontSize: "12px" }}
              onClick={() => {
                navigate("/rider/login");
              }}
            >
              เข้าสู่ระบบ
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => {
            navigate("/rider/register");
          }}>
            <Typography
              sx={{ textAlign: "center", fontSize: "12px" }}
              onClick={() => {
                navigate("/rider/register");
              }}
            >
              สมัครสมาชิก
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
    </div>
  );
}

export default Navbar;

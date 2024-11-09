import { useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsCart2 } from "react-icons/bs";
import { GoChecklist } from "react-icons/go";
import React, { memo, useEffect } from "react";
import api from "../service/api";
import { FaUserCircle } from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

function NavbarCustomer() {
  const { logout, cartItemsNumber, setCartItemsNumber, customer } = useAuth();
  const navigate = useNavigate();
  const { token, vendor, rider } = useAuth();

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

  const getCartItemsNumber = async () => {
    try {
      const { data } = await api.get("/cart-item/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setCartItemsNumber(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCartItemsNumber();
  }, []);

  return (
    <div className="z-[10] flex justify-end gap-7 bg-[#f54749] w-[100%] p-4 text-[12px] mb-5 items-center sm:p-2 sm:gap-4">
      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
        to="/"
      >
        หน้าหลัก
      </NavLink>
      <NavLink
        className="px-2 py-1  rounded-md bg-[#d53e40]  text-white flex justify-center items-center"
        to="/report"
      >
        รายงานปัญหา
      </NavLink>

      <div
        onClick={() => {
          navigate("/orders");
        }}
        className={`relative ${
          vendor || rider ? "hidden" : "flex items-center text-white gap-2"
        }`}
      >
        <GoChecklist className="text-[26px] cursor-pointer text-white" />
        {/* <div
          className={`${
            cartItemsNumber > 0 ? "flex" : "hidden"
          } bg-[#fff] rounded-[100%] font-semibold border-[3px] border-[#FF5733] text-[#df7e0d] text-center absolute cursor-pointer top-[-3px] right-[-10px] w-[20px] h-[20px] text-[11px] p-1 flex items-center justify-center`}
        >
          {cartItemsNumber}
        </div> */}

        <div
          className={`${
            vendor || rider ? "hidden" : "cursor-pointer"
          } sm:hidden`}
          onClick={() => {
            navigate("/orders");
          }}
        >
          ออเดอร์ของคุณ
        </div>
      </div>
      <div
        className={`${
          customer ? "h-[100%] w-[1px] bg-[#ffffff67] " : "hidden"
        }`}
      ></div>

      <div className="flex items-center text-white gap-2">
        <div
          onClick={() => {
            navigate("/cart");
          }}
          className={`relative ${
            vendor || rider ? "hidden" : "flex items-center text-white gap-2"
          }`}
        >
          <BsCart2 className="text-[26px] cursor-pointer text-white" />
          <div
            className={`${
              cartItemsNumber > 0 ? "flex" : "hidden"
            } bg-[#fff] rounded-[100%] font-semibold border-[3px] border-[#FF5733] text-[#df7e0d] text-center absolute cursor-pointer top-[-3px] right-[-10px] w-[20px] h-[20px] text-[11px] p-1 flex items-center justify-center`}
          >
            {cartItemsNumber}
          </div>
        </div>
        <div
          className={`${
            vendor || rider ? "hidden" : "cursor-pointer"
          } sm:hidden`}
          onClick={() => {
            navigate("/cart");
          }}
        >
          ตะกร้าสินค้า
        </div>
      </div>

      <Box sx={{ flexGrow: 0 }}>
        <Box
          onClick={() => {
            handleOpenUserMenu();
          }}
          className="px-4 py-1  rounded-md bg-[#d53e40] sm:hidden  text-white cursor-pointer gap-2 flex items-center"
        >
          <FaUserCircle className="w-[20px] h-[20px] " />
          {customer.fname}-{customer.lname}
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

export default memo(NavbarCustomer);

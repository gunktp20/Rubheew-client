import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { MdDeliveryDining } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";

function NavbarRider({ open, setOpen }) {
  const { logout , rider } = useAuth();
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/login");
  };

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = () => {
    setAnchorElUser(true);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //   const [vendorInfo, setVendorInfo] = useState(true);

  //   const getVendorInfo = async () => {
  //     try {
  //       const { data } = await api.get("/vendor/" + vendor.id);
  //       setVendorInfo(data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   const toggleVendorOpen = async () => {
  //     try {
  //       await api.put(
  //         "/vendor/toggle-open",
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       setVendorInfo({ ...vendorInfo, open: !vendorInfo.open });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   useEffect(() => {
  //     getVendorInfo();
  //   }, []);

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
        <MdDeliveryDining className="text-white" />
        <div className="text-[15px]">Rider</div>
      </div>

      <div className={`flex gap-4 sm:hidden items-center`}>
        <div className="text-[30px]">
          <MdDeliveryDining className="text-white" />
        </div>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white"
          to="/rider/orders"
        >
          ออเดอร์ของคุณ
        </NavLink>

        {/* <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white"
          to="/vendor/menu/management"
        >
          จัดการเมนู
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white"
          to="/vendor/change/phone-number"
        >
          เบอร์ติดต่อร้าน
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white"
          to="/vendor/rider/insert"
        >
          เพิ่มคนขับ
        </NavLink>
        <NavLink
          className="px-2 py-1  rounded-md bg-[#d53e40]  text-white"
          to="/vendor/orders/list"
        >
          ออเดอร์ของร้านค้า
        </NavLink> */}
      </div>

      <Box sx={{ flexGrow: 0 }}>
        <Box
          onClick={() => {
            handleOpenUserMenu();
          }}
          className="px-4 py-1  rounded-md bg-[#d53e40] sm:hidden  text-white cursor-pointer gap-2 flex items-center"
        >
          <FaUserCircle className="w-[20px] h-[20px] " />
          {rider.fname}-{rider.lname}
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

export default NavbarRider;

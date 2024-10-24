import * as React from "react";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { CgNotes } from "react-icons/cg";
import { LuClipboardCheck } from "react-icons/lu";
import { MdOutlineAccountBox } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiBankLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VendorDialog({ open, setOpen }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative", backgroundColor: "#f54749" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="#000"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className="flex flex-col">
          <NavLink
            className="px-5 rounded-md my-4 cursor-pointer hover:text-[#af3436] transition-all"
            to="/vendor/insert-menu"
          >
            เพิ่มเมนู
          </NavLink>

          <NavLink
            className="px-5 rounded-md my-4 cursor-pointer hover:text-[#af3436] transition-all"
            to="/vendor/menu/management"
          >
            จัดการเมนู
          </NavLink>
          <NavLink
            className="px-5 rounded-md my-4 cursor-pointer hover:text-[#af3436] transition-all"
            to="/vendor/information/management"
          >
            ข้อมูลร้านค้า
          </NavLink>
          <NavLink
            className="px-5 rounded-md my-4 cursor-pointer hover:text-[#af3436] transition-all"
            to="/vendor/rider/insert"
          >
            เพิ่มคนขับ
          </NavLink>
          <NavLink
            className="px-5 rounded-md my-4 cursor-pointer hover:text-[#af3436] transition-all"
            to="/vendor/orders/list"
          >
            ออเดอร์ของร้านค้า
          </NavLink>
        </List>
      </Dialog>
    </React.Fragment>
  );
}

import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { CgNotes } from "react-icons/cg";
import { LuClipboardCheck } from "react-icons/lu";
import { MdOutlineAccountBox } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiBankLine } from "react-icons/ri";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, setOpen }) {

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
                <AppBar sx={{ position: 'relative', backgroundColor: "#f5ebdc" }}>
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
                <List>
                    <div className='py-6 pl-5 cursor-pointer flex gap-6 text-lg items-center text-[#714b3c]'>
                        <CgNotes className='text-[24px]'/> ข้อมูลส่วนตัว
                    </div>
                    <div className='py-6 pl-5 cursor-pointer flex gap-6 text-lg items-center text-[#714b3c]'>
                        <LuClipboardCheck className='text-[24px]'/> จำนวนออเดอร์
                    </div>
                    <div className='py-6 pl-5 cursor-pointer flex gap-6 text-lg items-center text-[#714b3c]'>
                        <MdOutlineAccountBox className='text-[24px]'/> ติดต่อเรา Reb Heew
                    </div>
                    <div className='py-6 pl-5 cursor-pointer flex gap-6 text-lg items-center text-[#714b3c]'>
                        <RiAccountCircleLine className='text-[24px]'/> โปรไฟล์ส่วนตัว
                    </div>
                    <div className='py-6 pl-5 cursor-pointer flex gap-6 text-lg items-center text-[#714b3c]'>
                        <RiBankLine className='text-[24px]'/> บัญชีธนาคาร
                    </div>
                </List>
            </Dialog>
        </React.Fragment>
    );
}
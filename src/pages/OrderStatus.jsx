import GoogleMap from "../assets/images/penn1.webp";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";

const steps = [
  {
    label: "คำสั่งซื้อกำลังดำเนินการ",
  },
  {
    label: "รับออเดอร์",
  },
  {
    label: "คำสั่งซื้อของคุณอยู่ในครัว",
  },
  {
    label: "เตรียมจัดส่ง",
  },
  {
    label: "ยืนยันการจัดส่ง",
  },
  {
    label: "คำสั่งซื้อเสร็จสมบูรณ์",
  },
];

function OrderStatus() {
  const [activeStep, setActiveStep] = React.useState(6);

  return (
    <div>
      {/* Navbar */}
      <button className="bg-[#f5ebdc] w-[100%] h-[50px] flex items-center shadow-md h-[64px] pl-6 ">
        <div className="text-[35px] mr-6">{"<"}</div>
        <div className="text-[20px] font-semibold">ก๋วยเตี๋ยวหมูสด</div>
      </button>

      <div className="flex flex-col w-[100%] justify-center items-center pt-10">
        <div className="flex w-[48%] gap-6 justify-between md:w-[70%] sm:w-[60%] sm:flex-col">
          {/* img */}
          <div className="flex border-[#502314] border-[5px] w-fit rounded-md">
            <img src={GoogleMap} className="w-[300px] sm:w-max"></img>
          </div>
          {/* status */}
          <div className="flex flex-col">
            <div className="text-[24px] text-[#61392b]">
              คำสั่งซื้อ ก๋วยเตี๋ยวหมูสด
            </div>
            <div className="w-[100%] h-[2px] my-3 bg-[#61392b98]"></div>
            {/* <div className="flex flex-col gap-5">
                <div>คำสั่งซื้อกำลังดำเนินการ</div>
                <div>รับออเดอร์</div>
                <div>คำสั่งซื้อของคุณอยู่ในครัว</div>
                <div>เตรียมจัดส่ง</div>
                <div>ยืนยันการจัดส่ง</div>
                <div>คำสั่งซื้อเสร็จสมบูรณ์</div>
            </div> */}
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step
                    key={step.label}
                    sx={{
                      "& .MuiStepLabel-root .Mui-completed": {
                        color: "#1fd249d7", // circle color (COMPLETED)
                      },
                      "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                        {
                          color: "grey.500", // Just text label (COMPLETED)
                        },
                      "& .MuiStepLabel-root .Mui-active": {
                        color: "secondary.main", // circle color (ACTIVE)
                      },
                      "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                        {
                          color: "common.white", // Just text label (ACTIVE)
                        },
                      "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                        fill: "black", // circle's number (ACTIVE)
                      },
                    }}
                  >
                    <StepLabel
                      optional={
                        index === steps.length - 1 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
        </div>
        <button className="bg-[#a91c00] text-white sm:w-[70%] w-[30%] h-[55px] flex justify-center items-center rounded-full text-[18px] mt-10">ฉันได้รับสินค้าแล้ว</button>
      </div>
    </div>
  );
}

export default OrderStatus;

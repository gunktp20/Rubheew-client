import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer } from '@react-google-maps/api';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

  // const [directionsResponse, setDirectionsResponse] = React.useState(null);

  // const origin = { lat: 13.7563, lng: 100.5018 };
  // const destination = { lat: 13.7455, lng: 100.5350 };

  // const position = {
  //   lat: 13.7563,
  //   lng: 100.5018
  // };

  const themuse = {
    lat: 14.02208605520346,
    lng: 99.99250628669407
  }

  const kasetsart = {
    lat: 14.021952142943354,
    lng: 99.99012384812518
  }


  const mapOptions = {
    disableDefaultUI: true, // ปิดการแสดง UI ปกติของ Google Maps
    styles: [
      {
        featureType: "poi", // ปิดการแสดงสถานที่อื่นๆ เช่น ร้านอาหาร
        elementType: "labels",
        stylers: [{ visibility: "on" }],
      },
      {
        featureType: "transit", // ปิดการแสดงระบบขนส่งสาธารณะ
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
      {
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "off" }],
      },
    ],
  };

  // const fetchDirections = () => {
  //   const directionsService = new google.maps.DirectionsService();
  //   directionsService.route(
  //     {
  //       origin: origin,
  //       destination: destination,
  //       travelMode: google.maps.TravelMode.DRIVING, // กำหนดการเดินทางเป็นขับรถ
  //     },
  //     (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         setDirectionsResponse(result);
  //         console.log('Directions result:', result);
  //       } else {
  //         console.error(`Error fetching directions: ${status}`);
  //       }
  //     }
  //   );
  // };

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
  };

  // const center = position

  React.useEffect(() => {
    // fetchDirections();
  }, []);

  const [destination, setDestination] = React.useState(null);

  const handleChange = (event) => {
    setDestination(event.target.value);
  };

  return (
    <div>
      {/* Navbar */}
      <button className="bg-[#f5ebdc] w-[100%] flex items-center shadow-md h-[64px] pl-6 ">
        <div className="text-[35px] mr-6">{"<"}</div>
        <div className="text-[20px] font-semibold">ก๋วยเตี๋ยวหมูสด</div>
      </button>
      <div className="flex flex-col w-[100%] justify-center items-center pt-10">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-simple-select-standard-label">เลือกตำแหน่งที่ตั้งของคุณ</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={destination}
            onChange={handleChange}
            label="Age"
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>The Muse</MenuItem>
            <MenuItem value={2}>มหาลัยเกษตรศาสตร์ กําแพงแสน</MenuItem>
          </Select>
        </FormControl>
        <div className="flex w-[48%] gap-6 justify-between md:w-[70%] sm:w-[80%] sm:flex-col md:flex-col">
          {/* img */}
          {destination && <LoadScript
            googleMapsApiKey={"AIzaSyDakKAIrjvqKRXzVvOfJut27nHbJ94SMTo"}
            libraries={["places"]}
            loadingElement={<div>Loading...</div>}
          >
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={destination === 1 ? themuse: kasetsart}
              zoom={15}
              options={mapOptions}
            >
              {/* <Marker position={origin} /> */}
              <Marker position={destination === 1 ? themuse: kasetsart} />

              {/* {directionsResponse && <DirectionsRenderer directions={directionsResponse} />} */}
            </GoogleMap>
          </LoadScript>
          }
          
          {/* status */}
          {destination && <div className="flex flex-col">
            <div className="text-[24px] text-[#61392b]">
              คำสั่งซื้อ ก๋วยเตี๋ยวหมูสด
            </div>
            <div className="w-[100%] h-[2px] my-3 bg-[#61392b98]"></div>
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
          }

        </div>
        <button className="bg-[#a91c00] text-white sm:w-[70%] w-[30%] h-[55px] flex justify-center items-center rounded-full text-[18px] mt-10">ฉันได้รับสินค้าแล้ว</button>
      </div>
    </div>
  );
}

export default OrderStatus;

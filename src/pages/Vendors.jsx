import api from "../service/api";
import NavbarCustomer from "../components/NavbarCustomer";
import { useNavigate } from "react-router-dom";
import { MdSearchOff } from "react-icons/md";
import { InputAdornment, TextField } from "@mui/material";
import { IoSearchSharp } from "react-icons/io5";
import { ChangeEvent, useCallback, useEffect, useState, useRef } from "react";
import { debounce } from "lodash";
import { useAuth } from "../context/AuthContext";
import NavbarVendor from "../components/NavbarVendor";
import NavbarRider from "../components/NavbarRider";
import NavbarAdmin from "../components/NavbarAdmin";
import CarouselRubheew from "../components/CarouselRubheew";
import TailwindCarousel from "../components/TailwindCarousel.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`absolute top-[50%] left-[-25px] transform -translate-y-1/2 flex text-[#8b8b8b] items-center justify-center text-[17px] w-[32px] h-[58px] rounded-md transition-all hover:text-[22px] hover:h-[62px] hover:w-[37px] z-[5]`}
    >
      <MdOutlineArrowBackIosNew />
    </button>
  );
};

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className={`absolute top-[50%] right-[-25px] transform -translate-y-1/2 flex text-[#8b8b8b] items-center justify-center text-[17px] w-[32px] h-[58px] rounded-md transition-all hover:text-[22px] hover:h-[62px] hover:w-[37px] z-[5]`}
    >
      <MdOutlineArrowForwardIos />
    </button>
  );
};

const settings = {
  // infinite: true,
  speed: 200,
  slidesToShow: 6,
  slidesToScroll: 5,
  autoplay: true,
  autoplaySpeed: 9000,
  pauseOnHover: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
      },
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
      breakpoint: 900,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
      },
    },
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
      },
    },
  ],
};

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const isFirstRender = useRef(true);
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const limitQuery = 5;
  const [numOfPage, setNumOfPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const [selectedCategory, setSelectedCategory] = useState("");
  const { vendor, customer, rider, admin } = useAuth();

  const debouncedFetch = useCallback(
    debounce((value) => {
      fetchAllVendors(value);
    }, 500),
    [numOfPage]
  );

  const handleSearch = (event) => {
    const { value } = event.target;
    setQuery(value);
    debouncedFetch(value);
  };

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const { data } = await api.get("/category");
      console.log(data);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllVendors = async (queryParam) => {
    try {
      const { data } = await api.get(
        `/vendor?limit=${limitQuery}&numOfPage=${numOfPage}&query=${queryParam}&category_id=${selectedCategory}`
      );
      console.log(data);
      setVendors(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCategories();
    fetchAllVendors(query);
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      fetchAllVendors(query);
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col h-[100%] bg-[#fcfcf9] pb-10 overflow-hidden">
      {vendor && <NavbarVendor />}
      {rider && <NavbarRider />}
      {customer && <NavbarCustomer />}
      {admin && <NavbarAdmin />}
      {/* <CarouselRubheew /> */}
      <TailwindCarousel />

      <div className="w-[100%] flex justify-center mt-2">
        <div className="w-[70%] flex flex-col justify-end px-5 md:w-[85%] sm:w-[100%] items-end">
          <div onClick={()=>{
            setSelectedCategory("")
          }} className="text-[13px] cursor-pointer text-[#00000057] hover:text-[#f54749] transition-all">
            ล้างตัวกรอก
          </div>
        </div>
      </div>
      <div className="w-[100%]"></div>
      <div className="flex p-5 w-[100%] justify-center sm:p-4">
        <div className="w-[70%] flex flex-col justify-center px-5 md:w-[85%] sm:w-[100%]">
          <Slider {...settings}>
            {categories.map((cat) => (
              <div
                id={cat?.id}
                onClick={() => {
                  setSelectedCategory(cat?.id);
                }}
                className="flex flex-col px-1"
              >
                <div className=" text-[#fff] bg-[#eb4447] rounded-md py-1 truncate items-center justify-center flex text-[13px] hover:bg-[#d53e40] cursor-pointer">
                  {cat?.category_name}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
      <div className="flex mb-6 mt-3 w-[100%] justify-center items-center flex-row sm:flex-col gap-2">
        <div className="w-[65%] md:w-[80%] sm:w-[100%] sm:flex sm:justify-center">
          <div className="w-[400px]">
            <TextField
              size="small"
              sx={{
                width: "100%",
                "& ::placeholder": {
                  fontSize: "12px",
                },
                "& .MuiOutlinedInput-root": {
                  // '& fieldset': {
                  //   borderColor: 'white',
                  // },
                  // '&:hover fieldset': {
                  //   borderColor: 'white',
                  // },
                  "&.Mui-focused fieldset": {
                    borderColor: "#f54749",
                  },
                },
              }}
              value={query}
              type="search"
              name="board_name"
              placeholder="ค้าหาร้านอาหารที่คุณสนใจ"
              variant="outlined"
              InputProps={{
                style: {
                  fontSize: 13,
                },
                startAdornment: (
                  <InputAdornment position="start">
                    <IoSearchSharp />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: {
                  width: "100%",
                  fontSize: "12px",
                  top: "7.5%",
                },
              }}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
      <div className="flex h-[100%] flex-col items-center">
        {/* container query  */}
        {vendors?.length == 0 && (
          <div className="mt-7 flex rounded-sm justify-center items-center h-[300px] w-[80%]">
            <div className="flex flex-col justify-center items-center">
              <MdSearchOff className="text-[100px] text-[#00000030]" />
              <div className="text-[#00000030] text-[13px] font-semibold">
                ไม่พบร้านอาหารของที่คุณสนใจ
              </div>
            </div>
          </div>
        )}

        {/* grid container */}
        {/* sidebar categories */}
        {/* vendor container */}
        <div className="grid grid-cols-5 gap-2 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 items-center justify-center">
          {vendors.map((vendor, index) => {
            return (
              <div
                className="bg-white shadow-sm p-3 w-[200px] sm:w-[100%] border-[1px]"
                key={index}
                onClick={() => {
                  navigate(`/vendor/${vendor.id}/`);
                }}
              >
                <div>
                  <img
                    className="w-[100%]"
                    src={`http://localhost:5000/image/vendor/${vendor.image}`}
                  ></img>
                </div>
                <div className="flex gap-2 items-center mt-3 text-[18px] mb-1">
                  {vendor.vendor_name}
                </div>
                <div className="text-red-500 text-sm">
                  {vendor.phone_number}
                </div>
                <div className="w-[100%] h-[1px] bg-[#f7f7f7] mb-3 mt-2"></div>
                <div className="bg-[#f5474a1c] rounded-lg flex w-fit px-4 text-[#f54749] text-[13.7px] shadow-sm border-[#f5474a28] border-[1px]">
                  {vendor.open ? "เปิดให้บริการ" : "ไม่พร้อมให้บริการ"}
                </div>
              </div>
            );
          })}
        </div>
        {/* vendor container */}

        {/* end container */}
      </div>
    </div>
  );
}

export default Vendors;

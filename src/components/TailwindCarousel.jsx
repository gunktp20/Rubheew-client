import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";

function TailwindCarousel() {
  const [promotions, setPromotions] = useState(null);
  const { token } = useAuth();

  const fetchPromotions = async () => {
    try {
      const { data } = await api.get("/promotion", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setPromotions(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? promotions?.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === promotions?.length - 1 ? 0 : prevIndex + 1
    );
  };

  // เพิ่มการรันอัตโนมัติ
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext(); // ไปยังภาพถัดไปทุก ๆ 3 วินาที
    }, 3000);

    return () => clearInterval(interval); // ล้าง interval เมื่อ component ถูก unmount
  }, [promotions, currentIndex]); // ใช้ dependencies เป็น promotions และ currentIndex เพื่อให้การอัปเดตถูกต้อง

  return (
    <div className={`relative w-[60%] m-auto sm:w-[90%] md:w-[85%] ${promotions?.length == 0 ? "hidden":"block"}`}>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {promotions?.map((promotion) => (
            <div key={promotion?.id} className="w-[100%] flex-shrink-0">
              <img
                src={`http://localhost:5000/image/promotion/${promotion?.image}`}
                className="w-[100%]"
                alt={promotion?.description} // คำอธิบายรูป
              />
              <p className="text-center mt-2">{promotion?.description}</p> {/* แสดงคำอธิบาย */}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#0000005c] text-white px-4 py-2"
      >
        ก่อนหน้า
      </button>
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#0000005c] text-white px-4 py-2"
      >
        ถัดไป
      </button>
    </div>
  );
}

export default TailwindCarousel;
import { Link } from "react-router-dom";
import img from "../assets/images/404 Error Page not Found with people connecting a plug-amico.png";

const NotFound = () => {
  return (
    <div className="w-[100%] h-[100%] flex justify-center items-center">
      <div className="flex w-[100%] justify-center items-center flex-col h-[100vh]">
        <img src={img} alt="not found" className="w-[400px] h-[400px]" />
        <div
          id="page-not-found-title"
          className="text-[#303030] mb-3 text-[20px]"
        >
          โอ้! ไม่พบหน้า
        </div>
        <div id="page-not-found-detail" className="text-[#838383]">
        ดูเหมือนเราจะไม่พบหน้าที่คุณกำลังมองหา
        </div>
        <div className="text-[#f54749] mt-8">
          <Link
            to="/"
            id="back-to-home-btn"
            className="px-9 py-2 transition-all rounded-sm text-[#f54749] border-[#f54749] border-[2px] hover:bg-[#f54749] hover:text-white"
          >
            กลับไปยังหน้าหลัก
          </Link>
        </div>
      </div>
    </div>
  );
};
export default NotFound;

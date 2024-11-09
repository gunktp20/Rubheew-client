import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import NavbarCustomer from "../components/NavbarCustomer";
import NavbarVendor from "../components/NavbarVendor";
import NavbarAdmin from "../components/NavbarAdmin";
import NavbarRider from "../components/NavbarRider";
import Footer from "../components/Footer";

function InsertReport() {
  const { token, vendor, customer, rider, admin } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [menu_name, setMenuName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const createReport = async () => {
    setError("");
    setSuccess("");
    if (!content) {
      return setError("กรุณากรอกเนื้อหา");
    }

    try {
      const { data } = await api.post(
        "/report/",
        {
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setSuccess("รายงานปัญหาของคุณ เสร็จสิ้น");
    } catch (err) {
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#fcfcf9] h-[100vh]">
      {vendor && <NavbarVendor />}
      {rider && <NavbarRider />}
      {customer && <NavbarCustomer />}
      {admin && <NavbarAdmin />}
      <div className="flex flex-col justify-center items-center w-[430px] bg-[#fff] gap-3 p-5 border-[1px] shadow-sm rounded-sm">
        <div className="text-xl">รายงานปัญหา</div>

        {success && (
          <div className="bg-green-50 text-sm border-green-200 rounded-md px-2 border-[1px] w-[100%] py-2 text-green-700">
            {success}
          </div>
        )}
        {error && (
          <div className="bg-red-50 text-sm border-red-200 rounded-md px-2 border-[1px] w-[100%] py-2 text-red-700">
            {error}
          </div>
        )}

        <input
          placeholder="รายละเอียด"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          name="menu_name"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <button
          onClick={createReport}
          className="bg-[#f54749] text-white w-[100%] h-[32px]"
        >
          ส่งรายงาน
        </button>
      </div>
      <Footer/>
    </div>
  );
}

export default InsertReport;

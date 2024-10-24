import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NavbarVendor from "../components/NavbarVendor";
import VendorDialog from "../components/VendorDialog";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminDialog from "../components/AdminDialog";

function AdminInsertCategory() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [category_id, setCategoryId] = useState("");
  const [category_name, setCategoryName] = useState("");
  const [dialog, setDialog] = useState(false);

  const navigate = useNavigate();

  const insertCategory = async () => {
    if (!category_id) {
      return setError("กรุณากรอกตัวย่อประเภท");
    }
    if (!category_name) {
      return setError("กรุณากรอกชื่อประเภท");
    }
    setError("");
    setSuccess("");
    try {
      const { data } = await api.post(
        "/category/",
        {
          category_id,
          category_name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      navigate("/admin/categories");
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
      <AdminDialog open={dialog} setOpen={setDialog} />
      <NavbarAdmin open={dialog} setOpen={setDialog} />
      <div className="flex flex-col justify-center items-center w-[430px] bg-[#fff] gap-2 p-5 border-[1px] shadow-sm rounded-sm">
        <div className="text-xl">เพิ่มประเภทอาหาร</div>

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

        <div className="text-[13px] text-gray-500 flex justify-start w-[100%]">
          ตัวย่อประเภท
        </div>
        <input
          placeholder="เช่น DE ย่อมาจาก Dessert"
          value={category_id}
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
          name="category_id"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <div className="text-[13px] text-gray-500 flex justify-start w-[100%]">
          ชื่อประเภทอาหาร
        </div>
        <input
          placeholder="ยกตัวอย่างเช่น ของหวาน"
          value={category_name}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
          name="category_name"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>

        <button
          onClick={insertCategory}
          className="bg-[#f54749] mt-1 text-white w-[100%] h-[32px]"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}

export default AdminInsertCategory;

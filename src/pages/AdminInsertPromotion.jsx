import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NavbarVendor from "../components/NavbarVendor";
import VendorDialog from "../components/VendorDialog";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminDialog from "../components/AdminDialog";

function AdminInsertPromotion() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [menu_name, setMenuName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [dialog, setDialog] = useState(false);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");

  const navigate = useNavigate();

  const insertPromotion = async () => {
    setError("");
    setSuccess("");
    if (!selectedFile) {
      return setError("กรุณาเลือกรูปภาพแบนเนอร์");
    }
    const formData = new FormData();

    formData.append("description", description);
    formData.append("image", selectedFile);

    try {
      const { data } = await api.post("/promotion/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      navigate("/admin/promotions");
    } catch (err) {
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await api.get("/category");
      setCategoryId(data[0].id);
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    setSelectedFile(file);
    // เช็คว่ามีไฟล์หรือไม่
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview("");
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
    getCategories();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#fcfcf9] h-[100vh]">
      <AdminDialog open={dialog} setOpen={setDialog} />
      <NavbarAdmin open={dialog} setOpen={setDialog} />
      <div className="flex flex-col justify-center items-center w-[430px] bg-[#fff] gap-3 p-5 border-[1px] shadow-sm rounded-sm">
        <div className="text-xl">อัพโหลด Banner ของคุณ</div>

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
          placeholder="คำอธิบาย"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          name="description"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] mt-2 rounded-sm border-[#00000031]"
        ></input>

        <div class="grid w-full items-center gap-4 mt-2">
          <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            อัพโหลดรูปภาพ Banner ขนาดแนะนำ 1200 x 700 หรือใกล้เคียง
          </label>
          <input
            class="flex w-full rounded-md border border-[#f54749] border-input bg-white text-sm text-gray-400 file:border-0 file:bg-[#f54749] file:text-white file:text-sm file:font-medium"
            type="file"
            id="picture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {preview && (
          <div>
            <h3 className="text-sm mb-2">รูปภาพปัจจุบัน</h3>
            <img
              src={`${preview}`}
              alt="Preview"
              style={{ maxWidth: "300px", maxHeight: "300px" }}
            />
          </div>
        )}

        <button
          onClick={insertPromotion}
          className="bg-[#f54749] text-white w-[100%] h-[32px]"
        >
          บันทึก
        </button>
      </div>
    </div>
  );
}

export default AdminInsertPromotion;

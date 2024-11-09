import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import NavbarVendor from "../components/NavbarVendor";
import VendorDialog from "../components/VendorDialog";
import Footer from "../components/Footer";

function EditMenu() {
  const { menu_id } = useParams();
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [menu_name, setMenuName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);

  const fetchMenuInfo = async () => {
    try {
      const { data } = await api.get("/menu/" + menu_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setMenuName(data?.menu_name);
      setCategoryId(data?.category_id);
      setPrice(data?.price);
      setPreview("http://localhost:5000/image/menu/" + data?.image);
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

  const updateMenu = async () => {
    setError("");
    setSuccess("");
    if (!menu_name || !category_id || !price) {
      return setError("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    const formData = new FormData();

    formData.append("menu_name", menu_name);
    formData.append("category_id", category_id);
    formData.append("price", price);
    formData.append("image", selectedFile);

    try {
      const { data } = await api.put("/menu/" + menu_id, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      setSuccess("แก้ไขรายละเอียด เมนูของคุณ เสร็จสิ้น");
    } catch (err) {
      console.log(err);
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  useEffect(() => {
    fetchMenuInfo();
  }, []);

  const [dialog, setDialog] = useState(false);

  return (
    <div className="flex flex-col items-center bg-[#fcfcf9] h-[100vh]">
      {/* <Navbar /> */}
      <VendorDialog open={dialog} setOpen={setDialog} />
      <NavbarVendor open={dialog} setOpen={setDialog} />
      <div className="flex flex-col justify-center items-center w-[430px] bg-[#fff] gap-3 p-5 border-[1px] shadow-sm rounded-sm">
        <div className="text-xl">แก้ไขเมนูอาหาร</div>

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
          placeholder="ชื่อเมนูอาหาร"
          value={menu_name}
          onChange={(e) => {
            setMenuName(e.target.value);
          }}
          name="menu_name"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <input
          placeholder="ประเภทอาหาร"
          type="text"
          value={category_id}
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
          name="category_id"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>
        <input
          placeholder="ราคา"
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          name="price"
          className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
        ></input>

        <div class="grid w-full items-center gap-4 mt-2">
          <label class="text-sm text-gray-400 font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            อัพโหลดรูปภาพเมนูอาหาร
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
          onClick={updateMenu}
          className="bg-[#f54749] text-white w-[100%] h-[32px]"
        >
          อัพเดทเมนูอาหาร
        </button>
      </div>
      <Footer position={"relative"}/>
    </div>
  );
}

export default EditMenu;

import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NavbarVendor from "../components/NavbarVendor";

function InsertMenu() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [menu_name, setMenuName] = useState("");
  const [category_id, setCategoryId] = useState("");
  const [price, setPrice] = useState(0);

  const navigate = useNavigate();

  const insertMenu = async () => {
    setError("");
    setSuccess("");
    if (!menu_name || !category_id || !price) {
      return setError("กรุณากรอกข้อมูลให้ครบถ้วน");
    }

    try {
      const { data } = await api.post(
        "/menu/",
        {
          menu_name,
          category_id,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setSuccess("เพิ่มเมนูในร้านของคุณ เสร็จสิ้น");
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
    <div className="flex flex-col items-center justify-center">
      {/* <Navbar /> */} 
      <NavbarVendor/>
      <div className="flex flex-col justify-center items-center w-[400px] bg-purple-50 gap-3 p-5 border-[2px]">
        <div className="text-xl">เพิ่มเมนูอาหาร</div>

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
          placeholder="ชื่อเมนู"
          value={menu_name}
          onChange={(e) => {
            setMenuName(e.target.value);
          }}
          name="menu_name"
          className="w-[100%] h-[32px] pl-2"
        ></input>
        <input
          placeholder="ประเภทอาหาร"
          value={category_id}
          onChange={(e) => {
            setCategoryId(e.target.value);
          }}
          name="category_id"
          className="w-[100%] h-[32px] pl-2"
        ></input>
        <input
          placeholder="ราคา"
          type="number"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          name="price"
          className="w-[100%] h-[32px] pl-2"
        ></input>

        <button
          onClick={insertMenu}
          className="bg-purple-300 text-white w-[100%] h-[32px]"
        >
          เพิ่มเมนูอาหาร
        </button>
      </div>
    </div>
  );
}

export default InsertMenu;

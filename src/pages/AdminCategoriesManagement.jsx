import { useEffect, useState } from "react";
import api from "../service/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import NavbarVendor from "../components/NavbarVendor";
import VendorDialog from "../components/VendorDialog";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminDialog from "../components/AdminDialog";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from "sweetalert2";

function AdminCategoriesManagement() {
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

  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการจะลบ ประเภท นี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCategory(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  const deleteCategory = async (id) => {
    try {
      const { data } = await api.delete(`/category/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      getCategories();
    } catch (err) {
      console.log(err);
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
      <div className="flex w-[100%] pb-10 items-center justify-center flex-col ">
        <div>ประเภทอาหารทั้งหมด</div>
        <div className="mt-3 w-[80%] flex justify-center items-center flex-col gap-5">
          <div className="w-[100%] flex">
            <button onClick={()=>{
                navigate("/admin/insert/category")
            }}className="bg-[#f54749] px-5 text-white text-sm rounded-sm py-1 hover:bg-[#e74446] transition-all sm:w-[100%] sm:py-2">เพิ่มประเถทอาหาร</button>
          </div>
          <table id="cart">
            <tr>
              <th width="25%">ไอดี</th>
              <th>ชื่อประเภท</th>
              <th className="w-[10%] sm:w-[20%]">ตัวเลือก</th>
            </tr>
            {categories?.map((category) => {
              return (
                <tr>
                  <td className="flex items-center gap-3">
                    <div className="text-sm">{category?.id}</div>
                  </td>
                  <td className="text-sm truncate">{category?.category_name}</td>

                  <td className="">
                    <AiOutlineDelete
                      onClick={() => {
                        handleDelete(category?.id);
                      }}
                      className=" cursor-pointer"
                    />
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminCategoriesManagement;

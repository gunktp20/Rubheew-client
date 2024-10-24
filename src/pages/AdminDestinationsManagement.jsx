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

function AdminDestinationsManagement() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [category_id, setCategoryId] = useState("");
  const [destinations, setDestinations] = useState([]);
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
        text: "คุณต้องการจะลบ ปลายทาง นี้ใช่หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteDestination(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  const deleteDestination = async (id) => {
    try {
      const { data } = await api.delete(`/destination/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      getDestinations();
    } catch (err) {
      console.log(err);
    }
  };

  const getDestinations = async () => {
    try {
      const { data } = await api.get("/destination");
      setDestinations(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!token) {
      return navigate("/");
    }
    getDestinations();
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#fcfcf9] h-[100vh]">
      <AdminDialog open={dialog} setOpen={setDialog} />
      <NavbarAdmin open={dialog} setOpen={setDialog} />
      <div className="flex w-[100%] pb-10 items-center justify-center flex-col ">
        <div>ปลายทางทั้งหมด</div>
        <div className="mt-3 w-[80%] flex justify-center items-center flex-col gap-5 sm:w-[95%]">
          <div className="w-[100%] flex">
            <button onClick={()=>{
                navigate("/admin/insert/destination")
            }}className="bg-[#f54749] px-5 text-white text-sm rounded-sm py-1 hover:bg-[#e74446] transition-all sm:w-[100%] sm:py-2">เพิ่มปลายทาง</button>
          </div>
          <table id="cart">
            <tr>
              <th>ชื่อปลายทาง</th>
              <th>ละติจูด Lat</th>
              <th>ลองจิจูด Lng</th>
              <th className="w-[10%] sm:w-[20%]">ตัวเลือก</th>
            </tr>
            {destinations?.map((destination) => {
              return (
                <tr>
                  <td className="flex items-center gap-3">
                    <div className="text-sm">{destination?.destination_name}</div>
                  </td>
                  <td className="text-sm truncate">{destination?.lat}</td>
                  <td className="text-sm truncate">{destination?.lng}</td>

                  <td className="">
                    <AiOutlineDelete
                      onClick={() => {
                        handleDelete(destination?.id);
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

export default AdminDestinationsManagement;

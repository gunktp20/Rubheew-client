import NavbarVendor from "../components/NavbarVendor";
import { useEffect, useState } from "react";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import VendorDialog from "../components/VendorDialog";
import { MdSearchOff } from "react-icons/md";
import NavbarAdmin from "../components/NavbarAdmin";
import AdminDialog from "../components/AdminDialog";
import moment from "moment";

function AdminReports() {
  // กำหนดการเปิด ปิด ของ Dialog สำหรับตอนหน้าจอ Mobile
  const [dialog, setDialog] = useState(false);
  const [menus, setMenus] = useState([]);
  const [reports, setReports] = useState([]);
  const [vendorInfo, setVendorInfo] = useState(null);
  const { token, vendor } = useAuth();
  const navigate = useNavigate();

  const fetchReports = async () => {
    try {
      const { data } = await api.get("/report", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setReports(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="bg-[#fcfcf9] h-[100vh]">
      {/* <VendorDialog open={dialog} setOpen={setDialog}/> */}
      {/* <NavbarVendor open={dialog} setOpen={setDialog}/> */}
      <NavbarAdmin open={dialog} setOpen={setDialog} />
      <AdminDialog open={dialog} setOpen={setDialog} />
      <div className="flex w-[100%] items-center justify-center flex-col ">
        <div className="mb-6">รายงานทั้งหมด</div>

        {reports.length == 0 && (
          <div className="mt-7 flex rounded-sm justify-center items-center h-[300px] w-[80%]">
            <div className="flex flex-col justify-center items-center">
              <MdSearchOff className="text-[100px] text-[#00000030]" />
              <div className="text-[#00000030] text-[13px] font-semibold">
                ไม่พบการรายงาน
              </div>
            </div>
          </div>
        )}

        <div className="sm:w-[100%]">
          <div className="grid gap-2 grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:flex sm:flex-col items-center justify-center w-[100%]">
            {reports.map((report, index) => {
              return (
                <div
                  className="bg-[#fff] shadow-sm p-3 w-[300px] md:grid-cols-3 sm:grid-cols-2 sm:w-[90%] border-[1px]"
                  key={index}
                >
                  <div
                    className="flex justify-between cursor-pointer items-center"
                  
                  >
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="text-sm">{report?.customer?.fname}-{report?.customer?.lname}</div>
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="text-sm">{report?.customer?.username}</div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#e5e5e5] w-[100%] h-[1px] my-2"></div>

                  <div className="flex gap-4 mb-1 text-sm">
                    <div className="text-sm">เนื้อหา</div>
                    <div className={`text-sm flex items-center text-blue-600`}>
                      {report?.content}
                    </div>
                  </div>
                  {/*  */}
                  <div className="flex gap-4 mb-1 text-sm">
                    <div className="text-sm">รายงานเมื่อ</div>
                    <div className={`text-sm flex items-center`}>
                      {moment(report?.createdAt)
                        .add(543, "year")
                        .format("DD/MM/YYYY h:mm")}
                    </div>
                  </div>
                  {/* <div className="flex gap-4 mb-1 text-sm">
                    ประเภท{" "}
                    <div className="bg-[#f5474a1c] rounded-lg flex w-fit px-4 text-[#f54749] text-[13.7px] shadow-sm border-[#f5474a28] border-[1px]">
                      {m.category.category_name}
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      className="bg-orange-500 text-white px-2 rounded-md"
                      onClick={() => {
                        navigate(`/vendor/menu/${m.id}/edit`);
                      }}
                    >
                      แก้ไข
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(m.id);
                      }}
                      className="bg-red-500 text-white px-2 rounded-md"
                    >
                      ลบ
                    </button>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../service/api";
import { useAuth } from "../context/AuthContext";
import NavbarCustomer from "../components/NavbarCustomer";

function SelectOrderDestination() {
  const { token } = useAuth();

  const [error, setError] = useState("");
  const [note, setNote] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinations, setDestinations] = useState([]);

  const navigate = useNavigate();

  const { cart_id } = useParams();

  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart/" + cart_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setCart(data);
    } catch (err) {
      navigate("/");
      console.log(err);
    }
  };

  const getDestinations = async () => {
    try {
      const { data } = await api.get("/destination");
      setSelectedDestination(data[0].id);
      setDestinations(data);
    } catch (err) {
      console.log(err);
    }
  };

  const migrateCartItemsToOrder = async () => {
    try {
      const { data } = await api.post(
        "/order/" + cart_id,
        { destination_id: selectedDestination, note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(data);
      setSuccess("ยืนยันคำสั่งซื้อของคุณ เสร็จสิ้น");
      navigate("/qr-payment/" + data.id);
    } catch (err) {
      console.log(err);
      setError(
        err.response.data.msg || "มีบางอย่างผิดพลาด กรุณาลองใหม่ในภายหลัง"
      );
    }
  };

  const [deliveryCost, setDeliveryCost] = useState(0);

  const fetchDeliveryCost = async () => {
    try {
      const { data } = await api.get("/delivery-cost");
      setDeliveryCost(data);
    } catch (err) {
      console.log(err);
    }
  };


  useEffect(() => {
    fetchCart();
    getDestinations();
    fetchDeliveryCost()
  }, []);

  return (
    <div className="flex flex-col items-center bg-[#fcfcf9] h-[100%] pb-14">
      {/* <Navbar /> */}
      <NavbarCustomer />
      <div className="flex flex-col w-[650px] justify-center items-center bg-[#fff] gap-3 p-5 border-[1px] shadow-sm rounded-sm sm:w-[90%]">
        <div className="text-xl">เลือกที่อยู่ของคุณ</div>

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

        <select
          value={selectedDestination}
          onChange={(event) => {
            setSelectedDestination(event.target.value);
          }}
          className={`block h-[32px] w-full pl-2 text-[13.5px] text-gray-900 bg-transparent border-[1px] border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-[#f54749] peer`}
        >
          {destinations?.map((d, index) => {
            return (
              <option key={index} value={d.id}>
                {d?.destination_name}
              </option>
            );
          })}
        </select>

        <button
          onClick={migrateCartItemsToOrder}
          className="bg-[#f54749] text-white w-[100%] h-[32px]"
        >
          ยืนยันที่อยู่สำหรับจัดส่ง
        </button>
      </div>

      <div className="mt-8 border-[1px] border-[#dfdfdf] flex flex-col bg-[#fff] w-[650px] shadow-sm rounded-md p-5 py-6 sm:w-[90%]">
        <div className="flex w-[100%] justify-between">
          <div className="flex items-center gap-3">
            <div>
              <img
                className="w-[70px]"
                src={`http://localhost:5000/image/vendor/${cart?.vendor?.image}`}
              ></img>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex text-[15px]">
                {cart?.vendor?.vendor_name}
              </div>
              <div className="flex text-[12px]">
                ทั้งหมด {cart?.cart_items?.length} รายการ
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%] bg-gray-200 h-[1px] mt-4 mb-3"></div>

        <table id="cart">
          <tr>
            <th>เมนู</th>
            <th>ราคา</th>
            <th>จำนวน</th>
            <th>ราคารวม</th>
          </tr>
          {cart?.cart_items?.map((item) => {
            return (
              <tr>
                <td className="flex items-center gap-3">
                  <img
                    src={`http://localhost:5000/image/menu/${item?.menu?.image}`}
                    className="w-[50px]"
                  ></img>
                  <div className="text-sm">{item?.menu.menu_name}</div>
                </td>
                <td className="text-sm">{item?.menu.price}</td>
                <td className="text-sm">
                  <div className="flex gap-3 items-center">
                    <div className="text-[15px]">{item?.quantity}</div>
                  </div>
                </td>
                <td className="text-sm">{item?.price}</td>
              </tr>
            );
          })}
        </table>
        {/* note */}
        <div className="w-[100%] mt-4">
          <div className="text-[13px] text-gray-500 flex justify-start w-[100%] mb-1">
            หมายเหตุถึงร้านค้า
          </div>
          <input
            placeholder="หมายเหตุ"
            type="text"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
            name="note"
            className="text-sm w-[100%] h-[32px] pl-2 border-[1px] rounded-sm border-[#00000031]"
          ></input>
        </div>
        {/* note */}
        <div className="flex mt-4 w-[100%] justify-between items-center">
          <div className="flex gap-3 text-sm">
            <div>ยอดรวมทั้งหมด</div>
            <div>{cart?.total_price?.toFixed(2)}</div>
            <div>บาท</div>
          </div>
          <div className="flex gap-3 text-sm">
            <div>ค่าส่ง </div>
            <div>+{deliveryCost?.toFixed(2)}</div>
            <div>บาท</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectOrderDestination;

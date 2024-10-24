import { useEffect, useState } from "react";
import api from "../service/api";
import NavbarCustomer from "../components/NavbarCustomer";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { AiOutlineDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import Swal from "sweetalert2";
import { MdSearchOff } from "react-icons/md";

function Cart() {
  const [carts, setCarts] = useState([]);
  const navigate = useNavigate();
  const { token, cartItemsNumber, setCartItemsNumber } = useAuth();

  const fetchCart = async () => {
    try {
      const { data } = await api.get("/cart/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setCarts(data.carts);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCart = async (cart_id) => {
    try {
      const { data } = await api.delete("/cart/" + cart_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setCarts(data);
    } catch (err) {
      console.log(err);
    }
  };

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
        text: "คุณต้องการจะลบชุดรายการนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCart(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  const deleteCartItemById = async (cart_id) => {
    try {
      const { data } = await api.delete("/cart-item/" + cart_id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(data);
      setCartItemsNumber(cartItemsNumber - 1);
      setCarts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteCartItem = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-confirm ",
        cancelButton: "btn btn-cancel",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        text: "คุณต้องการจะลบรายการนี้หรือไม่",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "ใช่ ลบเลย!",
        cancelButtonText: "ยกเลิก",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCartItemById(id);
          return;
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          return;
        }
      });
  };

  const increaseCartItem = async (cart_item_id) => {
    try {
      const { data } = await api.get(`/cart-item/${cart_item_id}/increase`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCartItemsNumber(cartItemsNumber + 1);
      setCarts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const decreaseCartItem = async (cart_item_id) => {
    try {
      const { data } = await api.get(`/cart-item/${cart_item_id}/decrease`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (cartItemsNumber === 1) {
        setCartItemsNumber(0);
      } else {
        setCartItemsNumber(cartItemsNumber - 1);
      }
      setCarts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="w-[100%] flex flex-col bg-[#fcfcf9] h-[100vh]">
      <NavbarCustomer />
      
      <div className="flex flex-col w-[100%] items-center justify-center">
        <div className="mb-6">รายการอาหารในตะกร้าของคุณ</div>
        <div className="w-[100%] flex justify-center items-center flex-col gap-5">
          {carts.length == 0 && (
            <div className="mt-7 flex rounded-sm justify-center items-center h-[300px] w-[80%]">
              <div className="flex flex-col justify-center items-center">
                <MdSearchOff className="text-[100px] text-[#00000030]" />
                <div className="text-[#00000030] text-[13px] font-semibold">
                  ไม่พบชุดรายการสินค้าของคุณ
                </div>
                <button
                  onClick={() => {
                    // dispatch(setCreateVisible(!createBoardVisible))
                    navigate("/");
                  }}
                  className="text-[#f54749] border-[#f54749] border-[1px] px-5 outline-none text-[15px] mt-4 h-[40px] rounded-sm transition-all hover:border-[#f54749] hover:bg-[#f54749] hover:shadow-sm hover:text-white"
                >
                  เลือกรายการอาหารของคุณ
                </button>
              </div>
            </div>
          )}
          {carts.map((cart, index) => {
            return (
              <div className="border-[1px] border-[#dfdfdf] flex flex-col bg-[#fff] w-[800px] shadow-sm rounded-md p-5 py-6 md:w-[90%] sm:w-[90%]">
                <div className="flex w-[100%] justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <img
                        className="w-[70px]"
                        src={`http://localhost:5000/image/vendor/${cart.vendor.image}`}
                      ></img>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex text-[15px]">
                        {cart.vendor.vendor_name}
                      </div>
                      <div className="flex text-[12px]">
                        {/* เบอร์ติดต่อ {cart.vendor.phone_number} */}
                        ทั้งหมด {cart.cart_items.length} รายการ
                      </div>
                    </div>
                  </div>
                  {/* close */}
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      handleDelete(cart.id);
                    }}
                  >
                    <IoClose className="text-lg hover:bg-[#e64345] transition-all rounded-full hover:text-white" />
                  </div>
                </div>

                <div className="w-[100%] bg-gray-200 h-[1px] mt-4 mb-3"></div>

                <table id="cart">
                  <tr>
                    <th>เมนู</th>
                    <th>ราคา</th>
                    <th>จำนวน</th>
                    <th>ราคารวม</th>
                    <th>ตัวเลือก</th>
                  </tr>
                  {cart.cart_items.map((item) => {
                    return (
                      <tr>
                        <td className="flex items-center gap-3">
                          <img
                            src={`http://localhost:5000/image/menu/${item.menu.image}`}
                            className="w-[50px]"
                          ></img>
                          <div className="text-sm">{item.menu.menu_name}</div>
                        </td>
                        <td className="text-sm">{item.menu.price}</td>
                        <td className="text-sm">
                          <div className="flex gap-3 items-center">
                            <button
                              onClick={() => {
                                decreaseCartItem(item.id);
                              }}
                              className="text-xl hover:text-[#f54749] transition-all"
                            >
                              -
                            </button>
                            <div className="text-[15px]">{item.quantity}</div>
                            <button
                              onClick={() => {
                                increaseCartItem(item.id);
                              }}
                              className="text-xl hover:text-[#f54749] transition-all"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-sm">{item.price}</td>
                        <td className="">
                          <AiOutlineDelete
                            onClick={() => {
                              handleDeleteCartItem(item.id);
                            }}
                            className=" cursor-pointer"
                          />
                        </td>
                      </tr>
                    );
                  })}
                </table>

                <div className="flex mt-4 w-[100%] justify-between items-center">
                  <div className="flex gap-3 text-sm">
                    <div>ยอดรวมทั้งหมด</div>
                    <div>{cart?.total_price?.toFixed(2)}</div>
                    <div>บาท</div>
                  </div>
                  <button
                    onClick={() => {
                      navigate("/select-order-destination/" + cart.id);
                    }}
                    disabled={cart?.cart_items?.length <= 0}
                    className={`bg-[#f54749] text-sm text-white px-5 py-2 rounded-sm disabled:bg-[#dedede] disabled:cursor-not-allowed`}
                  >
                    ยืนยันคำสั่งซื้อ
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Cart;

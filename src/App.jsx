import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RiderOrders from "./pages/RiderOrders";
import RiderOrder from "./pages/RiderOrder";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Vendors from "./pages/Vendors";
import VendorRegister from "./pages/VendorRegister";
import VendorLogin from "./pages/VendorLogin";
import RequireVendor from "./components/RequireVendor";
import InsertMenu from "./pages/InsertMenu";
import MenuManagement from "./pages/MenuManagement";
import EditMenu from "./pages/EditMenu";
import OrderStatus from "./pages/OrderStatus";
import SelectDirection from "./pages/SelectDirection";

// Tag ที่เป็นรูปแบบนี้จะเรียกว่า Component
// <ComponentName />

function App() {
  //กำหนดเส้นทางให้กับแต่ละ path
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Vendors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/insert-menu"
          element={
            <ProtectedRoute>
             <RequireVendor>
                <InsertMenu/>
             </RequireVendor>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/menu/management"
          element={
            <ProtectedRoute>
             <RequireVendor>
                <MenuManagement/>
             </RequireVendor>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/menu/:menu_id/edit"
          element={
            <ProtectedRoute>
             <RequireVendor>
                <EditMenu/>
             </RequireVendor>
            </ProtectedRoute>
          }
        />
        <Route path="/select-direction" element={<SelectDirection />} />
        <Route path="/order-status" element={<OrderStatus />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="*" element={<div>ไม่พบหน้าที่คุณต้องการ</div>} />
        {/* ตัวอย่าง : ถ้าผู้ใช้มาที่ path / จะแสดงผลหน้า RiderOrders */}
        <Route
          path="/rider-orders"
          element={<RiderOrders />}
        />
        {/* router ที่มี param ใช้เครื่องหมาย : ตามด้วยชื่อ param */}
        <Route
          path="/rider-order/:order_id"
          element={<RiderOrder />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

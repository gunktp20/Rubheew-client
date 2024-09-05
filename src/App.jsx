import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

import RiderOrders from './pages/RiderOrders';
import RiderOrder from './pages/RiderOrder';
import Login from './pages/Login'
import Register from './pages/Register'

// Tag ที่เป็นรูปแบบนี้จะเรียกว่า Component 
// <ComponentName />

function App() {
  //กำหนดเส้นทางให้กับแต่ละ path
  return (
    <BrowserRouter>
      <Routes>
        {/* ตัวอย่าง : ถ้าผู้ใช้มาที่ path / จะแสดงผลหน้า RiderOrders */}
        <Route
          path="/"
          element={<RiderOrders />}
        />
        <Route
          path="/rider-orders"
          element={<RiderOrders />}
        />
        {/* router ที่มี param ใช้เครื่องหมาย : ตามด้วยชื่อ param */}
        <Route
          path="/rider-order/:order_id"
          element={<RiderOrder />}
        />
        <Route
          path="/login"
          element={<Login />}
        />
        <Route
          path="/register"
          element={<Register />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

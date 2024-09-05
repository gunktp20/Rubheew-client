import './App.css'
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RiderOrders from './pages/RiderOrders';
import RiderOrder from './pages/RiderOrder';

function App() {

  const [open, setOpen] = useState(false)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RiderOrders />}
        />
        <Route
          path="/rider-orders"
          element={<RiderOrders />}
        />
        <Route
          path="/rider-order/:order_id"
          element={<RiderOrder />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App

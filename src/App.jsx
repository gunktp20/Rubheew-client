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
import Vendor from "./pages/Vendor";
import Cart from "./pages/Cart";
import RequireCustomer from "./components/RequireCustomer";
import VendorInformationManagement from "./pages/VendorInformationManagement";
import SelectOrderDestination from "./pages/SelectOrderDestination";
import NotFound from "./pages/NotFound";
import RiderRegister from "./pages/RiderRegister";
import RiderLogin from "./pages/RiderLogin";
import SendVerifyEmail from "./pages/SendVerifyEmail";
import RequireRider from "./components/RequireRider";
import Rider from "./pages/Rider";
import RiderManagement from "./pages/RiderManagement";
import InsertRider from "./pages/InsertRider";
import QRPayment from "./pages/QRPayment";
import VendorOrders from "./pages/VendorOrders";
import VendorOrder from "./pages/VendorOrder";
import Orders from "./pages/Orders";
import Order from "./pages/Order";
import AdminLogin from "./pages/AdminLogin";
import RequireAdmin from "./components/RequireAdmin";
import AdminVendors from "./pages/AdminVendors";
import AdminVendorInfo from "./pages/AdminVendorInfo";
import AdminVendorsRegistrations from "./pages/AdminVendorsRegistrations";
import AdminReports from "./pages/AdminReports";
import InsertReport from "./pages/InsertReport";
import AdminDeliveryCost from "./pages/AdminDeliveryCost";
import AdminPromotions from "./pages/AdminPromotions";
import AdminInsertPromotion from "./pages/AdminInsertPromotion";
import AdminCategoriesManagement from "./pages/AdminCategoriesManagement";
import AdminInsertCategory from "./pages/AdminInsertCategory";
import AdminDestinationsManagement from "./pages/AdminDestinationsManagement";
import AdminInsertDestination from "./pages/AdminInsertDestination";

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
          path="/cart"
          element={
            <ProtectedRoute>
              <RequireCustomer>
                <Cart />
              </RequireCustomer>
            </ProtectedRoute>
          }
        />

        <Route
          path="/select-order-destination/:cart_id"
          element={
            <ProtectedRoute>
              <RequireCustomer>
                <SelectOrderDestination />
              </RequireCustomer>
            </ProtectedRoute>
          }
        />

        <Route
          path="/qr-payment/:order_id"
          element={
            <ProtectedRoute>
              <RequireCustomer>
                <QRPayment />
              </RequireCustomer>
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <RequireCustomer>
                <Orders />
              </RequireCustomer>
            </ProtectedRoute>
          }
        />

        <Route
          path="/order/:order_id"
          element={
            <ProtectedRoute>
              <RequireCustomer>
                <Order />
              </RequireCustomer>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/insert-menu"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <InsertMenu />
              </RequireVendor>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/insert-menu"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <InsertMenu />
              </RequireVendor>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/orders/list"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <VendorOrders />
              </RequireVendor>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/order/:order_id/info"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <VendorOrder />
              </RequireVendor>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/menu/management"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <MenuManagement />
              </RequireVendor>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/menu/:menu_id/edit"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <EditMenu />
              </RequireVendor>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/rider/management"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <RiderManagement />
              </RequireVendor>
            </ProtectedRoute>
          }
        />
        <Route
          path="/vendor/rider/insert"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <InsertRider />
              </RequireVendor>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/information/management"
          element={
            <ProtectedRoute>
              <RequireVendor>
                <VendorInformationManagement />
              </RequireVendor>
            </ProtectedRoute>
          }
        />

        <Route
          path="/rider/order/:order_id"
          element={
            <ProtectedRoute>
              <RequireRider>
                <RiderOrder />
              </RequireRider>
            </ProtectedRoute>
          }
        />

        <Route
          path="/rider/orders"
          element={
            <ProtectedRoute>
              <RequireRider>
                <RiderOrders />
              </RequireRider>
            </ProtectedRoute>
          }
        />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminReports />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <InsertReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendors/"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminVendors />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/categories/"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminCategoriesManagement />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/destinations/"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminDestinationsManagement />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/delivery-cost/"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminDeliveryCost />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/vendors/registrations"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminVendorsRegistrations />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/vendor/:vendor_id/info"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminVendorInfo />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/promotions"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminPromotions />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/insert/promotion"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminInsertPromotion />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
         <Route
          path="/admin/insert/destination"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminInsertDestination />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/insert/category"
          element={
            <ProtectedRoute>
              <RequireAdmin>
                <AdminInsertCategory />
              </RequireAdmin>
            </ProtectedRoute>
          }
        />

        <Route
          path="/vendor/:vendor_id"
          element={
            <ProtectedRoute>
              <Vendor />
            </ProtectedRoute>
          }
        />

        <Route path="/select-direction" element={<SelectDirection />} />
        {/* <Route path="/order-status" element={<OrderStatus />} /> */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route path="/rider/register" element={<RiderRegister />} />
        <Route path="/rider/login" element={<RiderLogin />} />
        <Route
          path="/request-verify-email/:token"
          element={<SendVerifyEmail />}
        />
        <Route path="*" element={<NotFound />} />
        {/* ตัวอย่าง : ถ้าผู้ใช้มาที่ path / จะแสดงผลหน้า RiderOrders */}
        {/* <Route path="/rider-orders" element={<RiderOrders />} /> */}
        {/* router ที่มี param ใช้เครื่องหมาย : ตามด้วยชื่อ param */}
        {/* <Route path="/rider-order/:order_id" element={<RiderOrder />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

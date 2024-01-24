import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FarmerRegister from "./components/common/register";
import FarmerLogin from "./components/common/login";
import BuyerLogin from "./components/common/buyer/login";
import BuyerRegister from "./components/common/buyer/register";

// farmer
import FarmerHome from "./components/farmer/home";
import FarmerDeals from "./components/farmer/deals";
import FarmerOrders from "./components/farmer/orders/index";
import FarmerShowOrder from "./components/farmer/orders/show";
import FarmerImages from "./components/farmer/images";
import FarmerProfile from "./components/farmer/profile";
import FarmerSettings from "./components/farmer/settings";
import FarmerProducts from "./components/farmer/products/index";
import FarmerShowProduct from "./components/farmer/products/show";
import FarmerCreateProduct from "./components/farmer/products/create";
import FarmerEditProduct from "./components/farmer/products/edit";

// buyer
import BuyerHome from "./components/buyer/home";
import BuyerDeals from "./components/buyer/deals";
import BuyerOrders from "./components/buyer/orders/index";
import BuyerShowOrder from "./components/buyer/orders/show";
import BuyerImages from "./components/buyer/images";
import BuyerProfile from "./components/buyer/profile";
import BuyerSettings from "./components/buyer/settings";
import BuyerProducts from "./components/buyer/products/index";
import BuyerShowProduct from "./components/buyer/products/show";
import BuyerCreateOrder from "./components/buyer/orders/create";
import BuyerEditOrder from "./components/buyer/orders/edit";
import FarmerDashboard from "./components/farmer/layouts/dashboard";
import BuyerDashboard from "./components/buyer/layouts/dashboard";
const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<FarmerRegister />} />
          <Route exact path="/login" element={<FarmerLogin />} />
          <Route exact path="/buyer-register" element={<BuyerRegister />} />
          <Route exact path="/buyer-login" element={<BuyerLogin />} />

          {/* Farmer Routes  */}

          <Route path="/farmer" element={<FarmerDashboard />}>
            <Route path="home" element={<FarmerHome />} />
            <Route path="products" element={<FarmerProducts />} />
            <Route path="products/create" element={<FarmerCreateProduct />} />
            <Route path="products/:id/show" element={<FarmerShowProduct />} />
            <Route path="products/:id/edit" element={<FarmerEditProduct />} />
            <Route path="deals" element={<FarmerDeals />} />
            <Route path="orders" element={<FarmerOrders />} />
            <Route path="orders/:id/show" element={<FarmerShowOrder />} />
            <Route path="images" element={<FarmerImages />} />
            <Route path="profile" element={<FarmerProfile />} />
            <Route path="settings" element={<FarmerSettings />} />
          </Route>

          {/* Buyer Routes  */}
          <Route path="/buyer" element={<BuyerDashboard />}>
            <Route path="home" element={<BuyerHome />} />
            <Route path="products" element={<BuyerProducts />} />
            <Route path="products/:id/show" element={<BuyerShowProduct />} />
            <Route path="deals" element={<BuyerDeals />} />
            <Route path="orders" element={<BuyerOrders />} />
            <Route path="orders/create" element={<BuyerCreateOrder />} />
            <Route path="orders/:id/edit" element={<BuyerEditOrder />} />
            <Route path="orders/:id/show" element={<BuyerShowOrder />} />
            <Route path="images" element={<BuyerImages />} />
            <Route path="profile" element={<BuyerProfile />} />
            <Route path="settings" element={<BuyerSettings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

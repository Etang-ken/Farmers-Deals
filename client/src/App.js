import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/common/register";
import Login from "./components/common/login";

import Home from "./components/farmer/home";
import Products from "./components/farmer/products";
import Deals from "./components/farmer/deals";
import DealRequests from "./components/farmer/deal_requests";
import Images from "./components/farmer/images";
import Profile from "./components/farmer/profile";
import Settings from "./components/farmer/settings";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

          {/* Farmer Routes  */}
          
          <Route exact path="/farmer-home" element={<Home />} />
          <Route exact path="/farmer-products" element={<Products />} />
          <Route exact path="/farmer-deals" element={<Deals />} />
          <Route exact path="/farmer-deal-requests" element={<DealRequests />} />
          <Route exact path="/farmer-images" element={<Images />} />
          <Route exact path="/farmer-profile" element={<Profile />} />
          <Route exact path="/farmer-settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

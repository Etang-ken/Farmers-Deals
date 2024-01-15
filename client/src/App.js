import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/common/register";
import Login from "./components/common/login";

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
import Authenticator from "./components/auth/auth";
import { useDispatch } from "react-redux";
import { updateUser } from "./components/state_slices/farmerSlice";
import axios from "axios";
import { Col, Row, Spin } from "antd";

const App = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem("farmerDealToken");
    if (userToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/farmer`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          dispatch(updateUser(res.data.farmer));
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error: ", error);
        });
    } else {
      setLoading(false);
    }
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh", // Full height of the viewport
          }}
        >
          <Row justify="center" align="middle" gutter={[16, 16]}>
            <Col>
              <Spin size="small" />
            </Col>
            <Col>
              <Spin />
            </Col>
            <Col>
              <Spin size="large" />
            </Col>
          </Row>
        </div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />

            {/* Farmer Routes  */}

            <Route
              exact
              path="/farmer-home"
              element={<Authenticator children={<FarmerHome />} />}
            />
            <Route
              exact
              path="/farmer-products"
              element={<Authenticator children={<FarmerProducts />} />}
            />
            <Route
              exact
              path="/farmer-products/create"
              element={<Authenticator children={<FarmerCreateProduct />} />}
            />
            <Route
              exact
              path="/farmer-products/:id/show"
              element={<Authenticator children={<FarmerShowProduct />} />}
            />
            <Route
              exact
              path="/farmer-products/:id/edit"
              element={<Authenticator children={<FarmerEditProduct />} />}
            />
            <Route
              exact
              path="/farmer-deals"
              element={<Authenticator children={<FarmerDeals />} />}
            />
            <Route
              exact
              path="/farmer-orders"
              element={<Authenticator children={<FarmerOrders />} />}
            />
            <Route
              exact
              path="/farmer-orders/:id/show"
              element={<Authenticator children={<FarmerShowOrder />} />}
            />
            <Route
              exact
              path="/farmer-images"
              element={<Authenticator children={<FarmerImages />} />}
            />
            <Route
              exact
              path="/farmer-profile"
              element={<Authenticator children={<FarmerProfile />} />}
            />
            <Route
              exact
              path="/farmer-settings"
              element={<Authenticator children={<FarmerSettings />} />}
            />

            {/* Buyer Routes  */}

            <Route exact path="/buyer-home" element={<BuyerHome />} />
            <Route exact path="/buyer-products" element={<BuyerProducts />} />
            <Route
              exact
              path="/buyer-products/:id/show"
              element={<BuyerShowProduct />}
            />
            <Route exact path="/buyer-deals" element={<BuyerDeals />} />
            <Route exact path="/buyer-orders" element={<BuyerOrders />} />
            <Route
              exact
              path="/buyer-orders/create"
              element={<BuyerCreateOrder />}
            />
            <Route
              exact
              path="/buyer-orders/:id/edit"
              element={<BuyerEditOrder />}
            />
            <Route
              exact
              path="/buyer-orders/:id/show"
              element={<BuyerShowOrder />}
            />
            <Route exact path="/buyer-images" element={<BuyerImages />} />
            <Route exact path="/buyer-profile" element={<BuyerProfile />} />
            <Route exact path="/buyer-settings" element={<BuyerSettings />} />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;

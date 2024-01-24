import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Spin } from "antd";
import axios from "axios";
import { updateUser } from "../state_slices/buyer/buyerSlice";
// import { updateProducts } from "../state_slices/buyerProductsSlice";
import { useDispatch } from "react-redux";

export default function BuyerAuthenticator({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const userToken = localStorage.getItem("buyerDealToken");
    if (userToken) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/buyer`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((res) => {
          dispatch(updateUser(res.data.buyer));
          console.log(res.data.buyer)
          //   axios
          //     .get(`${process.env.REACT_APP_API_URL}/buyer/product/all`, {
          //       headers: {
          //         "Content-Type": "multipart/form-data",
          //         Authorization: `Bearer ${userToken}`,
          //       },
          //     })
          //     .then((res) => {
          //       dispatch(updateProducts(res.data.products));
          //     })
          //     .catch((err) => {
          //       console.log("error: ", err);
          //     });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error: ", error);
        });
    } else {
      navigate("/buyer-login");
      setLoading(false);
    }
  }, [dispatch, navigate]);

  return loading ? (
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
    <>{children}</>
  );
}

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Spin } from "antd";
import axios from "axios";
import { updateUser } from "../state_slices/farmerSlice";
import { updateProducts } from "../state_slices/farmerProductsSlice";
import { useDispatch } from "react-redux";

export default function FarmerAuthenticator({ children }) {
  const navigate = useNavigate();
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
          axios
            .get(`${process.env.REACT_APP_API_URL}/farmer/product/all`, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${userToken}`,
              },
            })
            .then((res) => {
              dispatch(updateProducts(res.data.products));
            })
            .catch((err) => {
              console.log("error: ", err);
            });
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          console.log("error: ", error);
        });
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, []);

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

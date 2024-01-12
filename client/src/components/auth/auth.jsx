import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Col, Row, Spin } from "antd";

export default function Authenticator({ children }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("farmerDealToken");
    if (!token) {
      navigate("/login");
    } else {
      setLoading(false);
    }
  }, [navigate]);

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

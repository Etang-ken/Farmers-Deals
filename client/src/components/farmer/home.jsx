import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { MailOutlined } from "@ant-design/icons";
import Dashboard from "./layouts/dashboard";

export default function Home() {
  return (
    <div className="home">
      <Dashboard title="Home">
        <h2>Home</h2>
      </Dashboard>
    </div>
  );
}

import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { MailOutlined } from "@ant-design/icons";
import Dashboard from "./layouts/dashboard";

export default function Profile() {
  return (
    <div className="profile">
      <Dashboard title="Profile">
        <h2>Profile</h2>
      </Dashboard>
    </div>
  );
}

import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { MailOutlined } from "@ant-design/icons";
import Dashboard from "./layouts/dashboard";

export default function Settings() {
  return (
    <div className="settings">
      <Dashboard title="Settings">
        <h2>Settings</h2>
      </Dashboard>
    </div>
  );
}

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MailOutlined } from "@ant-design/icons";
import Dashboard from "./layouts/dashboard";

export default function DealRequests() {
  return (
    <div className="deal-requests">
      <Dashboard title="Deal Requests">
        <h2>Deal Requests</h2>
      </Dashboard>
    </div>
  );
}

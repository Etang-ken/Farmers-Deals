import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import Dashboard from "../layouts/dashboard";
import DisplayProducts from "../fragments/display_products";
import "../../styles/farmer/products.css";

export default function Products() {
  return (
    <div className="products" style={{ textAlign: "left" }}>
      <Dashboard title="Products">
        <div className="flex flex-wrap items-center">
          <h1 className="heading-1">Products</h1>
          <div className="ml-auto pb-3">
            <Link
              to="/farmer-products/create"
              className="primary-button flex w-fit  mt-auto"
            >
              <PlusOutlined className="pr-2 !font-extrabold" /> Add Product
            </Link>
          </div>
        
        </div>

        <DisplayProducts />
      </Dashboard>
    </div>
  );
}

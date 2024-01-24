import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import DisplayProducts from "../fragments/display_products";
import "../../styles/farmer/products.css";
import { useDispatch } from "react-redux";
import { updateBreadcrumbTitleShow } from "../../state_slices/breadcrumbTitleSlice";

export default function Products() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow('Products'))
  }, [dispatch])
  return (
    <div className="products" style={{ textAlign: "left" }}>
      <div className="flex flex-wrap items-center">
        <h1 className="heading-1">Products</h1>
        <div className="ml-auto pb-3">
          <Link
            to="/farmer/products/create"
            className="primary-button flex w-fit  mt-auto"
          >
            <PlusOutlined className="pr-2 !font-extrabold" /> Add Product
          </Link>
        </div>
      </div>

      <DisplayProducts />
    </div>
  );
}

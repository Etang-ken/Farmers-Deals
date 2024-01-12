import React from "react";
import { Link } from "react-router-dom";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Dashboard from "../layouts/dashboard";
import DisplayProducts from "../fragments/display_products";
import "../../styles/farmer/products.css";

import image from "../../styles/farmer/image.jpg";

export default function Products() {
  const actionFunc = (viewUrl, editUrl, deleteUrl) => {
    return (
      <div className="flex gap-3">
        <Link to={viewUrl} className="flex items-center">
          <EyeOutlined className="text-green-600 font-extrabold text-lg" />
        </Link>
        <Link to={editUrl} className="flex items-center text-lg">
          <EditOutlined className="text-blue-600 font-extrabold" />
        </Link>
        <Link to={deleteUrl} className="flex items-center" danger>
          <DeleteOutlined className="text-red-500 font-extrabold text-lg" />
        </Link>
      </div>
    );
  };
  const data = [
    {
      key: "1",
      image: <img src={image} height="50" width="50" alt="" />,
      name: "Irish Potato",
      category: "Cash Crop",
      price: 5500 + " frs per 20 liters",
      quantity: "9 300kg bags",
      action: actionFunc(
        "/farmer-products/6/show",
        "/farmer-products/6/edit",
        "/farmer-3"
      ),
    },
    {
      key: "2",
      image: <img src={image} height="50" width="50" alt="" />,
      name: "Cocoyam",
      category: "Food Crop",
      price: 4500 + " frs per 20 liters",
      quantity: "10 300kg bags",
      action: actionFunc("/farmer-4", "/farmer-5", "/farmer-6"),
    },
    {
      key: "3",
      image: <img src={image} height="50" width="50" alt="" />,
      name: "Tomato",
      category: "Cash Crop",
      price: 7000 + " frs per 20 liters",
      quantity: "5 300kg bags",
      action: actionFunc("/farmer-7", "/farmer-8", "/farmer-9"),
    },
    {
      key: "4",
      image: <img src={image} height="50" width="50" alt="" />,
      name: "Egusi",
      category: "Food Crop",
      price: 2300 + " frs per 20 liters",
      quantity: "7 300kg bags",
      action: actionFunc("/farmer-11", "/farmer-12", "/farmer-13"),
    },
  ];
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
        <DisplayProducts data={data} />
      </Dashboard>
    </div>
  );
}

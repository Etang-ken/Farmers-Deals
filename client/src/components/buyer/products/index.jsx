import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import DisplayProducts from "../fragments/display_products";
import "../../styles/buyer/products.css";

import image from "../../styles/buyer/image.jpg";
import { updateBreadcrumbTitleShow } from "../../state_slices/breadcrumbTitleSlice";
import { useDispatch } from "react-redux";

export default function Products() {
  const dispatch = useDispatch();
  const actionFunc = (viewUrl, orderUrl) => {
    return (
      <div className="flex gap-3">
        <Link to={viewUrl} className="flex items-center">
          <EyeOutlined className="text-green-600 font-extrabold text-xl" />
        </Link>
        <Link to={orderUrl} className="flex items-center text-xl">
          <ShoppingCartOutlined className="th-text-third font-extrabold" />
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
      action: actionFunc("/buyer/products/6/show", "/buyer/orders/create"),
    },
    {
      key: "2",
      image: <img src={image} height="50" width="50" alt="" />,
      name: "Cocoyam",
      category: "Food Crop",
      price: 4500 + " frs per 20 liters",
      quantity: "10 300kg bags",
      action: actionFunc("/buyer/4", "/buyer/5"),
    },
    {
      key: "3",
      image: <img src={image} height="50" width="50" alt="" />,
      name: "Tomato",
      category: "Cash Crop",
      price: 7000 + " frs per 20 liters",
      quantity: "5 300kg bags",
      action: actionFunc("/buyer/7", "/buyer/8"),
    },
    {
      key: "4",
      image: <img src={image} height="50" width="50" alt="" />,
      name: "Egusi",
      category: "Food Crop",
      price: 2300 + " frs per 20 liters",
      quantity: "7 300kg bags",
      action: actionFunc("/buyer/11", "/buyer/12"),
    },
  ];

  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow("Products"));
  }, [dispatch]);
  return (
    <div className="products" style={{ textAlign: "left" }}>
      <h1 className="heading-1">Products</h1>
      <DisplayProducts data={data} />
    </div>
  );
}

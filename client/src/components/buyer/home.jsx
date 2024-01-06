import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ShopOutlined,
  CheckCircleFilled,
  ExclamationCircleFilled,
  CalendarOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import Dashboard from "./layouts/dashboard";
import DisplayProducts from "./fragments/display_products";
import "../styles/buyer/home.css";
import image from "../styles/buyer/image.jpg";
import image2 from "../styles/buyer/coffe3.jpg";
import image3 from "../styles/buyer/cocoa2.jpg";
import ShortBottomLine from "../common/short_bottom_line";

export default function Home() {
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
      image: <img src={image} height="50" width="50" />,
      name: "Irish tato",
      category: "Cash Crop",
      price: 5500 + " frs per 20 liters",
      quantity: "9 300kg bags",
      action: actionFunc(
        "/buyer-products/6/show",
        "/buyer-orders/create"
      ),
    },
    {
      key: "2",
      image: <img src={image} height="50" width="50" />,
      name: "Cocoyam",
      category: "Food Crop",
      price: 4500 + " frs per 20 liters",
      quantity: "10 300kg bags",
      action: actionFunc("/buyer-4", "/buyer-5"),
    },
    {
      key: "3",
      image: <img src={image} height="50" width="50" />,
      name: "Tomato",
      category: "Cash Crop",
      price: 7000 + " frs per 20 liters",
      quantity: "5 300kg bags",
      action: actionFunc("/buyer-7", "/buyer-8"),
    },
    {
      key: "4",
      image: <img src={image} height="50" width="50" />,
      name: "Egusi",
      category: "Food Crop",
      price: 2300 + " frs per 20 liters",
      quantity: "7 300kg bags",
      action: actionFunc("/buyer-11", "/buyer-12"),
    },
  ];

  const order = (id, image, name, quantity, product, date, time) => {
    return (
      <div className="bg-white rounded-lg p-3 w-full mb-3">
        <div className="flex items-center gap-2">
          <img src={image} width="40px" className="!h-10 rounded-full" />
          <span className="pl-1">
            <p className="text-xs mb-1">
              <span className="font-semibold">{name}</span> accepted your ordered for{" "}
              <span className="font-semibold">
                {quantity} {product}
              </span>
            </p>
            <span className="text-3xs">
              at:{" "}
              <span className="text-slate-500">
                {date}, {time}
              </span>
            </span>
          </span>
          <Link to={`/buyer-orders/${id}/show`} className="ml-auto">
            <EyeOutlined className="text-lg th-text-primary" />
          </Link>
        </div>
      </div>
    );
  };
  return (
    <div className="home">
      <Dashboard title="Dashboard">
        <h1 className="heading-1">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 justify-items-center">
          <div className="dashbox">
            <div>
              <h1 className="text-5xl my-1 th-text-primary-bold">00</h1>
              <p className="text-xs font-semibold uppercase">Total Orders</p>
            </div>
            <div className="ml-auto">
              <ShoppingCartOutlined className="text-5xl th-text-third" />
            </div>
          </div>

          <div className="dashbox">
            <div>
              <h1 className="text-5xl my-1 th-text-primary-bold">00</h1>
              <p className="text-xs font-semibold uppercase">Done Deals</p>
            </div>
            <div className="ml-auto">
              <CheckCircleFilled className="text-5xl th-text-primary" />
            </div>
          </div>

          <div className="dashbox">
            <div>
              <h1 className="text-5xl my-1 th-text-primary-bold">00</h1>
              <p className="text-xs font-semibold uppercase">Pending Orders</p>
            </div>
            <div className="ml-auto">
              <ExclamationCircleFilled className="text-5xl th-text-third" />
            </div>
          </div>

          <div className="dashbox">
            <div>
              <h1 className="text-5xl my-1 th-text-primary-bold">00</h1>
              <p className="text-xs font-semibold uppercase">
                Years of Buying Experience
              </p>
            </div>
            <div className="ml-auto">
              <CalendarOutlined className="text-5xl th-text-primary" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-6 mt-16 gap-4">
          <div className="col-span-4 border border-t-0 border-slate-100 rounded">
            <div className="w-full">
              <h3 className="heading-4 mb-1">Products</h3>
              <ShortBottomLine />
              <br />
              <DisplayProducts data={data} showPagination={false} />
              <br />
              <Link
                to="/buyer-products"
                className="th-text-primary text-md font-bold ml-2 flex items-start text-lg"
              >
                More Products{" "}
                <EllipsisOutlined className="pr-2 !font-extrabold text-3xl" />
              </Link>
            </div>
          </div>

          <div className="orders col-span-2 h-full th-bg-xlight p-2 md:mt-10 lg:mt-0">
            <h3 className="heading-4 mb-1">Order Notifications</h3>
            <ShortBottomLine />
            <br />
            {order(
              "10",
              image,
              "Etang",
              "6 bags of 50kg",
              "Cocoyams",
              "07-05-2023",
              "9:30 am"
            )}
            {order(
              "11",
              image2,
              "Kencliff",
              "10 bags of 50kg",
              "Irish Potatoes",
              "02-05-2023",
              "12:07 pm"
            )}
            {order(
              "12",
              image3,
              "Andock",
              "2 bags of 50kg",
              "Cassava",
              "20-04-2023",
              "5:43 pm"
            )}
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

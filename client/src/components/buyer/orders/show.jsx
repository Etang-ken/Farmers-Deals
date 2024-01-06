import React from "react";
import { Link } from "react-router-dom";
import { Image } from "antd";
import {
  CalendarOutlined,
  CalendarFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  EditOutlined
} from "@ant-design/icons";
import image from "../../styles/buyer/image.jpg";
import Dashboard from "../layouts/dashboard";
import ShortBottomLine from "../../common/short_bottom_line";

export default function ShowOrder() {
  return (
    <div className="show-order">
      <Dashboard title="Orders / Show">
        <h1 className="heading-1">Show Order</h1>
        <hr />
        <div className="buyer-section pt-0 mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 px-4 border-left-bottom-right rounded-b-lg bg-slate-100">
            <div className="flex gap-2">
              <CalendarOutlined />
              <div>
                <p className="text-slate-600 text-xs mb-1">Date Ordered</p>
                <p className="heading-4">12-05-2023</p>
              </div>
            </div>
            <div className="flex gap-2">
              <CalendarFilled />
              <div>
                <p className="text-slate-600 text-xs mb-1">
                  Latest Date Needed
                </p>
                <p className="heading-4">20-05-2023</p>
              </div>
            </div>
          </div>
          <br />
          <br />

          <h3 className="heading-3 mb-1">Farmer Information</h3>
          <ShortBottomLine />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-1 pt-5">
            <div>
              <p className="text-slate-600 text-xs mb-1">Name</p>
              <p>Tabi Atem</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Email</p>
              <p>etangkencliffandocktabiatem@gmail.com</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Phone</p>
              <p>+237 670260611</p>
            </div>

            <div>
              <p className="text-slate-600 text-xs mb-1">Location</p>
              <p>Buea, Cameroon</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Sex</p>
              <p>Male</p>
            </div>
            {/* <div>
              <p className="text-slate-600 text-xs mb-1">Bio</p>
              <p>+237 670260611</p>
            </div> */}
          </div>
          <hr />
          <br />
          <br />

          <h3 className="heading-3 mb-1">Product Information</h3>
          <ShortBottomLine />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2 lg:gap-1 pt-5">
            <div>
              <p className="text-slate-600 text-xs mb-1">Image</p>
              <p>
                <Image className="!h-12 !w-16" src={image} />
              </p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Name</p>
              <p>Yam</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Category</p>
              <p>Food Crop</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Quantity</p>
              <p>2 50kg Bags</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Total Price</p>
              <p>50,000frs</p>
            </div>
            {/* <div>
              <p className="text-slate-600 text-xs mb-1">Bio</p>
              <p>+237 670260611</p>
            </div> */}
          </div>
          <br />
          <hr />
          <br />
          <div className="flex flex-wrap gap-4">
            <div>
            <Link
              to="/buyer-orders/5/edit"
              className="primary-button flex w-fit  mt-auto"
            >
                <EditOutlined className="pr-2" /> Edit Order
              </Link>
            </div>
            <div className="md:ml-auto">
              <Link className="danger-button">
                <CloseCircleFilled className="pr-2" /> Cancel Order
              </Link>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

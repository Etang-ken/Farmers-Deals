import React, { useEffect } from "react";
import { EditOutlined } from "@ant-design/icons";
import { Image } from "antd";
import "../styles/buyer/profile.css";
import image from "../styles/buyer/image.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateBreadcrumbTitleShow } from "../state_slices/breadcrumbTitleSlice";

export default function Profile() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow("Profile"));
  }, [dispatch]);
  return (
    <div className="profile">
      <h1 className="heading-1">My Profile</h1>

      {/* <div className="prof-1"> */}
      <div className="buyer-profile-head  !border-t-0 bg-slate-100 !mb-12">
        <div className="flex flex-wrap items-center">
          <div>
            <Image
              width={80}
              height={80}
              className="rounded-full"
              src={image}
            />
          </div>
          <div className="pl-4">
            <h3 className="heading-3 mt-1 mb-0">Etang Kencliff</h3>
            <p className="my-1 font-semibold th-text-third">Buyer</p>
            <small>Buea, Cameroon</small>
          </div>
          <div className="ml-auto hidden md:block">
            <Link to="#">
              <EditOutlined className="th-text-primary font-bold text-3xl" />
            </Link>
          </div>
        </div>
        <div className="mt-8 flex md:hidden">
          <Link to="#" className="secondary-button ml-auto">
            <EditOutlined /> Edit
          </Link>
        </div>
      </div>

      {/* personal info  */}
      <div className="buyer-profile-body bg-slate-50 my-5">
        <div className="flex">
          <h3 className="heading-3">Personal Information</h3>
          <div className="ml-auto hidden md:block">
            <Link to="#">
              <EditOutlined className="th-text-primary font-bold text-3xl" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div>
            <p className="text-slate-600 text-xs mb-1">
              First Name / Given Name(s)
            </p>
            <p>Tabi Atem</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">Second Name / Surname</p>
            <p>Etang Kencliff Andock</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div>
            <p className="text-slate-600 text-xs mb-1">Email</p>
            <p>etangkencliffandocktabiatem@gmail.com</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">Phone</p>
            <p>+237 670260611</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div>
            <p className="text-slate-600 text-xs mb-1">Location</p>
            <p>Buea, South West, Cameroon</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">Bio</p>
            <p>Buyer</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div>
            <p className="text-slate-600 text-xs mb-1">Gender</p>
            <p>Male</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">Languauge</p>
            <p>English</p>
          </div>
        </div>
        <div className="mt-8 flex md:hidden">
          <Link to="#" className="secondary-button ml-auto">
            <EditOutlined /> Edit
          </Link>
        </div>
      </div>

      {/* major information  */}
      <div className="buyer-profile-body bg-slate-50 my-5">
        <div className="flex">
          <h3 className="heading-3">Major Information</h3>
          <div className="ml-auto hidden md:block">
            <Link to="#">
              <EditOutlined className="th-text-primary font-bold text-3xl" />
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div>
            <p className="text-slate-600 text-xs mb-1">Product Buying Type</p>
            <p>Multiple (Single)</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">Main Product(s)</p>
            <p>Cocoyams, Yams, Cassava</p>
          </div>
          {/* <div>
              <p className="text-slate-600 text-xs mb-1">
                Number of Product Types
              </p>
              <p>4</p>
            </div> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
          <div>
            <p className="text-slate-600 text-xs mb-1">Main Product(s)</p>
            <p>Cocoyams, Yams, Cassava</p>
          </div>
          <div>
            <p className="text-slate-600 text-xs mb-1">
              Years of Farming Experience
            </p>
            <p>7</p>
          </div>
        </div>
        <div className="mt-8 flex md:hidden">
          <Link to="#" className="secondary-button ml-auto">
            <EditOutlined /> Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

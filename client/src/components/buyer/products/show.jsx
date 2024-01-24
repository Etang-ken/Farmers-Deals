import React, { useEffect } from "react";
import { Image } from "antd";
import image from "../../styles/buyer/image.jpg";
import image2 from "../../styles/buyer/cocoa1.jpg";
import image3 from "../../styles/buyer/cocoa2.jpg";
import image4 from "../../styles/buyer/coffe3.jpg";
import { Link } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ShortBottomLine from "../../common/short_bottom_line";
import { useDispatch } from "react-redux";
import { updateBreadcrumbTitleShow } from "../../state_slices/breadcrumbTitleSlice";

export default function ShowProduct() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow("Products / Show"));
  }, [dispatch]);
  return (
    <div className="show-product">
      <h1 className="heading-1">Show Product</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="p-3 rounded-lg shadow-xl w-fit">
            <Image className="!h-72 !w-96" src={image} />
          </div>
          <div className="flex flex-wrap p-3 h-fit">
            <div className="p-3 rounded-lg shadow-xl">
              <Image className="!h-20 !w-20" src={image} />
            </div>
            <div className="p-3 rounded-lg shadow-xl">
              <Image className="!h-20 !w-20" src={image2} />
            </div>
            <div className="p-3 rounded-lg shadow-xl">
              <Image className="!h-20 !w-20" src={image3} />
            </div>
            <div className="p-3 rounded-lg shadow-xl">
              <Image className="!h-20 !w-20" src={image4} />
            </div>
          </div>
        </div>

        <div className="details">
          <h1 className="text-2xl font-inter">$ 20.00</h1>
          <h1 className="text-4xl font-inter mb-1 th-text-third">Cocoyam</h1>
          <p className="text-xs uppercase my-0">Cash Crop</p>

          <p className="pt-5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, est.
            Saepe, nulla. Omnis exercitationem dignissimos dolorum, laudantium
            minima ut cum fugiat odio quidem beatae nulla voluptate corrupti vel
            pariatur amet!
          </p>

          <div className="flex flex-wrap gap-10 mt-10">
            <Link
              to="/buyer/orders/create"
              className="primary-button flex w-fit mt-auto"
            >
              <EditOutlined className="pr-2" /> Edit
            </Link>
            <Link
              to="/buyer/products"
              className="danger-button flex w-fit  mt-auto"
            >
              <DeleteOutlined className="pr-2" /> Delete
            </Link>
          </div>
        </div>
        {/* <div className="mt-auto">
               
              </div> */}
      </div>
      <br />
      <br />
      <br />
      <hr className="!bg-slate-50" />
      <br />
      <div className="mt-10">
        <div className="mb-4">
          <h3 className="text-2xl mb-1">Other Products</h3>
          <ShortBottomLine />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6 px-2 bg-slate-50 !justify-items-center text-center">
          <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
            <Link to="/buyer/products">
              <img
              alt=""
                className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                src={image}
              />
            </Link>
            <h3 className="pt-3">Image 1</h3>
          </div>

          <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
            <Link to="/buyer/products">
              <img
              alt=""
                className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                src={image2}
              />
            </Link>
            <h3 className="pt-3">Image 2</h3>
          </div>

          <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
            <Link to="/buyer/products">
              <img
              alt=""
                className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                src={image3}
              />
            </Link>
            <h3 className="pt-3">Image 3</h3>
          </div>

          <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
            <Link to="/buyer/products">
              <img
              alt=""
                className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                src={image4}
              />
            </Link>
            <h3 className="pt-3">Image 5</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

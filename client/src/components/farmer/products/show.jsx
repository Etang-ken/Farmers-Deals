import React, { useEffect, useState } from "react";
import { Image } from "antd";
import Dashboard from "../layouts/dashboard";
import image from "../../styles/farmer/image.jpg";
import image2 from "../../styles/farmer/cocoa1.jpg";
import image3 from "../../styles/farmer/cocoa2.jpg";
import image4 from "../../styles/farmer/coffe3.jpg";
import { Link, useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ShortBottomLine from "../../common/short_bottom_line";
import { useSelector } from "react-redux";

export default function ShowProduct() {
  const [foundProduct, setFoundProduct] = useState(null);
  const params = useParams();

  const products = useSelector((state) => state.farmerProducts.products)

  useEffect(() => {
    const foundProduct = products?.find(product => product?._id === params.id);
    if (foundProduct) {
      setFoundProduct(foundProduct);
      console.log(foundProduct)
    }
  }, [products]);
  return (
    <div className="show-product">
      <Dashboard title="Products / Coco">
        <h1 className="heading-1">Show Product</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="p-3 rounded-lg shadow-xl w-fit">
              <Image className="!h-72 !w-96" src={image} alt='' />
            </div>
            <div className="flex flex-wrap p-3 h-fit">
              <div className="p-3 rounded-lg shadow-xl">
                <Image className="!h-20 !w-20" src={image} alt='' />
              </div>
              <div className="p-3 rounded-lg shadow-xl">
                <Image className="!h-20 !w-20" src={image2} alt='' />
              </div>
              <div className="p-3 rounded-lg shadow-xl">
                <Image className="!h-20 !w-20" src={image3} alt='' />
              </div>
              <div className="p-3 rounded-lg shadow-xl">
                <Image className="!h-20 !w-20" src={image4} alt='' />
              </div>
            </div>
          </div>

          <div className="details">
            <h1 className="text-2xl font-inter">$ 20.00</h1>
            <h1 className="text-4xl font-inter mb-1 th-text-primary">
              Cocoyam
            </h1>
            <p className="text-xs uppercase my-0">Cash Crop</p>

            <p className="pt-5">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, est.
              Saepe, nulla. Omnis exercitationem dignissimos dolorum, laudantium
              minima ut cum fugiat odio quidem beatae nulla voluptate corrupti
              vel pariatur amet!
            </p>

            <div className="flex flex-wrap gap-10 mt-10">
              <Link
                to="/farmer-products/9/edit"
                className="primary-button flex w-fit mt-auto"
              >
                <EditOutlined className="pr-2" /> Edit
              </Link>
              <Link
                to="/farmer-products"
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
              <Link to="/farmer-products">
                <img
                  className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                  src={image} alt=''
                />
              </Link>
              <h3 className="pt-3">Image 1</h3>
            </div>

            <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
              <Link to="/farmer-products">
                <img
                  className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                  src={image2} alt=''
                />
              </Link>
              <h3 className="pt-3">Image 2</h3>
            </div>

            <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
              <Link to="/farmer-products">
                <img
                  className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                  src={image3} alt=''
                />
              </Link>
              <h3 className="pt-3">Image 3</h3>
            </div>

            <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
              <Link to="/farmer-products">
                <img
                  className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                  src={image4} alt=''
                />
              </Link>
              <h3 className="pt-3">Image 5</h3>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

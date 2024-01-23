import React, { useEffect, useState } from "react";
import { Image } from "antd";
import { Link, useParams } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ShortBottomLine from "../../common/short_bottom_line";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateBreadcrubTitleShow } from "../../state_slices/breadcrumbTitleSlice";

export default function ShowProduct() {
  const [foundProduct, setFoundProduct] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const params = useParams();
  const dispatch = useDispatch()

  const products = useSelector((state) => state.farmerProducts.products);

  useEffect(() => {
    const userToken = localStorage.getItem("farmerDealToken");
    const foundProduct = products?.find(
      (product) => product?._id === params.id
    );
    if (foundProduct) {
      dispatch(updateBreadcrubTitleShow('Products / '+ foundProduct?.name))
      setFoundProduct(foundProduct);
      console.log(foundProduct);
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/farmer/product/getImages/${foundProduct._id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((res) => {
          setProductImages(res.data.productImages);
        })
        .catch((error) => {
          console.log("Error: ", error);
        });
    }
  }, [products, foundProduct, params.id]);
  return (
    <div className="show-product">
      <h1 className="heading-1">Show Product</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="p-3 rounded-lg shadow-xl w-fit">
            <Image
              className="!h-72 !w-96"
              src={foundProduct?.imageUrl}
              alt=""
            />
          </div>
          <div className="flex p-3 h-fit !overflow-x-auto">
            {productImages !== null &&
              productImages.length > 0 &&
              productImages?.map((prodImg) => {
                return (
                  <div
                    key={prodImg._id}
                    className="p-3 rounded-lg shadow-xl min-w-[90px] min-h-[90px]"
                  >
                    <Image
                      className="!h-[75px] !w-[75px]"
                      src={prodImg.imageUrl}
                      alt=""
                    />
                  </div>
                );
              })}
          </div>
        </div>

        <div className="details">
          <h1 className="text-2xl font-inter">
            XAF {foundProduct?.pricePerUnit}
          </h1>
          <h1 className="text-4xl font-inter mb-1 th-text-primary">
            {foundProduct?.name}
          </h1>
          <p className="text-xs uppercase my-0">{foundProduct?.category}</p>

          <p className="pt-5">{foundProduct?.description ?? "-"}</p>

          <div className="flex flex-wrap gap-10 mt-10">
            <Link
              to={`/farmer/products/${params.id}/edit`}
              className="primary-button flex w-fit mt-auto"
            >
              <EditOutlined className="pr-2" /> Edit
            </Link>
            <Link
              to="/farmer/products"
              className="danger-button flex w-fit mt-auto"
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
          {products
            .filter((product) => product._id !== foundProduct?._id)
            .map((prod) => {
              return (
                <div
                  key={prod._id}
                  className="p-3 rounded-lg shadow-xl w-fit !h-fit"
                >
                  <Link to={`/farmer/products/${prod._id}/show`}>
                    <img
                      className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                      src={prod.imageUrl}
                      alt=""
                    />
                  </Link>
                  <h3 className="pt-3">{prod.name}</h3>
                </div>
              );
            })}

          {/* <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
              <Link to="/farmer/products">
                <img
                  className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                  src={image2}
                  alt=""
                />
              </Link>
              <h3 className="pt-3">Image 2</h3>
            </div>

            <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
              <Link to="/farmer/products">
                <img
                  className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                  src={image3}
                  alt=""
                />
              </Link>
              <h3 className="pt-3">Image 3</h3>
            </div>

            <div className="p-3 rounded-lg shadow-xl w-fit !h-fit">
              <Link to="/farmer/products">
                <img
                  className="!h-20 !w-20 md:!h-28 md:!w-28 lg:!h-36 lg:!w-36"
                  src={image4}
                  alt=""
                />
              </Link>
              <h3 className="pt-3">Image 5</h3>
            </div> */}
        </div>
      </div>
    </div>
  );
}

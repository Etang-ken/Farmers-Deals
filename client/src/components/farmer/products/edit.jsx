import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Checkbox,
  DatePicker,
  Modal,
  Image,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  DeleteFilled,
} from "@ant-design/icons/lib/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import axios from "axios";
import { updateProducts } from "../../state_slices/farmerProductsSlice";
import { updateBreadcrubTitleShow } from "../../state_slices/breadcrumbTitleSlice";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function EditProduct() {
  const [harvested, setHarvested] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  const [productImages, setProductImages] = useState([]);
  const [productImagesToDelete, setProductImagesToDelete] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.farmerProducts.products);
  const [foundProduct, setFoundProduct] = useState(
    products?.find((product) => product?._id === params.id)
  );
  const [form] = Form.useForm();
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const checkTrue = (e) => {
    setHarvested(e.target.checked);
  };

  const handleRemoveImage = (imageId) => {
    const updatedProductImages = productImages.filter(
      (productImage) => productImage._id !== imageId
    );

    setProductImagesToDelete([...productImagesToDelete, imageId]);

    setProductImages(updatedProductImages);

    // console.log(productImagesToDelete);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const onUpdate = (data) => {
    const userToken = localStorage.getItem("farmerDealToken");
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    if (data.product_image) {
      formData.append("product_image", data.product_image.file.originFileObj);
    }
    // console.log(foundProduct?._id)
    formData.append("product_id", foundProduct?._id);
    formData.append("images_to_delete", productImagesToDelete);
    console.log(fileList);
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formData.append("other_product_images", file.originFileObj);
      });
    }

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/farmer/product/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(updateProducts(res.data.products));
        navigate("/farmer/products");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const userToken = localStorage.getItem("farmerDealToken");
    const foundProd = products?.find((product) => product?._id === params.id);
    setFoundProduct(foundProd);

    if (foundProd) {
      dispatch(updateBreadcrubTitleShow('Products / Edit / '+ foundProd?.name))
      form.setFieldsValue({
        name: foundProd.name,
        category: foundProd.category,
        unit_measurement: foundProd.unitMeasurement,
        price_per_unit: foundProd.pricePerUnit,
        location: foundProd.location,
        description: foundProd.description,
        quantity: foundProd.quantity,
        date_harvested: foundProd.dateHarvested
          ? moment(foundProd.dateHarvested)
          : null,
      });
  
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/farmer/product/getImages/${foundProd._id}`,
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
  }, [products, params.id, foundProduct]);
  return (
    <div className="edit-product">
      <h1 className="heading-1">Edit Product</h1>

      <div className="w-full">
        <div className="section-box">
          <Form
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onUpdate}
            form={form}
          >
            <Form.Item
              label="Image"
              name="product_image"
              rules={[
                {
                  required: false,
                },
              ]}
              className=""
            >
              <Upload
                // action={foundProduct?.imageUrl}
                listType="picture"
                maxCount={1}
              >
                <Button htmlType="button" icon={<UploadOutlined />}>
                  Change Product Image{" "}
                </Button>
              </Upload>
            </Form.Item>

            <div className="bg-white p-2 rounded-md m-1 flex flex-wrap gap-3 items-center">
              <Image src={foundProduct?.imageUrl} className="!h-16 !w-16" />
              <small>Current Product Image</small>
            </div>
            <hr />
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                  },
                  {
                    min: 3,
                    message: "Name must have at least 3 characters",
                  },
                ]}
                className=""
              >
                <Input placeholder="Enter Product Name ..." className="h-10" />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Category is required",
                  },
                ]}
                className=""
              >
                <Select
                  defaultValue="Select Category ..."
                  options={[
                    { value: "", label: "Select Category ..." },
                    { value: "Food Crop", label: "Food Crop" },
                    { value: "Feed Crop", label: "Feed Crop" },
                    { value: "Fibre Crop", label: "Fibre Crop" },
                    { value: "Oil Crop", label: "Oil Crop" },
                    { value: "Ornamental Crop", label: "Ornamental Crop" },
                    { value: "Industrial Crop", label: "Industrial Crop" },
                  ]}
                  className="h-10"
                />
              </Form.Item>

              <Form.Item
                label="Unit of Measurement"
                name="unit_measurement"
                rules={[
                  {
                    required: true,
                    message: "Unit if Measurement is required",
                  },
                ]}
                className=""
              >
                <Input
                  placeholder="e.g per 20 litres / per 50kg bag"
                  className="h-10"
                />
              </Form.Item>

              <Form.Item
                label="Price per Unit Measurement"
                name="price_per_unit"
                rules={[
                  {
                    required: true,
                    message:
                      "Please enter a valid number for Price per Unit Measurement",
                  },
                ]}
                className=""
              >
                <Input placeholder="e.g 25,000" className="h-10" />
              </Form.Item>

              <Form.Item
                label="Location"
                name="location"
                rules={[
                  {
                    required: true,
                    message: "Location is required.",
                  },
                  {
                    min: 3,
                    message: "Location must have at least 3 characters",
                  },
                ]}
                className=""
              >
                <Input placeholder="e.g Tombel, South West" className="h-10" />
              </Form.Item>
            </div>

            <Form.Item
              label="Description"
              name="description"
              // rules={[
              //   {
              //     required: true,
              //   },
              // ]}
              className=""
            >
              <Input.TextArea
                rows="5"
                placeholder="e.g Healthy cocoyams ..."
                className="h-10"
              />
            </Form.Item>

            <div className="pt-5">
              <div className="pb-2">
                <Checkbox onChange={checkTrue}>Products Harvested ?</Checkbox>
              </div>
              {(foundProduct?.quantity > 0 || harvested) && (
                <>
                  <hr />
                  <br />
                  <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                    <Form.Item
                      label="Quantity"
                      name="quantity"
                      // rules={[
                      //   {
                      //     required: true,
                      //   },
                      // ]}
                      className=""
                    >
                      <Input
                        placeholder="e.g 5 - 50kg bags / 4 - 300 kg bags"
                        className="h-10"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Date harvested"
                      name="date_harvested"
                      // rules={[
                      //   {
                      //     required: true,
                      //   },
                      // ]}
                      className=""
                    >
                      <DatePicker className="w-full" />
                    </Form.Item>

                    <Form.Item
                      label="Other Product Images"
                      name="other_product_images"
                      // rules={[
                      //   {
                      //     required: true,
                      //   },
                      // ]}
                      className=""
                    >
                      <Upload
                        //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        listType="picture-card"
                        fileList={fileList}
                        maxCount={10}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        multiple
                      >
                        {fileList.length >= 10 ? null : uploadButton}
                      </Upload>
                      (max = 10 images)
                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{
                            width: "100%",
                          }}
                          src={previewImage}
                        />
                      </Modal>
                    </Form.Item>
                  </div>
                  {productImages !== null && productImages.length > 0 && (
                    <>
                      <br />
                      <hr />
                      <br />
                      <h5>Uploaded Product Images</h5>
                      <div className="flex flex-wrap gap-3">
                        {productImages?.map((prodImg) => {
                          return (
                            <div
                              key={prodImg._id}
                              className="bg-white flex flex-col shadow-sm p-2 rounded-lg gap-1"
                            >
                              <Image
                                src={prodImg.imageUrl}
                                alt=""
                                className="!h-24 !w-24"
                              />
                              <DeleteFilled
                                onClick={() => {
                                  handleRemoveImage(prodImg._id);
                                }}
                                className="ml-auto text-red-500 pl-1"
                              />
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </>
              )}
              <br />
              <br />
              <Button
                htmlType="submit"
                className="primary-button flex w-fit mt-auto ml-auto"
              >
                Update Product
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

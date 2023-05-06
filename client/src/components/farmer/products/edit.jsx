import React, { useState } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Checkbox,
  DatePicker,
  Modal,
} from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons/lib/icons";
import Dashboard from "../layouts/dashboard";
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function EditProduct() {
  const [harvested, setHarvested] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
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

  return (
    <div className="edit-product">
      <Dashboard title="Products / Edit">
        <h1 className="heading-1">Edit Product</h1>

        <div className="w-full">
          <div className="section-box">
            <Form layout="vertical" initialValues={{ remember: true }}>
              <Form.Item
                label="Image"
                name="image"
                rules={[
                  {
                    required: true,
                  },
                ]}
                className=""
              >
                <Upload
                  //   action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  maxCount={1}
                >
                  <Button htmlType="button" icon={<UploadOutlined />}>
                    Upload Product Image{" "}
                  </Button>
                </Upload>
              </Form.Item>
              <hr />
              <br />
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  className=""
                >
                  <Input
                    placeholder="Enter Product Name ..."
                    className="h-10"
                  />
                </Form.Item>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  className=""
                >
                  <Select
                    defaultValue="Select Category ..."
                    options={[
                      { value: "food_crop", label: "Food Crop" },
                      //   { value: "cash_crop", label: "Cash Crop" },
                      { value: "feed_crop", label: "Feed Crop" },
                      { value: "fibre_crop", label: "Fibre Crop" },
                      { value: "oil_crop", label: "Oil Crop" },
                      { value: "ornamental_crop", label: "Ornamental Crop" },
                      { value: "industrial_crop", label: "Industrial Crop" },
                    ]}
                    className="h-10"
                  />
                </Form.Item>

                <Form.Item
                  label="Unit of Measurement"
                  name="unit"
                  rules={[
                    {
                      required: true,
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
                      type: "number",
                    },
                  ]}
                  className=""
                >
                  <Input placeholder="e.g 25,000" className="h-10" />
                </Form.Item>

                <Form.Item
                  label="Price per Unit Measurement"
                  name="price_per_unit"
                  rules={[
                    {
                      required: true,
                      type: "number",
                    },
                  ]}
                  className=""
                >
                  <Input placeholder="e.g 25,000" className="h-10" />
                </Form.Item>
              </div>

              <div className="pt-5">
                <div className="pb-2">
                  <Checkbox onChange={checkTrue}>Products Harvested ?</Checkbox>
                </div>
                {harvested && (
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
                        >
                          {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
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
                  </>
                )}
              </div>
            </Form>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

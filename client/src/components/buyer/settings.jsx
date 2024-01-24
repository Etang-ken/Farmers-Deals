import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Upload, message } from "antd";
import ShortBottomLine from "../common/short_bottom_line";
import "../styles/buyer/settings.css";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../state_slices/buyer/buyerSlice";
import { useForm } from "react-hook-form";
import axios from "axios";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { updateBreadcrumbTitleShow } from "../state_slices/breadcrumbTitleSlice";
import ChangePassword from "./fragments/change_password";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload a JPG/PNG file!");
  }

  const isLt3M = file.size / 1024 / 1024 < 3;
  if (!isLt3M) {
    message.error("Image must be smaller than 3MB!");
  }
  return isJpgOrPng && isLt3M;
};

export default function Settings() {
  const userData = useSelector((state) => state.buyer.user);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();
  const { Option } = Select;

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    getBase64(info.file.originFileObj, (url) => {
      setLoading(false);
      setImageUrl(url);
      console.log(url);
    });
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const {
    register,
    formState: { errors },
  } = useForm();

  const dataURLtoBlob = (dataURL) => {
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  };

  const onSave = (data) => {
    const userToken = localStorage.getItem("buyerDealToken");
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    if (imageUrl != null) {
      const blob = dataURLtoBlob(imageUrl);
      formData.append("image", blob, "profile-image.png");
    }
    axios
      .post(`${process.env.REACT_APP_API_URL}/buyer/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        dispatch(updateUser(res.data.buyer));
        message.open({
          type: "success",
          content: "Profile updated Successfully.",
          style: { padding: "10px 20px", fontWeight: "800" },
        });
      })
      .catch((err) => {
        console.log("Error: ", err);
      });
  };
  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow("Settings"));
  }, [dispatch]);
  return (
    <div className="settings">
      <h1 className="heading-1">Settings</h1>
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="buyer-settings-left bg-slate-50">
            <div className="mb-5">
              <h3 className="heading-4 w-fit !mb-1">Update Settings</h3>
              <ShortBottomLine />
            </div>
            <Form
              layout="vertical"
              initialValues={{ remember: true }}
              encType="multipart/form-data"
              onFinish={onSave}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Form.Item
                  label="First Name / Given Name(s)"
                  name="firstName"
                  initialValue={userData?.firstName ?? ""}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  className=""
                >
                  <Input
                    {...register("firstName")}
                    placeholder="Enter First Name ..."
                    className="h-10"
                  />
                </Form.Item>

                <Form.Item
                  label="Second Name / Surname"
                  name="lastName"
                  initialValue={userData?.lastName ?? ""}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  className=""
                >
                  <Input
                    {...register("lastName")}
                    placeholder="Enter Second Name ..."
                    className="h-10"
                  />
                </Form.Item>
              </div>

              <Form.Item
                label="Email"
                name="email"
                initialValue={userData?.email ?? ""}
                rules={[
                  {
                    required: true,
                    message: "Email is required.",
                  },
                  {
                    type: "email",
                    message: "Invalid email address.",
                  },
                  {
                    min: 6,
                    message: "Email must have atleast 6 characters.",
                  },
                ]}
                className=""
                validateStatus={errors.email ? "error" : ""}
                help={errors.email && errors.email.message}
              >
                <Input
                  {...register("email")}
                  placeholder="e.g buyer@gmail.com ..."
                  className="h-10"
                />
              </Form.Item>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                <Form.Item
                  label="Phone"
                  name="phone"
                  initialValue={userData?.phoneNumber ?? ""}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  className=""
                >
                  <Input
                    {...register("phone")}
                    placeholder="e.g +237 670260611 ..."
                    className="h-10"
                  />
                </Form.Item>

                <Form.Item
                  label="Gender"
                  name="gender"
                  initialValue={userData?.gender ?? ""}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  className=""
                >
                  <Select
                    {...register("gender")}
                    onChange={(value, option) => {
                      if (option) {
                        console.log("Selected option name:", option.name);
                      }
                    }}
                    className="h-10"
                  >
                    <Option value="">Select gender...</Option>
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                  </Select>
                </Form.Item>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                <Form.Item
                  label="City"
                  name="city"
                  initialValue={userData?.city ?? ""}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  className=""
                >
                  <Input
                    {...register("city")}
                    placeholder="e.g Douala ..."
                    className="h-10"
                  />
                </Form.Item>

                <Form.Item
                  label="Region"
                  name="region"
                  initialValue={userData?.region ?? ""}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  className=""
                >
                  <Input
                    {...register("region")}
                    placeholder="e.g South West ..."
                    className="h-10"
                  />
                </Form.Item>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                <Form.Item
                  label="Language"
                  name="language"
                  initialValue={userData?.language ?? ""}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  className=""
                >
                  <Input
                    {...register("language")}
                    placeholder="e.g French ..."
                    className="h-10"
                  />
                </Form.Item>

                <Form.Item
                  label="Location"
                  name="location"
                  initialValue={userData?.about ?? ""}
                  rules={[
                    {
                      required: false,
                    },
                  ]}
                  className=""
                >
                  <Input
                    {...register("location")}
                    placeholder="e.g Mabanda, Douala ..."
                    className="h-10"
                  />
                </Form.Item>
              </div>
              <Form.Item
                label="About"
                name="about"
                initialValue={userData?.about ?? ""}
                rules={[
                  {
                    required: false,
                  },
                ]}
                className=""
              >
                <Input.TextArea
                  {...register("about")}
                  rows="4"
                  placeholder="e.g Supplier ..."
                  className="h-10"
                />
              </Form.Item>

              <Form.Item
                label="Profile Image"
                name="profile"
                rules={[
                  {
                    required: false,
                  },
                ]}
                className=""
              >
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-upload"
                  showUploadList={false}
                  beforeUpload={beforeUpload}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : userData?.imageUrl ? (
                    <img
                      src={userData?.imageUrl}
                      alt="avatar"
                      style={{ width: "100%" }}
                    />
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>

              <div className="flex justify-end">
                <Button htmlType="submit" className="primary-button">
                  Save Changes
                </Button>
              </div>
            </Form>
          </div>

          {/* right  */}
          <div className="buyer-settings-right bg-slate-50">
            <div className="mb-5">
              <h3 className="heading-4 w-fit !mb-1">Change Password</h3>
              <ShortBottomLine />
            </div>
            <ChangePassword />
          </div>
        </div>
      </div>
    </div>
  );
}

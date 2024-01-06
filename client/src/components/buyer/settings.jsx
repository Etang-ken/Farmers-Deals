import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, InputNumber, Select } from "antd";
import Dashboard from "./layouts/dashboard";
import ShortBottomLine from "../common/short_bottom_line";
import "../styles/buyer/settings.css";

export default function Settings() {
  return (
    <div className="settings">
      <Dashboard title="Settings">
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
                // onFinish={onSave}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Form.Item
                    label="First Name / Given Name(s)"
                    name="first_name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className=""
                  >
                    <Input
                      placeholder="Enter First Name ..."
                      className="h-10"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Second Name / Surname"
                    name="second_name"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className=""
                  >
                    <Input
                      placeholder="Enter Second Name ..."
                      className="h-10"
                    />
                  </Form.Item>
                </div>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      type: "email",
                    },
                  ]}
                  className=""
                >
                  <Input
                    placeholder="e.g farmer@gmail.com ..."
                    className="h-10"
                  />
                </Form.Item>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                  <Form.Item
                    label="Phone"
                    name="phone"
                    rules={[
                      {
                        required: true,
                        type: "number",
                      },
                    ]}
                    className=""
                  >
                    <Input
                      placeholder="e.g +237 670260611 ..."
                      className="h-10"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Gender"
                    name="gender"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className=""
                  >
                    <Select
                      defaultValue="Select Gender ..."
                      options={[
                        { value: "male", label: "Male" },
                        { value: "female", label: "Female" },
                        { value: "other", label: "Other" },
                      ]}
                      className="h-10"
                    />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                  <Form.Item
                    label="City"
                    name="city"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className=""
                  >
                    <Input placeholder="e.g Douala ..." className="h-10" />
                  </Form.Item>

                  <Form.Item
                    label="Region"
                    name="region"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className=""
                  >
                    <Input placeholder="e.g South West ..." className="h-10" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                  <Form.Item
                    label="Bio"
                    name="bio"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className=""
                  >
                    <Input placeholder="e.g Supplier ..." className="h-10" />
                  </Form.Item>

                  <Form.Item
                    label="Language"
                    name="language"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                    className=""
                  >
                    <Input placeholder="e.g French ..." className="h-10" />
                  </Form.Item>
                </div>

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
              <Form
                layout="vertical"
                initialValues={{ remember: true }}
                // onFinish={onSave}
              >
                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
                <Form.Item
                  label="Current Password"
                  name="current_password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  className=""
                >
                  <Input
                    placeholder="Enter Current Password ..."
                    className="h-10"
                  />
                </Form.Item>

                <Form.Item
                  label="New Password"
                  name="new_password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  className=""
                >
                  <Input
                    placeholder="Enter New Password ..."
                    className="h-10"
                  />
                </Form.Item>
                {/* </div> */}

                <Form.Item
                  label="Repeat New Password"
                  name="repeat_new_password"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  className=""
                >
                  <Input
                    placeholder="Repeat New Password ..."
                    className="h-10"
                  />
                </Form.Item>

                <div className="flex justify-end">
                  <Button htmlType="submit" className="primary-button">
                    Change
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </Dashboard>
    </div>
  );
}

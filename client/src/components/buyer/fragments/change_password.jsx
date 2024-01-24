import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { isValidPassword } from "../../common/helper/functions";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const {
    formState: { errors },
  } = useForm();
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const userToken = localStorage.getItem("buyerDealToken");
      await axios.post(
        `${process.env.REACT_APP_API_URL}/buyer/change-password`,
        values,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      message.success("Password changed successfully.");
      form.resetFields();
    } catch (error) {
      console.error("Error changing password:", error);
      if(error.response.status === 401) {
        message.error("Wrong old password. Please try again.");
      } else {
        message.error("Error changing password. Please try again.");
      }
      
    } finally {
      setLoading(false);
    }
  };
  return (
    <Form
    form={form}
      layout="vertical"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
      <Form.Item
        label="Current Password"
        name="currentPassword"
        rules={[
          {
            required: true,
            message: "Current Password is required",
          },
          {
            min: 8,
            message: "Password must have at least 8 characters",
          },
          {
            validator: (_, value) =>
              isValidPassword(value)
                ? Promise.resolve()
                : Promise.reject(
                    "Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
                  ),
          },
        ]}
        validateStatus={errors.currentPassword ? "error" : ""}
        help={errors.currentPassword && errors.currentPassword.message}
        className=""
      >
        <Input.Password
          placeholder="Enter Current Password ..."
          className="h-10"
        />
      </Form.Item>

      <Form.Item
        label="New Password"
        name="newPassword"
        rules={[
          {
            required: true,
            message: "New Password is required",
          },
          {
            min: 8,
            message: "New Password must have at least 8 characters",
          },
          {
            validator: (_, value) =>
              isValidPassword(value)
                ? Promise.resolve()
                : Promise.reject(
                    "Password must contain a minimum of eight characters, at least one uppercase letter, one lowercase letter, one number and one special character."
                  ),
          },
        ]}
        validateStatus={errors.newPassword ? "error" : ""}
        help={errors.newPassword && errors.newPassword.message}
        className=""
      >
        <Input.Password placeholder="Enter New Password ..." className="h-10" />
      </Form.Item>
      {/* </div> */}

      <Form.Item
        label="Repeat New Password"
        name="repeatNewPassword"
        rules={[
          {
            required: true,
            message: "Please confirm your password.",
          },
          {
            min: 8,
            message: "Password must have at least 8 characters",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              const password = getFieldValue("newPassword");
              return password === value
                ? Promise.resolve()
                : Promise.reject("New passwords do not match.");
            },
          }),
        ]}
        validateStatus={errors.repeatNewPassword ? "error" : ""}
        help={errors.repeatNewPassword && errors.repeatNewPassword.message}
        className=""
      >
        <Input.Password
          placeholder="Repeat New Password ..."
          className="h-10"
        />
      </Form.Item>

      <div className="flex justify-end">
        <Button htmlType="submit" className="primary-button" loading={loading}>
          Change
        </Button>
      </div>
    </Form>
  );
}

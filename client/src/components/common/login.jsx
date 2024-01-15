import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Spin } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { isValidPassword } from "./helper/functions";
import { useDispatch } from "react-redux";
import { updateUser } from "../state_slices/farmerSlice";
import axios from "axios";

export default function Login() {
  const [showValidCred, setShowValidCred] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
  } = useForm();

  const onSave = (formData) => {
    // console.log("formData", formData);
    setIsLoading(true);
    setShowValidCred(0);
    axios
      .post(`${process.env.REACT_APP_API_URL}/farmer/login`, {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        dispatch(updateUser(res.data.farmer));
        localStorage.setItem("farmerDealToken", res.data.token);
        setShowValidCred(false);
        navigate("/farmer-home");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err.response);
        if (err.response.status == 401) {
          setShowValidCred(true);
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("farmerDealToken");
    if (token) {
      navigate("/farmer-home");
    }
  }, [navigate]);
  return (
    <div className="login th-text-white">
      <div className="my-10 mx-auto w-10/12 md:w-1/2 lg:w-4/12 rounded-3xl shadow">
        <div className="h-24 w-full th-bg-primary rounded-t-3xl header">
          <div className="h-3/6">
            <Link to="/">
              <p className="pl-3 pt-3">Logo</p>
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <h2 className="text-3xl">Sign In</h2>
          </div>
        </div>

        <div className="body-class py-8 rounded-b-3xl border">
          <div className="w-full px-4 md:px-6 lg:px-5 xl:px-12">
            <Form
              layout="vertical"
              initialValues={{ remember: true }}
              onFinish={onSave}
            >
              <div className="mb-6">
                <Form.Item
                  label="Email"
                  name="email"
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
                  validateStatus={errors.email ? "error" : ""}
                  help={errors.email && errors.email.message}
                >
                  <Input
                    {...register("email")}
                    placeholder="Enter Email..."
                    className="rounded-full h-10"
                  />
                </Form.Item>
                {showValidCred && (
                  <span className="text-red-500 text-xs">
                    Invalid credentials.
                  </span>
                )}
              </div>

              <div className="mb-6">
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Password is required",
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
                  validateStatus={errors.password ? "error" : ""}
                  help={errors.password && errors.password.message}
                  className=""
                >
                  <Input.Password
                    {...register("password")}
                    placeholder="Enter Password..."
                    className="rounded-full h-10"
                  />
                </Form.Item>
              </div>

              <div className="flex justify-end">
                <Link to="/" className="font-semibold hover:!opacity-70">
                  Forgot <span className="th-text-primary">Password?</span>
                </Link>
              </div>

              <Form.Item className="pt-6">
                <Button
                  disabled={isLoading}
                  htmlType="submit"
                  className="w-full th-bg-primary th-text-white h-11 rounded-full font-semibold flex items-center justify-center"
                >
                  <span className="!flex items-center gap-2 text-white">
                    {isLoading && (
                      <Spin size="small" className="text-white">
                        <div className="content" />
                      </Spin>
                    )}
                    <LoginOutlined /> Login
                  </span>
                </Button>
              </Form.Item>

              <div className="pt-6 text-center">
                <small>Don't have an account?</small> <br />
                <Link
                  to="/register"
                  className="font-bold th-text-primary text-lg"
                >
                  Sign Up
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

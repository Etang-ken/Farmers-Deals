import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { Button, Form, Input, Spin } from "antd";
import { FormOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { isValidPassword } from "./helper/functions";
import axios from "axios";

export default function Register() {
  const [showUsedUsernameOrEmail, setShowUsedusernameOrEmail] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
  } = useForm();
  // console.log(process.env)

  const onSave = (formData) => {
    setIsLoading(true);
    setShowUsedusernameOrEmail(0);
    axios
      .post(`${process.env.REACT_APP_API_URL}/farmer/register`, {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        console.log("data: ", res.data);
        setShowUsedusernameOrEmail(0);
        navigate("/login");
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err.response);
        if (
          err.response.status === 400 &&
          err.response.data.code === "EMAIL_EXISTS"
        ) {
          setShowUsedusernameOrEmail(1);
        } else if (
          err.response.status === 400 &&
          err.response.data.code === "USERNAME_EXISTS"
        ) {
          setShowUsedusernameOrEmail(2);
        } else if (
          err.response.status === 400 &&
          err.response.data.code === "EMAIL_USERNAME_EXISTS"
        ) {
          setShowUsedusernameOrEmail(3);
        } else {
          setShowUsedusernameOrEmail(0);
        }
        setIsLoading(false);
      });
  };

  return (
    <div className="register th-text-white">
      <div className="my-10 mx-auto w-10/12 md:w-1/2 lg:w-4/12 rounded-3xl shadow">
        <div className="h-24 w-full th-bg-primary rounded-t-3xl header">
          <div className="h-3/6">
            <Link to="/">
              <p className="pl-3 pt-3">Logo</p>
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <h2 className="text-3xl">Sign Up</h2>
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
                  label="Username"
                  className=""
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Username is required",
                    },
                    {
                      min: 3,
                      message: "Username must have at least 3 characters",
                    },
                  ]}
                  validateStatus={errors.username ? "error" : ""}
                  help={errors.username && errors.username.message}
                >
                  <Input
                    type="text"
                    {...register("username")}
                    placeholder="Enter Username..."
                    className="rounded-full h-10"
                  />
                </Form.Item>
                {showUsedUsernameOrEmail === 2 && (
                  <span className="text-red-500 text-xs">
                    Username already exists, please use different username and
                    email.
                  </span>
                )}
                {showUsedUsernameOrEmail === 3 && (
                  <span className="text-red-500 text-xs">
                    Username and Email already exists, please use a different
                    one.
                  </span>
                )}
              </div>

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
                {showUsedUsernameOrEmail === 1 && (
                  <span className="text-red-500 text-xs">
                    Email already exists, please use a different one.
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

              <div className="mb-6">
                <Form.Item
                  label="Confirm Password"
                  className=""
                  name="confirm_password"
                  dependencies={["password"]}
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
                        const password = getFieldValue("password");
                        return password === value
                          ? Promise.resolve()
                          : Promise.reject("Passwords do not match.");
                      },
                    }),
                  ]}
                  validateStatus={errors.confirm_password ? "error" : ""}
                  help={
                    errors.confirm_password && errors.confirm_password.message
                  }
                >
                  <Input.Password
                    {...register("confirm_password")}
                    placeholder="Confirm Password..."
                    className="rounded-full h-10"
                  />
                </Form.Item>
              </div>

              {/* <div className='flex justify-end'>
                <Link to='/' className='font-semibold hover:!opacity-70'>Forgot <span className='secondary-text'>Password?</span></Link>
              </div> */}

              <Form.Item className="pt-6">
                <Button
                disabled={isLoading}
                  htmlType="submit"
                  className="w-full th-bg-primary th-text-white hover:text-white h-11 rounded-full font-semibold flex items-center justify-center"
                >
                  <span className="!flex items-center gap-2 text-white">
                  
                    {isLoading && (
                      <Spin size="small" className="text-white">
                        <div className="content" />
                      </Spin>
                    )}
                    <FormOutlined /> Register
                  </span>
                </Button>
              </Form.Item>

              <div className="pt-6 text-center">
                <span>Already have an account?</span> <br />
                <Link to="/login" className="font-bold th-text-primary text-lg">
                  Sign In
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

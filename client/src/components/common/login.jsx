import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd"
import { LoginOutlined } from "@ant-design/icons";

export default function Login() {
  const [test, setTest] = useState("Ken");
  return (
    <div className="login th-text-white">
      <div className="my-10 mx-auto w-10/12 md:w-1/2 lg:w-4/12 rounded-3xl shadow">
        <div className="h-24 w-full th-bg-primary rounded-t-3xl header">
          <div className="h-3/6">
            <Link to="/"><p className="pl-3 pt-3">Logo</p></Link>
          </div>
          <div className="w-full flex justify-center">
            <h2 className="text-3xl">Sign In</h2>
          </div>
        </div>
        

        <div className="body-class py-8 rounded-b-3xl border">
          <div className="w-full px-4 md:px-6 lg:px-5 xl:px-12">
            <Form 
              layout="vertical">
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                  }
                ]}
                className=""
          
              >
                <Input placeholder="Enter Username..." className="rounded-full h-10"/>
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                  }
                ]}
                className=""
          
              >
                <Input.Password placeholder="Enter Password..." className="rounded-full h-10"/>
              </Form.Item>

              <div className="flex justify-end">
                <Link to="/" className="font-semibold hover:!opacity-70">Forgot <span className="th-text-primary">Password?</span></Link>
              </div>

              <Form.Item className="pt-6">
                <Button htmlType="submit" className="w-full th-bg-primary th-text-white h-11 rounded-full font-semibold flex items-center justify-center"><LoginOutlined /> <span>Login</span></Button>
              </Form.Item>

              <div className="pt-6 text-center">
                <small>Don't have an account?</small> <br />
                <Link to="/register" className="font-bold th-text-primary text-lg">Sign Up</Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

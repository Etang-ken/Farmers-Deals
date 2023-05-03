import React, { useState } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { Link, NavLink } from "react-router-dom";
import {
  HomeOutlined,
  LikeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  FileImageOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  FormOutlined,
  LoginOutlined,
  DownOutlined
} from "@ant-design/icons";
import SubMenu from "antd/lib/menu/SubMenu";

const { Header, Footer, Sider, Content } = Layout;
// import logo from './logo.svg';
// import "./App.css";

const headerStyle = {
  color: "var(--white)",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "var(--primary-bold)",
  position: "sticky",
  top: 0,
  zIndex: 2,
};
const contentStyle = {
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
};
const siderStyle = {
  lineHeight: "100%",
  //   height: '100%',
  color: "var(--secondary)",
  backgroundColor: "var(--white)",
  position: "sticky",
  top: 64,
  zIndex: 1,
};
const footerStyle = {
  color: "var(--primary-bold)",
  fontWeight: "600",
  backgroundColor: "var(--light)",
  textAlign: "center",
};
const items = [
  {
    key: "1",
    label: (
      <Link to="/register" className="flex items-center ">
        <FormOutlined className="pr-2" /> Register
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to="/login" className="flex items-center ">
        <LoginOutlined className="pr-2" /> Log In
      </Link>
    ),
  },
];
export default function Dashboard(props) {
  return (
    <div className="App" style={{ textAlign: "left" }}>
      {/* <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}> */}
      <Layout>
        <Header
          style={headerStyle}
          className="th-bg-primary-bold th-text-white"
        >
          {/* <Avatar style={{ float: 'right' }} src='./dp.png' /> */}
          <Dropdown menu={{ items, }} className="float-right">
            <Link to="#" className="th-text-white w-auto">
              <Space>Drop Me <DownOutlined /></Space>
            </Link>
          </Dropdown>
          <Title style={{ color: "var(--white)" }} level={3}>
            Kencliff
          </Title>
          
        </Header>
        <Layout>
          <Sider style={siderStyle} className="fixed hidden md:block">
            <Menu mode="inline" style={siderStyle} className="">
              <Menu.Item key="Dashboard" className="hover:!bg-white">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-home"
                >
                  <HomeOutlined className="pr-2" /> Dashboard
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Products">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-products"
                >
                  <ShopOutlined className="pr-2" /> Products
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Deals">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-deals"
                >
                  <LikeOutlined className="pr-2" /> Deals
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Deal Requests">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-deal-requests"
                >
                  <ShoppingCartOutlined className="pr-2" /> Deal Requests
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Images">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-images"
                >
                  <FileImageOutlined className="pr-2" /> Images
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Profile">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-profile"
                >
                  <UserOutlined className="pr-2" /> Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Settings">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-settings"
                >
                  <SettingOutlined className="pr-2" /> Settings
                </NavLink>
              </Menu.Item>
              <Menu.Item key="LogOut">
                <NavLink className="flex items-center" to="#">
                  <LogoutOutlined className="pr-2" /> Log Out
                </NavLink>
              </Menu.Item>
              {/* <SubMenu
                title={
                  <span>
                    <MailOutlined />
                    <span>About US</span>
                  </span>
                }
              >
                <Menu.ItemGroup key="AboutUS" title="Country 1">
                  <Menu.Item key="location1" onClick={() => setNavMenuItem(1)}>
                    Location 1
                  </Menu.Item>
                  <Menu.Item key="location2" onClick={() => setNavMenuItem(2)}> Location 2</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu> */}
            </Menu>
          </Sider>


          {/* mobile sider  */} {
            <Sider style={siderStyle} className="fixed sm:block md:hidden" collapsible collapsedWidth="0">
            <Menu mode="inline" style={siderStyle} className="">
              <Menu.Item key="Dashboard" className="hover:!bg-white">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-home"
                >
                  <HomeOutlined className="pr-2" /> Dashboard
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Products">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-products"
                >
                  <ShopOutlined className="pr-2" /> Products
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Deals">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-deals"
                >
                  <LikeOutlined className="pr-2" /> Deals
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Deal Requests">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-deal-requests"
                >
                  <ShoppingCartOutlined className="pr-2" /> Deal Requests
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Images">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-images"
                >
                  <FileImageOutlined className="pr-2" /> Images
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Profile">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-profile"
                >
                  <UserOutlined className="pr-2" /> Profile
                </NavLink>
              </Menu.Item>
              <Menu.Item key="Settings">
                <NavLink
                  className={({ isActive, isPending }) =>
                    isActive
                      ? "flex items-center activeClass"
                      : "flex items-center"
                  }
                  to="/farmer-settings"
                >
                  <SettingOutlined className="pr-2" /> Settings
                </NavLink>
              </Menu.Item>
              <Menu.Item key="LogOut">
                <NavLink className="flex items-center" to="#">
                  <LogoutOutlined className="pr-2" /> Log Out
                </NavLink>
              </Menu.Item>
              {/* <SubMenu
                title={
                  <span>
                    <MailOutlined />
                    <span>About US</span>
                  </span>
                }
              >
                <Menu.ItemGroup key="AboutUS" title="Country 1">
                  <Menu.Item key="location1" onClick={() => setNavMenuItem(1)}>
                    Location 1
                  </Menu.Item>
                  <Menu.Item key="location2" onClick={() => setNavMenuItem(2)}> Location 2</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu> */}
            </Menu>
          </Sider>
          }

          <Layout>
            <Content style={{ padding: "0 50px" }}>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Farmer</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
              <div style={{ background: "#fff", padding: 24, minHeight: 580 }}>
                {props.children}
              </div>
            </Content>
            {/* <CareerDetails player={selectedPlayer} visible={visible} onClose={onClose} /> */}
            <Footer style={footerStyle}>
              Ant Design Layout example Created by Kencliff
            </Footer>
          </Layout>
        </Layout>
      </Layout>
      {/* </Space> */}
    </div>
  );
}

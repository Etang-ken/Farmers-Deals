import React from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Space } from "antd";
import Title from "antd/lib/typography/Title";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  HomeOutlined,
  LikeOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  FileImageOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

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
const siderStyle = {
  lineHeight: "100%",
  height: "100%",
  color: "var(--secondary)",
  backgroundColor: "var(--white)",
  // top: 64,
  zIndex: 10,
};
const footerStyle = {
  color: "var(--primary-bold)",
  fontWeight: "600",
  backgroundColor: "var(--light)",
  textAlign: "center",
};

const menuData = [
  {
    key: "Dashboard",
    url: "/farmer-home",
    icon: <HomeOutlined className="pr-2" />,
    title: "Dashboard",
  },
  {
    key: "Products",
    url: "/farmer-products",
    icon: <ShopOutlined className="pr-2" />,
    title: "Products",
  },
  {
    key: "Deals",
    url: "/farmer-deals",
    icon: <LikeOutlined className="pr-2" />,
    title: "Deals",
  },
  {
    key: "Orders",
    url: "/farmer-orders",
    icon: <ShoppingCartOutlined className="pr-2" />,
    title: "Orders",
  },
  {
    key: "Images",
    url: "/farmer-images",
    icon: <FileImageOutlined className="pr-2" />,
    title: "Images",
  },
  {
    key: "Profile",
    url: "/farmer-profile",
    icon: <UserOutlined className="pr-2" />,
    title: "Profile",
  },
  {
    key: "Settings",
    url: "/farmer-settings",
    icon: <SettingOutlined className="pr-2" />,
    title: "Settings",
  },
];

const mapMenu = () => {
  return menuData.map((data) => {
    return (
      <Menu.Item key={data.key} className="hover:!bg-white">
        <NavLink
          className={({ isActive, isPending }) =>
            isActive ? "flex items-center activeClass" : "flex items-center"
          }
          to={data.url}
        >
          {data.icon} {data.title}
        </NavLink>
      </Menu.Item>
    );
  });
};
export default function Dashboard(props) {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("farmerDealToken");
    navigate("/login");
  };
  const items = [
    {
      key: "1",
      label: (
        <Link to="/farmer-profile" className="flex items-center ">
          <UserOutlined className="pr-2" /> Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link to="/farmer-settings" className="flex items-center ">
          <SettingOutlined className="pr-2" /> Settings
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <a type="button" onClick={logout} className="flex items-center ">
          <LogoutOutlined className="pr-2" /> Log Out
        </a>
      ),
    },
  ];
  return (
    <div className="App" style={{ textAlign: "left" }}>
      <Layout>
        <Header
          style={headerStyle}
          className="th-bg-primary-bold th-text-white"
        >
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            className="float-right"
          >
            <Link to="#" className="th-text-white w-auto hover:!text-slate-300">
              <Space>
                My Profile <DownOutlined />
              </Space>
            </Link>
          </Dropdown>
          <Title style={{ color: "var(--white)" }} level={3}>
            Kencliff
          </Title>
        </Header>
        <Layout>
          <Sider style={siderStyle} className="!fixed hidden md:block !z-50">
            <Menu mode="inline" className="">
              {mapMenu()}
            </Menu>
          </Sider>

          <Sider
            style={siderStyle}
            className="!fixed sm:block md:hidden !z-50"
            collapsible
            collapsedWidth="0"
          >
            <Menu mode="inline" style={siderStyle} className="">
              {mapMenu()}
            </Menu>
          </Sider>

          <Layout>
            <Content className="sm:!px-0 sm:ml-0 md:ml-48 px-1 md:!pl-11 md:!pr-9">
              <Breadcrumb
                style={{ margin: "16px 0" }}
                items={[
                  {
                    title: "Farmer",
                  },
                  {
                    title: `${props.title}`,
                  },
                ]}
              ></Breadcrumb>
              <div
                style={{ background: "#fff", padding: 24, minHeight: 580 }}
                className="mx-2 md:mx-0"
              >
                {props.children}
              </div>
            </Content>
            {/* <CareerDetails player={selectedPlayer} visible={visible} onClose={onClose} /> */}
            <Footer style={footerStyle}>Created by Kencliff</Footer>
          </Layout>
        </Layout>
      </Layout>
      {/* </Space> */}
    </div>
  );
}

import React from "react";
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
  DownOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;
// import logo from './logo.svg'
// import './App.css'

const headerStyle = {
  color: "var(--white)",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "var(--third-bold)",
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
const items = [
  {
    key: "1",
    label: (
      <Link to="/buyer-profile" className="flex items-center ">
        <UserOutlined className="pr-2" /> Profile
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link to="/buyer-settings" className="flex items-center ">
        <SettingOutlined className="pr-2" /> Settings
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <Link to="/login" className="flex items-center ">
        <LogoutOutlined className="pr-2" /> Log Out
      </Link>
    ),
  },
];

const menuData = [
  {
    key: "Dashboard",
    url: "/buyer-home",
    icon: <HomeOutlined className="pr-2" />,
    title: "Dashboard",
  },
  {
    key: "Products",
    url: "/buyer-products",
    icon: <ShopOutlined className="pr-2" />,
    title: "Products",
  },
  {
    key: "Deals",
    url: "/buyer-deals",
    icon: <LikeOutlined className="pr-2" />,
    title: "Deals",
  },
  {
    key: "Orders",
    url: "/buyer-orders",
    icon: <ShoppingCartOutlined className="pr-2" />,
    title: "Orders",
  },
  {
    key: "Images",
    url: "/buyer-images",
    icon: <FileImageOutlined className="pr-2" />,
    title: "Images",
  },
  {
    key: "Profile",
    url: "/buyer-profile",
    icon: <UserOutlined className="pr-2" />,
    title: "Profile",
  },
  {
    key: "Settings",
    url: "/buyer-settings",
    icon: <SettingOutlined className="pr-2" />,
    title: "Settings",
  },
  // {
  //   key: 'LogOut',
  //   url: '/',
  //   icon: <LogoutOutlined className='pr-2' />,
  //   title: 'LogOut',
  // },
];

const mapMenu = () => {
  return menuData.map((data) => {
    return (
      <Menu.Item key={data.key} className="hover:!bg-white">
        <NavLink
          className={({ isActive, isPending }) =>
            isActive
              ? "flex items-center third-activeClass"
              : "flex items-center"
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
  return (
    <div className="App" style={{ textAlign: "left" }}>
      {/* <Space direction='vertical' style={{ width: '100%' }} size={[0, 48]}> */}
      <Layout>
        <Header style={headerStyle} className="th-bg-third-bold th-text-white">
          {/* <Avatar style={{ float: 'right' }} src='./dp.png' /> */}
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
              <Menu.Item key="LogOut" className="hover:!bg-white">
                <NavLink
                  // className={({ isActive, isPending }) =>
                  //   isActive
                  //     ? 'flex items-center activeClass'
                  //     : 'flex items-center'
                  // }
                  to="#"
                >
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
                <Menu.ItemGroup key='AboutUS' title='Country 1'>
                  <Menu.Item key='location1' onClick={() => setNavMenuItem(1)}>
                    Location 1
                  </Menu.Item>
                  <Menu.Item key='location2' onClick={() => setNavMenuItem(2)}> Location 2</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu> */}
            </Menu>
          </Sider>

          {/* mobile sider  */}
          <Sider
            style={siderStyle}
            className="!fixed sm:block md:hidden !z-50"
            collapsible
            collapsedWidth="0"
          >
            <Menu mode="inline" style={siderStyle} className="">
              {mapMenu()}
              <Menu.Item key="LogOut" className="hover:!bg-white">
                <NavLink
                  // className={({ isActive, isPending }) =>
                  //   isActive
                  //     ? 'flex items-center activeClass'
                  //     : 'flex items-center'
                  // }
                  to="#"
                >
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
                <Menu.ItemGroup key='AboutUS' title='Country 1'>
                  <Menu.Item key='location1' onClick={() => setNavMenuItem(1)}>
                    Location 1
                  </Menu.Item>
                  <Menu.Item key='location2' onClick={() => setNavMenuItem(2)}> Location 2</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu> */}
            </Menu>
          </Sider>

          <Layout>
            <Content className="sm:!px-0 sm:ml-0 md:ml-48 px-1 md:!pl-11 md:!pr-9">
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Buyer</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
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

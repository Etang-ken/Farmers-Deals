import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Space } from "antd";
import {
  EditOutlined,
  SearchOutlined,
  CloseCircleFilled,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "../../styles/buyer/orders.css";
import image from "../../styles/buyer/image.jpg";
import { useDispatch } from "react-redux";
import { updateBreadcrumbTitleShow } from "../../state_slices/breadcrumbTitleSlice";

export default function Orders() {
  
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch();
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Product Image",
      dataIndex: "product_image",
      key: "product_image",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      // width: "30%",
      ...getColumnSearchProps("product_name"),
      sorter: (a, b) => a.product_name.length - b.product_name.length,
    },
    {
      title: "Farmer's Name",
      dataIndex: "farmer_name",
      key: "farmer_name",
      // width: "20%",
      ...getColumnSearchProps("farmer_name"),
      sorter: (a, b) => a.farmer_name.length - b.farmer_name.length,
    },
    {
      title: "Farmer's Location",
      dataIndex: "farmer_location",
      key: "farmer_location",
      // width: "20%",
      ...getColumnSearchProps("farmer_location"),
      sorter: (a, b) => a.farmer_location.length - b.farmer_location.length,
    },
    {
      title: "Latest Date Needed",
      dataIndex: "latest_date_needed",
      key: "latest_date_needed",
      // width: "20%",
      ...getColumnSearchProps("latest_date_needed"),
    },
    {
      title: "Quantity Needed",
      dataIndex: "quantity",
      key: "quantity",
      ...getColumnSearchProps("quantity"),
      sorter: (a, b) => a.quantity.length - b.quantity.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];
  
  const actionFunc = (viewUrl, editUrl, cancelUrl, phoneUrl, emailUrl) => {
    return (
      <div className="flex gap-3">
        <Link to={viewUrl} className="flex items-center">
          <EyeOutlined className="text-green-600 text-lg" />
        </Link>

        <Link to={editUrl} className="flex items-center">
          <EditOutlined className="text-blue-600 text-lg" />
        </Link>

        <Link to={cancelUrl} className="flex items-center">
          <CloseCircleFilled className="text-red-500 font-extrabold text-lg" />
        </Link>
        <span className="text-3xl th-text-primary font-semibold">|</span>
        <Link to={"tel:" + phoneUrl} className="flex items-center">
          <PhoneOutlined className="text-green-600 text-lg" />
        </Link>

        <Link to={"mailto:" + emailUrl} className="flex items-center">
          <MailOutlined className="text-gray-500 font-extrabold text-lg" />
        </Link>
      </div>
    );
  };
  const data = [
    {
      key: "1",
      product_image: <img src={image} alt="" height="50" width="50" />,
      product_name: "Irish Potato",
      farmer_name: "John Doe",
      farmer_location: "Douala",
      latest_date_needed: "05-06-2023",
      quantity: "3 300kg bags",
      action: actionFunc(
        "/buyer/orders/100fdsjkuish/show",
        "/buyer/orders/100fdsjkuish/edit",
        "/buyer/products",
        "670260611",
        "etang@gmail.com"
      ),
    },
    {
      key: "2",
      product_image: <img src={image} alt="" height="50" width="50" />,
      product_name: "Cocoyam",
      farmer_name: "Mary Doe",
      farmer_location: "Buea",
      latest_date_needed: "09-05-2023",
      quantity: "2 300kg bags",
      action: actionFunc(
        "/buyer/orders/100fdsjkuish/show",
        "/buyer/orders/100fdsjkuish/edit",
        "/buyer/products",
        "670260611",
        "etang@gmail.com"
      ),
    },
    {
      key: "3",
      product_image: <img src={image} alt="" height="50" width="50" />,
      product_name: "Tomato",
      farmer_name: "Tyler Lockwood",
      farmer_location: "Kribi",
      latest_date_needed: "12-06-2023",
      quantity: "2 300kg bags",
      action: actionFunc(
        "/buyer/orders/100fdsjkuish/show",
        "/buyer/orders/100fdsjkuish/edit",
        "/buyer/products",
        "652547170",
        "cliff@gmail.com"
      ),
    },
    {
      key: "4",
      product_image: <img src={image} alt="" height="50" width="50" />,
      product_name: "Egusi",
      farmer_name: "Prince Nico",
      farmer_location: "Yaounde",
      latest_date_needed: "22-05-2023",
      quantity: "2 50kg bags",
      action: actionFunc(
        "/buyer/orders/100fdsjkuish/show",
        "/buyer/orders/100fdsjkuish/edit",
        "/buyer/products",
        "670577192",
        "veruska@gmail.com"
      ),
    },
  ];

  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow("Orders"));
  }, [dispatch]);
  return (
    <div className="orders" style={{ textAlign: "left" }}>
      <div className="flex flex-wrap items-center">
        <h1 className="heading-1">Orders</h1>
        <div className="ml-auto pb-3">
          <Link
            to="/buyer/orders/create"
            className="primary-button flex w-fit  mt-auto"
          >
            <PlusOutlined className="pr-2 !font-extrabold" /> Add Order
          </Link>
        </div>
      </div>
      <div className="table-div">
        <Table columns={columns} dataSource={data} id="orders-table" />
      </div>
    </div>
  );
}

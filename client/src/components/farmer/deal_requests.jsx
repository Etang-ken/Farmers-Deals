import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  EyeOutlined,
  CloseCircleFilled,
  MailOutlined,
  PhoneOutlined
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Dashboard from "./layouts/dashboard";
import "./styles/deal_requests.css";
import image from "./styles/image.jpg";

export default function DealRequests() {
  // const columns = [
  //   {
  //     title: 'Name',
  //     dataIndex: 'name',
  //     filters: [
  //       {
  //         text: 'Joe',
  //         value: 'Joe',
  //       },
  //       {
  //         text: 'Category 1',
  //         value: 'Category 1',
  //         children: [
  //           {
  //             text: 'Yellow',
  //             value: 'Yellow',
  //           },
  //           {
  //             text: 'Pink',
  //             value: 'Pink',
  //           },
  //         ],
  //       },
  //       {
  //         text: 'Category 2',
  //         value: 'Category 2',
  //         children: [
  //           {
  //             text: 'Green',
  //             value: 'Green',
  //           },
  //           {
  //             text: 'Black',
  //             value: 'Black',
  //           },
  //         ],
  //       },
  //     ],
  //     filterMode: 'tree',
  //     filterSearch: true,
  //     onFilter: (value, record) => record.name.includes(value),
  //     width: '30%',
  //   },
  //   {
  //     title: 'Age',
  //     dataIndex: 'age',
  //     sorter: (a, b) => a.age - b.age,
  //   },
  //   {
  //     title: 'Address',
  //     dataIndex: 'address',
  //     filters: [
  //       {
  //         text: 'London',
  //         value: 'London',
  //       },
  //       {
  //         text: 'New York',
  //         value: 'New York',
  //       },
  //     ],
  //     onFilter: (value, record) => record.address.startsWith(value),
  //     filterSearch: true,
  //     width: '40%',
  //   },
  //   {
  //     title: 'Action',
  //     dataIndex: 'action'
  //   },
  // ];
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
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
      title: "Buyer's Name",
      dataIndex: "buyer_name",
      key: "buyer_name",
      // width: "20%",
      ...getColumnSearchProps("buyer_name"),
      sorter: (a, b) => a.buyer_name.length - b.buyer_name.length,
    },
    {
      title: "Buyer's Location",
      dataIndex: "buyer_location",
      key: "buyer_location",
      // width: "20%",
      ...getColumnSearchProps("buyer_location"),
      sorter: (a, b) => a.buyer_location.length - b.buyer_location.length,
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
  // const data = [];
  // for (let i = 0; i < 46; i++) {
  //   data.push({
  //     key: i,
  //     product_name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }
  const actionFunc = (viewUrl, cancelUrl, phoneUrl, emailUrl) => {
    return (
        <div className="flex gap-3">
          <Link to={viewUrl} className="flex items-center">
            <EyeOutlined className="text-green-600 text-lg" />
          </Link>

          <Link to={cancelUrl} className="flex items-center" danger>
            <CloseCircleFilled className="text-red-500 font-extrabold text-lg" />
          </Link>
          <span className="text-3xl th-text-primary font-semibold">|</span>
          <Link to={"tel:" + phoneUrl} className="flex items-center">
            <PhoneOutlined className="text-blue-600 text-lg" />
          </Link>

          <Link to={"mailto:" + emailUrl} className="flex items-center" danger>
            <MailOutlined className="text-gray-500 font-extrabold text-lg" />
          </Link>
        </div>
      )
  }
  const data = [
    {
      key: "1",
      product_image: <img src={image} height="50" width="50" />,
      product_name: "Irish Potato",
      buyer_name: "John Doe",
      buyer_location: "Douala",
      latest_date_needed: "05-06-2023",
      quantity: "3 300kg bags",
      action: actionFunc("/farmer-products", "/farmer-products", "670260611", "etang@gmail.com"),
    },
    {
      key: "2",
      product_image: <img src={image} height="50" width="50" />,
      product_name: "Cocoyam",
      buyer_name: "Mary Doe",
      buyer_location: "Buea",
      latest_date_needed: "09-05-2023",
      quantity: "2 300kg bags",
      action: actionFunc("/farmer-products", "/farmer-products", "673928703", "ken@gmail.com"),
    },
    {
      key: "3",
      product_image: <img src={image} height="50" width="50" />,
      product_name: "Tomato",
      buyer_name: "Tyler Lockwood",
      buyer_location: "Kribi",
      latest_date_needed: "12-06-2023",
      quantity: "2 300kg bags",
      action: actionFunc("/farmer-products", "/farmer-products", "652547170", "cliff@gmail.com"),
    },
    {
      key: "4",
      product_image: <img src={image} height="50" width="50" />,
      product_name: "Egusi",
      buyer_name: "Prince Nico",
      buyer_location: "Yaounde",
      latest_date_needed: "22-05-2023",
      quantity: "2 50kg bags",
      action: actionFunc("/farmer-products", "/farmer-products", "670577192", "veruska@gmail.com"),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="deal-requests" style={{ textAlign: "left" }}>
      <Dashboard title="Deal Requests">
        <h1 className="text-xl">Deal Requests</h1>
        <div className="table-div">
          <Table columns={columns} dataSource={data} id="deal-requests-table" />
        </div>
      </Dashboard>
    </div>
  );
}

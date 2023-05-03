import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Space } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import Dashboard from "./layouts/dashboard";
import "./styles/products.css";
import image from "./styles/image.jpg";

export default function Products() {
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
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: "30%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      // width: "20%",
      ...getColumnSearchProps("category"),
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Price per Item",
      dataIndex: "price",
      key: "price",
      // width: "20%",
      ...getColumnSearchProps("price"),
    },
    {
      title: "Quantity",
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
  //     name: `Edward King ${i}`,
  //     age: 32,
  //     address: `London, Park Lane no. ${i}`,
  //   });
  // }
  const data = [
    {
      key: "1",
      image: <img src={image} height="50" width="50" />,
      name: "Irish Potato",
      category: "Cash Crop",
      price: 5500 + " frs per 20 liters",
      quantity: "9 300kg bags",
      action: (
        <div className="flex gap-3">
          <Link to="/farmer-products" className="flex items-center">
            <EyeOutlined className="text-green-600" />
          </Link>
          <Link to="/farmer-products" className="flex items-center">
            <EditOutlined className="text-blue-600" />
          </Link>
          <Link to="/farmer-products" className="flex items-center" danger>
            <DeleteOutlined className="text-red-500 font-extrabold" />
          </Link>
        </div>
      ),
    },
    {
      key: "2",
      image: <img src={image} height="50" width="50" />,
      name: 'Cocoyam',
      category: "Food Crop",
      price: 4500 + " frs per 20 liters",
      quantity: "10 300kg bags",
      action: (
        <div className="flex gap-3">
          <Link to="/farmer-products" className="flex items-center">
            <EyeOutlined className="text-green-600" />
          </Link>
          <Link to="/farmer-products" className="flex items-center">
            <EditOutlined className="text-blue-600" />
          </Link>
          <Link
            to="/farmer-products"
            className="flex items-center text-red-500"
            danger
          >
            <DeleteOutlined className="text-red-500 font-extrabold" />
          </Link>
        </div>
      ),
    },
    {
      key: "3",
      image: <img src={image} height="50" width="50" />,
      name: "Tomato",
      category: "Cash Crop",
      price: 7000 + " frs per 20 liters",
      quantity: "5 300kg bags",
      action: (
        <div className="flex gap-3">
          <Link to="/farmer-products" className="flex items-center">
            <EyeOutlined className="text-green-600" />
          </Link>
          <Link to="/farmer-products" className="flex items-center">
            <EditOutlined className="text-blue-600" />
          </Link>
          <Link to="/farmer-products" className="flex items-center" danger>
            <DeleteOutlined className="text-red-500 font-extrabold" />
          </Link>
        </div>
      ),
    },
    {
      key: "4",
      image: <img src={image} height="50" width="50" />,
      name: "Egusi",
      category: "Food Crop",
      price: 2300 + " frs per 20 liters",
      quantity: "7 300kg bags",
      action: (
        <div className="flex gap-3">
          <Link to="/farmer-products" className="flex items-center">
            <EyeOutlined className="text-green-600" />
          </Link>
          <Link to="/farmer-products" className="flex items-center">
            <EditOutlined className="text-blue-600" />
          </Link>
          <Link to="/farmer-products" className="flex items-center" danger>
            <DeleteOutlined className="text-red-500 font-extrabold" />
          </Link>
        </div>
      ),
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="products" style={{ textAlign: "left" }}>
      <Dashboard title="Products">
        <h1 className="text-xl">Products</h1>
        <Table columns={columns} dataSource={data} pagination={3} />
      </Dashboard>
    </div>
  );
}

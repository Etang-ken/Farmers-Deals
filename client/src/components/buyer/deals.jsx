import React, { useState, useRef, useEffect } from "react";
import { Table, Button, Input, Space } from "antd";
import {
  SearchOutlined,
  CheckCircleFilled,
  CloseCircleFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "../styles/buyer/deals.css";
import image from "../styles/buyer/image.jpg";
import { updateBreadcrumbTitleShow } from "../state_slices/breadcrumbTitleSlice";
import { useDispatch } from "react-redux";

export default function Deals() {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const dispatch = useDispatch()
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
      title: "Farmer",
      dataIndex: "farmer",
      key: "farmer",
      ...getColumnSearchProps("location"),
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: "Product Image",
      dataIndex: "product_image",
      key: "product_image",
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name",
      ...getColumnSearchProps("product_name"),
      sorter: (a, b) => a.product_name.length - b.product_name.length,
    },
    {
      title: "Product Category",
      dataIndex: "product_category",
      key: "product_category",
      ...getColumnSearchProps("product_category"),
      sorter: (a, b) => a.product_category.length - b.product_category.length,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      ...getColumnSearchProps("location"),
      sorter: (a, b) => a.location.length - b.location.length,
    },
    {
      title: "Price per Item",
      dataIndex: "price",
      key: "price",
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
      title: "Total Price",
      dataIndex: "total_price",
      key: "total_price",
    },
    {
      title: "Order Date",
      dataIndex: "order_date",
      key: "order_date",
    },
    {
      title: "Done / Cancelled Deal Date",
      dataIndex: "done_deal_date",
      key: "done_deal_date",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  const data = [
    {
      key: "1",
      farmer: "Etang Kencliff",
      product_image: <img src={image} alt="" height="50" width="50" />,
      product_name: "Irish Potato",
      product_category: "Cash Crop",
      location: "Buea, Cameroon",
      price: 5500 + " frs per 20 liters",
      quantity: "4 300kg bags",
      total_price: 5500 * 4 + " frs",
      order_date: "30-Jan-2023",
      done_deal_date: "03-Feb-2023",
      status: (
        <div className="flex gap-2 items-center">
          <CheckCircleFilled className="text-green-600" />
          Done
        </div>
      ),
    },
    {
      key: "2",
      farmer: "John Doe",
      product_image: <img src={image} alt="" height="50" width="50" />,
      product_name: "Cocoyam",
      product_category: "Food Crop",
      location: "Buea, Cameroon",
      price: 4500 + " frs per 20 liters",
      quantity: "2 300kg bags",
      total_price: 4500 * 2 + " frs",
      order_date: "28-Apr-2023",
      done_deal_date: "-",
      status: (
        <div className="flex gap-2 items-center">
          <ExclamationCircleFilled className="text-yellow-500" />
          Pending
        </div>
      ),
    },
    {
      key: "3",
      farmer: "Emilie Church",
      product_image: <img src={image} alt="" height="50" width="50" />,
      product_name: "Tomato",
      product_category: "Cash Crop",
      location: "Buea, Cameroon",
      price: 7000 + " frs per 20 liters",
      quantity: "1 300kg bags",
      total_price: 7000 * 1 + " frs",
      order_date: "30-April-2023",
      done_deal_date: "-",
      status: (
        <div className="flex gap-2 items-center">
          <ExclamationCircleFilled className="text-yellow-500" />
          Pending
        </div>
      ),
    },
    {
      key: "4",
      farmer: "Lila Cruz",
      product_image: <img src={image} alt="" height="50" width="50" />,
      product_name: "Egusi",
      product_category: "Food Crop",
      location: "Buea, Cameroon",
      price: 2300 + " frs per 20 liters",
      quantity: "3 300kg bags",
      total_price: 2300 * 3 + " frs",
      order_date: "22-Mar-2023",
      done_deal_date: "29-Mar-2023",
      status: (
        <div className="flex gap-2 items-center">
          <CloseCircleFilled className="text-red-600" />
          Cancelled
        </div>
      ),
    },
  ];
  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow("Deals"));
  }, [dispatch]);
  return (
    <div className="deals" style={{ textAlign: "left" }}>
      <div className="flex w-full">
        <h1 className="heading-1">Deals</h1>
      </div>
      <div className="table-div">
        <Table
          columns={columns}
          dataSource={data}
          pagination={3}
          id="deals-table"
        />
      </div>
    </div>
  );
}

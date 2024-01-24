import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Table, Button, Input, Space, Modal, message } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "../../styles/farmer/products.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateProducts } from "../../state_slices/farmerProductsSlice";

export default function DisplayProducts(props) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState();
  const products = useSelector((state) => state.farmerProducts.products);
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
      dataIndex: "pricePerUnit",
      key: "pricePerUnit",
      // width: "20%",
      ...getColumnSearchProps("pricePerUnit"),
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
  const data = [];

  const actionFunc = (viewUrl, editUrl, deleteFunc) => {
    return (
      <div className="flex gap-3">
        <Link to={viewUrl} className="flex items-center">
          <EyeOutlined className="text-green-600 font-extrabold text-lg" />
        </Link>
        <Link to={editUrl} className="flex items-center text-lg">
          <EditOutlined className="text-blue-600 font-extrabold" />
        </Link>
        <button
          type="button"
          onClick={deleteFunc}
          className="flex items-center"
        >
          <DeleteOutlined className="text-red-500 font-extrabold text-lg" />
        </button>
      </div>
    );
  };

  const showDeleteModal = (prod) => {
    setIsModalOpen(true);
    setProductToDelete(prod);
  };

  const confirmDeleteProduct = () => {
    const userToken = localStorage.getItem("farmerDealToken");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/farmer/product/delete`,
        {
          product_id: productToDelete._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        dispatch(updateProducts(res.data.products));
        setIsModalOpen(false);
        message.success("Product deleted successfully.");
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  products?.forEach((product) => {
    data.push({
      key: product?._id,
      image: <img src={product?.imageUrl} height="50" width="50" alt="" />,
      name: product?.name,
      category: product?.category,
      pricePerUnit:
        product?.pricePerUnit + " frs per " + product?.unitMeasurement,
      quantity: product.quantity,
      action: actionFunc(
        "/farmer/products/" + product?._id + "/show",
        "/farmer/products/" + product?._id + "/edit",
        () => {
          showDeleteModal(product);
        }
      ),
    });
  });
  // }, []);
  return (
    <div className="products" style={{ textAlign: "left" }}>
      <div className="table-div">
        <Modal
          title="Delete Product"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <p>
            Are you sure you want to delete this product (
            <b>{productToDelete?.name}</b>)?{" "}
          </p>
          <br />
          <button
            type="button"
            onClick={confirmDeleteProduct}
            className="danger-button w-fit ml-auto"
          >
            Yes, Delete
          </button>
        </Modal>
        <Table columns={columns} dataSource={data} pagination={true} />
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { Form, Input, Select, DatePicker } from "antd";
import { useDispatch } from "react-redux";
import { updateBreadcrumbTitleShow } from "../../state_slices/breadcrumbTitleSlice";

export default function EditOrder() {
  const dispatch = useDispatch();

  const initialVals = {
    name: "Cocoyam",
    category: "Feed Crop",
    unit: "per 15 kg",
    price_per_unit: "5000",
  };

  const onSubmit = (e) => {
    // e.preventDefault()
    console.log(e);
  };
  useEffect(() => {
    dispatch(updateBreadcrumbTitleShow("Orders / Edit"));
  }, [dispatch]);
  return (
    <div className="edit-order">
      <h1 className="heading-1">Edit Order</h1>

      <div className="w-full">
        <div className="section-box">
          <Form layout="vertical" onFinish={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  {
                    required: true,
                  },
                ]}
                className=""
                initialValue={initialVals.name}
              >
                <Input
                  placeholder="Enter Product Name ..."
                  className="h-10"
                  disabled
                />
              </Form.Item>
              <Form.Item
                label="Category"
                name="category"
                rules={[
                  {
                    required: true,
                  },
                ]}
                className=""
                initialValue={initialVals.category}
              >
                <Select
                  disabled
                  options={[
                    { value: "food_crop", label: "Food Crop" },
                    //   { value: "cash_crop", label: "Cash Crop" },
                    { value: "feed_crop", label: "Feed Crop" },
                    { value: "fibre_crop", label: "Fibre Crop" },
                    { value: "oil_crop", label: "Oil Crop" },
                    { value: "ornamental_crop", label: "Ornamental Crop" },
                    { value: "industrial_crop", label: "Industrial Crop" },
                  ]}
                  className="h-10"
                />
              </Form.Item>

              <Form.Item
                label="Unit of Measurement"
                name="unit"
                rules={[
                  {
                    required: true,
                  },
                ]}
                className=""
                initialValue={initialVals.unit}
              >
                <Input
                  disabled
                  placeholder="e.g per 20 litres / per 50kg bag"
                  className="h-10"
                />
              </Form.Item>

              <Form.Item
                label="Price per Unit Measurement"
                name="price_per_unit"
                rules={[
                  {
                    required: true,
                    // type: "number",
                  },
                ]}
                className=""
                initialValue={initialVals.price_per_unit}
              >
                <Input placeholder="e.g 25,000" className="h-10" disabled />
              </Form.Item>
            </div>

            <div className="pt-5">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-2 lg:gap-6">
                <Form.Item
                  label="Quantity"
                  name="quantity"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  className=""
                >
                  <Input
                    placeholder="e.g 5 - 50kg bags / 4 - 300 kg bags"
                    className="h-10"
                  />
                </Form.Item>
                <Form.Item
                  label="Latest Date Needed"
                  name="latest_date_needed"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  className=""
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </div>
            </div>
            <button type="submit">Submit</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

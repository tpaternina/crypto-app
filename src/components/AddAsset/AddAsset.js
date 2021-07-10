import React from "react";
import { Form, Input, InputNumber, DatePicker } from "antd";
import { StyledButton } from "./AddAsset.styles";

export default class AddAsset extends React.Component {
  state = {
    id: "",
    searchValue: "",
    purchasedAmount: 0,
    purchasedDate: "",
    coin: {},
  };

  handleSubmit = (values) => {
    console.log("Success:", values);
    this.setState({ ...values });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleChange = ({ target: { name, value } }) => {
    if (value && typeof value === "number" && value > 0) {
      this.setState({ [name]: value });
    }
  };

  render() {
    return (
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          aria-label="Select coin"
          name="id"
          rules={[
            {
              required: true,
              message: "This field is required.",
            },
          ]}
        >
          <Input placeholder="Select Coin..." />
        </Form.Item>

        <Form.Item
          aria-label="Purchased amount"
          name="purchasedAmount"
          rules={[
            {
              required: true,
              message: "This field is required.",
            },
          ]}
        >
          <InputNumber placeholder="Purchased Amount..." />
        </Form.Item>

        <Form.Item
          aria-label="Purchased date"
          name="purchasedDate"
          rules={[
            {
              required: true,
              message: "Please pick a date.",
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <StyledButton type="submit">Submit</StyledButton>
      </Form>
    );
  }
}

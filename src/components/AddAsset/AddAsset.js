import React from "react";
import axios from "axios";
import { DatePicker, Form, InputNumber, Select } from "antd";
import { keysToCamelCase } from "utils";
import { StyledButton } from "./AddAsset.styles";

export default class AddAsset extends React.Component {
  state = {
    id: "",
    purchasedAmount: 0,
    purchasedDate: "",
    coin: {},
    coinList: [],
    isListLoading: false,
    isCoinLoading: false,
  };

  getCoinInfo = async () => {
    try {
      this.setState({ isCoinLoading: true });
      const { id } = this.state;
      const { currency } = this.props;
      let { data: coin } = await axios(
        `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${id}`
      );
      coin = keysToCamelCase(coin);
      const {
        marketData: {
          currentPrice,
          priceChange24H,
          priceChangePercentage24H,
          marketCap,
          totalVolume,
          circlatingSupply,
          maxSupply,
        },
      } = coin;
      this.setState({
        coin: {
          currentPrice: currentPrice[currency.toLowerCase()],
          priceChange24H,
          priceChangePercentage24H,
          marketCap: marketCap[currency.toLowerCase()],
          totalVolume: totalVolume[currency.toLowerCase()],
          circlatingSupply,
          maxSupply,
        },
      });
    } catch (err) {
      console.log(err);
      this.setState({ isCoinLoading: false });
    }
  };

  getCoinList = async (val) => {
    try {
      this.setState({ isListLoading: true });
      const { data: coinList } = await axios(
        `${process.env.REACT_APP_SEARCH_LIST}/${val}`
      );
      this.setState({ coinList, isListLoading: false });
    } catch (err) {
      console.log(err);
      this.setState({ isListLoading: false });
    }
  };

  handleSearch = (val) => {
    val !== "" ? this.getCoinList(val) : this.setState({ coinList: [] });
  };

  handleSubmit = (values) => {
    this.setState({ ...values });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.getCoinInfo();
    }
    if (
      prevState.coin &&
      JSON.stringify(prevState.coin) !== JSON.stringify(this.state.coin)
    ) {
      console.log(this.state.coin);
    }
  }
  render() {
    const { coinList } = this.state;
    const { Item } = Form;
    const { Option } = Select;
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
        onFinish={this.handleSubmit}
      >
        <Item
          aria-label="Select coin"
          name="id"
          rules={[
            {
              required: true,
              message: "Please select a cryptocoin from the list.",
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Search coin..."
            optionFilterProp="children"
            onSearch={this.handleSearch}
          >
            {coinList.map((coin) => (
              <Option key={coin.id} value={coin.id}>
                {coin.name}, ({coin.symbol.toUpperCase()})
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          aria-label="Purchased amount"
          name="purchasedAmount"
          rules={[
            {
              required: true,
              message: "This field is required.",
            },
          ]}
        >
          <InputNumber min={0} placeholder="Purchased Amount..." />
        </Item>
        <Item
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
        </Item>
        <StyledButton type="submit">Submit</StyledButton>
      </Form>
    );
  }
}

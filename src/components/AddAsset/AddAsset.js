import React from "react";
import axios from "axios";
import moment from "moment";
import { Form, Select } from "antd";
import { LoadingList } from "components";
import { keysToCamelCase } from "utils";
import {
  Background,
  CoinContainer,
  Container,
  LogoContainer,
  PlaceholderText,
  StyledButton,
  StyledCoinName,
  StyledCol,
  StyledClose,
  StyledDatePicker,
  StyledFileImageIcon,
  StyledInputNumber,
  StyledItem,
  StyledRow,
  StyledSelect,
  StyledTitle,
} from "./AddAsset.styles";

export default class AddAsset extends React.Component {
  state = {
    id: "",
    coinLogo: "",
    coinName: "",
    coinSymbol: "",
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
        name,
        symbol,
        image: { large },
        marketData: {
          currentPrice,
          priceChange24H,
          priceChangePercentage24H,
          marketCap,
          totalVolume,
          circulatingSupply,
          maxSupply,
        },
      } = coin;
      this.setState({
        coin: {
          id,
          name,
          symbol,
          logoUrl: large,
          currentPrice: currentPrice[currency.toLowerCase()],
          priceChange24H,
          priceChangePercentage24H,
          marketCap: marketCap[currency.toLowerCase()],
          totalVolume: totalVolume[currency.toLowerCase()],
          circulatingSupply,
          maxSupply,
        },
      });
      this.setState({ isCoinLoading: false });
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

  handleSelect = (value) => {
    const {
      id,
      large: coinLogo,
      name: coinName,
      symbol: coinSymbol,
    } = this.state.coinList.filter((coin) => coin.id === value)[0];
    this.setState({ id, coinLogo, coinName, coinSymbol, coinList: [] });
  };

  handleSubmit = (values) => {
    const { coin } = this.state;
    this.props.handleSubmit({ ...values, coin,  });
    this.props.toggleActive();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.id !== this.state.id) {
      this.getCoinInfo();
    }
    if (
      prevState.coin &&
      JSON.stringify(prevState.coin) !== JSON.stringify(this.state.coin)
    ) {
      
    }
  }

  render() {
    const {
      coinList,
      coinLogo,
      coinName,
      coinSymbol,
      isListLoading,
      isCoinLoading,
    } = this.state;
    const { Option } = Select;
    return (
      <Background>
        <Container width="57%">
          <StyledRow>
            <StyledCol span={24}>
              <StyledTitle>Select Coin</StyledTitle>
              <StyledClose
                onClick={() => {
                  this.props.toggleActive();
                }}
              />
            </StyledCol>
          </StyledRow>
          <StyledRow>
            <StyledCol span={24}>
              <Form
                initialValues={{
                  remember: true,
                }}
                onFinish={this.handleSubmit}
              >
                <StyledRow justify="space-between">
                  <StyledCol span={7}>
                    {coinLogo ? (
                      <CoinContainer>
                        <LogoContainer src={coinLogo} />
                        <StyledCoinName>
                          {coinName} ({coinSymbol})
                        </StyledCoinName>
                      </CoinContainer>
                    ) : isCoinLoading ? (
                      <LoadingList />
                    ) : (
                      <CoinContainer>
                        <StyledFileImageIcon />
                        <PlaceholderText>Select Coin</PlaceholderText>
                      </CoinContainer>
                    )}
                  </StyledCol>

                  <StyledCol span={15}>
                    <StyledItem
                      aria-label="Select coin"
                      name="id"
                      rules={[
                        {
                          required: true,
                          message: "Please select a cryptocoin from the list.",
                        },
                      ]}
                    >
                      <StyledSelect
                        showSearch
                        placeholder="Search coin..."
                        optionFilterProp="children"
                        onSearch={this.handleSearch}
                        onChange={this.handleSelect}
                        notFoundContent={isListLoading ? <LoadingList /> : null}
                        aria-expanded="true"
                      >
                        {coinList.map((coin) => (
                          <Option
                            className="select-option"
                            key={coin.id}
                            value={coin.id}
                          >
                            {coin.name} ({coin.symbol.toUpperCase()})
                          </Option>
                        ))}
                      </StyledSelect>
                    </StyledItem>
                    <StyledItem
                      aria-label="Purchased amount"
                      name="purchasedAmount"
                      rules={[
                        {
                          required: true,
                          message: "This field is required.",
                        },
                      ]}
                    >
                      <StyledInputNumber
                        min={0}
                        placeholder="Purchased Amount..."
                      />
                    </StyledItem>
                    <StyledItem
                      aria-label="Purchased date"
                      name="purchasedDate"
                      rules={[
                        {
                          required: true,
                          message: "Please pick a date.",
                        },
                      ]}
                    >
                      <StyledDatePicker
                        allowClear={false}
                        disabledDate={(date) => date && date > moment()}
                      />
                    </StyledItem>
                  </StyledCol>
                </StyledRow>
                <StyledRow>
                  <StyledCol span={24}>
                    <StyledButton onClick={() => this.props.toggleActive()}>
                      Close
                    </StyledButton>
                    <StyledButton type="submit" primary>
                      Save and Continue
                    </StyledButton>
                  </StyledCol>
                </StyledRow>
              </Form>
            </StyledCol>
          </StyledRow>
        </Container>
      </Background>
    );
  }
}

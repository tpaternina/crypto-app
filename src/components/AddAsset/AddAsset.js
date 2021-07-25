import React from "react";
import axios from "axios";
import moment from "moment";
import { isEmpty } from "lodash";
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

const { Option } = Select;

export default class AddAsset extends React.Component {
  state = {
    coinList: [],
    isListLoading: false,
    isCoinLoading: false,
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
    const { id, large, name, symbol } = this.state.coinList.find(
      (coin) => coin.id === value
    );
    const {
      coin: { key },
    } = this.props;
    this.props.handleSelect({ key, id, large, name, symbol });
    this.setState({ coinList: [] });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.coin.id && prevProps.coin.id !== this.props.coin.id) {
      this.props.getCoinInfo();
    }
  }

  render() {
    const { coinList, isListLoading, isCoinLoading } = this.state;
    const {
      coin: { id, large, name, symbol, purchasedAmount, purchasedDate },
      destroyAddAsset,
      openAddAsset,
      handleClose,
      handleSubmit,
    } = this.props;

    return (
      <Background destroyAddAsset={destroyAddAsset} openAddAsset={openAddAsset}>
        <Container width="57%">
          <StyledRow>
            <StyledCol span={24}>
              <StyledTitle>Select Coin</StyledTitle>
              <StyledClose onClick={handleClose} />
            </StyledCol>
          </StyledRow>
          <StyledRow>
            <StyledCol span={24}>
              <Form
                initialValues={{
                  remember: false,
                }}
                onFinish={handleSubmit}
              >
                <StyledRow justify="space-between">
                  <StyledCol span={7}>
                    {large ? (
                      <CoinContainer>
                        <LogoContainer src={large} />
                        <StyledCoinName>
                          {name} ({symbol.toUpperCase()})
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
                      initialValue={
                        id ? `${name} (${symbol.toUpperCase()})` : undefined
                      }
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
                            key={`${coin.id}-${Math.random()}`}
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
                      initialValue={id ? purchasedAmount : undefined}
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
                      initialValue={
                        purchasedDate
                          ? moment(purchasedDate, "YYYY-MM-DD")
                          : undefined
                      }
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
                    <StyledButton onClick={handleClose}>Close</StyledButton>
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

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
    coin: this.props.coin,
    coinList: [],
    isListLoading: false,
    isCoinLoading: false,
  };

  modal = React.createRef();
  modalBackground = React.createRef();

  getCoinInfo = async () => {
    if (this.state.coin.id) {
      try {
        this.setState({ isCoinLoading: true });
        const { id } = this.state.coin;
        let { data: coin } = await axios(
          `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${id}`
        );
        coin = keysToCamelCase(coin);

        this.setState({ coin: { ...this.state.coin, ...coin } });
        this.setState({ isCoinLoading: false });
      } catch (err) {
        console.log(err);
        this.setState({ isCoinLoading: false });
      }
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

  handleClickOutside = ({ target }) => {
    if (this.modal.current && !this.modal.current.contains(target)) {
      this.props.hideAddAsset();
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
    } = this.state;
    this.setState({ coin: { key, id, large, name, symbol }, coinList: [] });
  };

  handleSubmit = (values) => {
    const { coin } = this.state;
    const newCoin = { ...coin };
    // Add element unique identifier if new asset
    // Use current identifier if editing asset
    newCoin.key = coin.key || `${Math.random()}-${Math.random()}`;

    newCoin.purchasedDate = values.purchasedDate;
    newCoin.purchasedAmount = values.purchasedAmount;

    this.setState({ coin: {} });

    // Handle state lift according to "add" or "edit" mode
    !isEmpty(this.props.coin)
      ? this.props.handleEdit(newCoin)
      : this.props.handleSubmit(newCoin);
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.coin.id !== this.state.coin.id) {
      this.getCoinInfo();
    }
    if (JSON.stringify(prevProps.coin) !== JSON.stringify(this.props.coin)) {
      this.setState({ coin: this.props.coin });
    }
  }

  render() {
    const {
      coin: { id, large, name, symbol, purchasedAmount, purchasedDate },
      coinList,
      isListLoading,
      isCoinLoading,
    } = this.state;
    const { destroyAddAsset, openAddAsset, handleClose } = this.props;
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
                  remember: true,
                }}
                onFinish={this.handleSubmit}
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
                      initialValue={id}
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
                      initialValue={purchasedAmount}
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
                        purchasedDate ? moment(purchasedDate, "YYYY-MM-DD") : undefined
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

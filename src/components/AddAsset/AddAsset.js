import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { Form, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LoadingList } from "components";
import {
  getCoinList,
  handleClose,
  handleSubmit,
} from "store/portfolio/actions";
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

class AddAsset extends React.Component {
  form = React.createRef();

  getCoinList = debounce(async (val) => {
    this.props.getCoinList(val);
  }, 1000);

  handleSearch = (val) => {
    val !== "" ? this.getCoinList(val) : this.setState({ coinList: [] }); 
  };

  handleSelect = (value) => {
    const { id, large, name, symbol } = this.props.coinList.find(
      (coin) => coin.id === value
    );
    const {
      coin: { key, purchasedDate, purchasedAmount },
    } = this.props;
    this.props.handleSelect({
      key,
      id,
      large,
      name,
      symbol,
      purchasedDate,
      purchasedAmount,
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.coin.id !== undefined &&
      prevProps.coin.id !== this.props.coin.id
    ) {
      const {
        coin: { name, symbol, purchasedAmount, purchasedDate },
      } = this.props;

      this.form.current.setFieldsValue({
        id: `${name} (${symbol.toUpperCase()})`,
        purchasedAmount,
        purchasedDate: purchasedDate
          ? moment(purchasedDate, "YYYY-MM-DD")
          : undefined,
      });
      this.props.getCoinInfo();
    }
    if (
      prevProps.coin.id !== this.props.coin.id &&
      this.props.coin.id === undefined
    ) {
      this.form.current.resetFields();
    }
  }

  render() {
    const {
      coin: { key, large, name, symbol, purchasedAmount, purchasedDate },
      coinList,
      isPriceLoading,
      isSearchLoading,
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
                ref={this.form}
                initialValues={{
                  remember: true,
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
                        key ? `${name} (${symbol.toUpperCase()})` : undefined
                      }
                    >
                      <StyledSelect
                        showSearch
                        placeholder="Search coin..."
                        optionFilterProp="children"
                        onSearch={this.handleSearch}
                        onChange={this.handleSelect}
                        notFoundContent={
                          isSearchLoading ? <LoadingList /> : null
                        }
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
                      initialValue={key ? purchasedAmount : undefined}
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
                        key ? moment(purchasedDate, "YYYY-MM-DD") : ""
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
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                      }}
                    >
                      Close
                    </StyledButton>
                    <StyledButton type="submit" primary>
                      {isPriceLoading ? (
                        <LoadingOutlined />
                      ) : (
                        "Save and Continue"
                      )}
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

const mapStateToProps = (state) => ({
  coin: state.portfolio.editCoin,
  destroyAddAsset: state.portfolio.destroyAddAsset,
  openAddAsset: state.portfolio.openAddAsset,
  coinList: state.portfolio.coinSearchList,
  isSearchLoading: state.portfolio.isSearchLoading,
  isPriceLoading: state.portfolio.isPriceLoading,
});

const mapDispatchToProps = {
  getCoinList,
  handleClose,
  handleSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAsset);

import React from "react";
import moment from "moment";
import { connect } from "react-redux";
import { debounce } from "lodash";
import { Form, Select } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { LoadingList } from "components";
import {
  AssetCoinContainer,
  AssetCoinName,
  AssetSectionTitle,
  Background,
  LogoContainer,
  ModalContainer,
  ModalSelect,
  ModalRow,
  PortfolioCol,  
  PlaceholderText,
  StyledButton,
  StyledClose,
  StyledDatePicker,
  StyledInputNumber,
  StyledItem,
  StyledFileImageIcon,
} from "styles";
import {
  getCoinList,
  handleClose,
  handleSubmit,
} from "store/portfolio/actions";

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
      <Background destroy={destroyAddAsset} open={openAddAsset}>
        <ModalContainer width="57%">
          <ModalRow>
            <PortfolioCol span={24}>
              <AssetSectionTitle>Select Coin</AssetSectionTitle>
              <StyledClose onClick={handleClose} />
            </PortfolioCol>
          </ModalRow>
          <ModalRow>
            <PortfolioCol span={24}>
              <Form
                ref={this.form}
                initialValues={{
                  remember: true,
                }}
                onFinish={handleSubmit}
              >
                <ModalRow justify="space-between" gutter={16} form="true">
                  <PortfolioCol span={7} xs={12} sm={8}>
                    {large ? (
                      <AssetCoinContainer modal>
                        <LogoContainer
                          width="75%"
                          margin="0 0 1rem 0"
                          src={large}
                          modal
                        />
                        <AssetCoinName>
                          {name} ({symbol.toUpperCase()})
                        </AssetCoinName>
                      </AssetCoinContainer>
                    ) : (
                      <AssetCoinContainer modal>
                        <StyledFileImageIcon />
                        <PlaceholderText size="1rem">Select Coin</PlaceholderText>
                      </AssetCoinContainer>
                    )}
                  </PortfolioCol>

                  <PortfolioCol span={15} xs={24} sm={16} direction="column">
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
                      <ModalSelect
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
                      </ModalSelect>
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
                  </PortfolioCol>
                </ModalRow>
                <ModalRow justify="center" gutter={16}>
                  <PortfolioCol xs={24} sm={12} justify="flex-end">
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        handleClose();
                      }}
                      modal
                    >
                      Close
                    </StyledButton>
                  </PortfolioCol>
                  <PortfolioCol xs={24} sm={12} justify="flex-start">
                    <StyledButton type="submit" primary modal>
                      {isPriceLoading ? (
                        <LoadingOutlined />
                      ) : (
                        "Save"
                      )}
                    </StyledButton>
                  </PortfolioCol>
                </ModalRow>
              </Form>
            </PortfolioCol>
          </ModalRow>
        </ModalContainer>
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

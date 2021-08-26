import React, { useEffect } from "react";
import queryString from "query-string";
import moment from "moment";
import { connect } from "react-redux";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import { AddAsset, Currency, PortfolioAsset } from "components";
import {
  EmptyListIcon,
  PlaceholderText,
  PortfolioCol,
  PortfolioRow,
  StyledAnchor,
  StyledButton,
  StyledSelect,
  StyledTitle,
  NarrowDiv,
  WideDiv,
  TopDiv,
} from "styles";
import { camelCaseToCapitalize } from "utils";
import {
  getCoinInfo,
  handleClose,
  handleDelete,
  handleSelect,
  handleSubmit,
  getPriceAtDate,
  setOrder,
  showAddAsset,
  showEditAsset,
} from "store/portfolio/actions";
import { fetchAllCoins } from "store/home/actions";
import { setCurrency } from "store/app/actions";

const { Option } = StyledSelect;

const Portfolio = (props) => {
  const onChange = (value) => {
    props.setOrder(value);
  };

  const sortAssets = (item1, item2) => {
    const { sortBy, currency } = props;
    switch (sortBy) {
      case "marketCapRank":
        return item1[sortBy] - item2[sortBy];
      case "purchasedDate":
        return moment(item2[sortBy]) - moment(item1[sortBy]);
      case "purchasedAmount":
        return item2[sortBy] - item1[sortBy];
      case "currentPrice":
      case "priceChange24HInCurrency":
        return (
          item2.marketData[sortBy][currency.toLowerCase()] -
          item1.marketData[sortBy][currency.toLowerCase()]
        );
      default:
        return item1.marketCapRank - item2.marketCapRank;
    }
  };

  const {
    portfolio: { assetList, openAddAsset, destroyAddAsset, editCoin, options },
    currency,
    sortBy,
    getCoinInfo,
    handleClose,
    handleDelete,
    handleSelect,
    handleSubmit,
    showAddAsset,
    showEditAsset,
  } = props;

  useEffect(() => {
    if (props.location.search) {
      const { currency, sortBy } = queryString.parse(props.location.search);
      props.setCurrency(currency);
      props.setOrder(sortBy);
    } else {
      const query = queryString.stringify({
        currency,
        sortBy,
      });
      props.history.push(`?${query}`);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const query = queryString.stringify({
      currency,
      sortBy,
    });
    props.history.push(`?${query}`);
    // eslint-disable-next-line
  }, [currency, sortBy]);

  return (
    <>
      <PortfolioRow justify="center" top="true">
        <PortfolioCol xs={24} sm={12} md={8} lg={6} xl={6} xxl={5}>
          <StyledButton onClick={showAddAsset} primary>Add Asset</StyledButton>
        </PortfolioCol>
      </PortfolioRow>
      <NarrowDiv>
        <TopDiv>
          <StyledTitle>Portfolio</StyledTitle>
          <StyledSelect
            aria-label="Sort by"
            value={sortBy}
            onChange={onChange}
            suffixIcon={<DownCircleOutlined />}
          >
            {options.map((el) => (
              <Option value={el} key={el}>
                {camelCaseToCapitalize(el)}
              </Option>
            ))}
          </StyledSelect>
          <Currency />
        </TopDiv>
      </NarrowDiv>
      <WideDiv>
        <PortfolioRow justify="center" gutter={16}>
          <PortfolioCol xs={8} sm={8} md={6} lg={6} xl={4} xxl={4} justify="flex-start" align="center">
            <StyledTitle>Your statistics</StyledTitle>
          </PortfolioCol>
          <PortfolioCol xs={9} sm={9} md={13} lg={13} xl={15} xxl={15} justify="flex-end">
            Sort by:
          </PortfolioCol>
          <PortfolioCol xs={7} sm={7} md={5} lg={5} xl={5} xxl={5}>
            <StyledSelect
              value={sortBy}
              onChange={onChange}
              suffixIcon={<DownCircleOutlined />}
            >
              {options.map((el) => (
                <Option value={el} key={el}>
                  {camelCaseToCapitalize(el)}
                </Option>
              ))}
            </StyledSelect>
          </PortfolioCol>
        </PortfolioRow>
      </WideDiv>

      {!assetList.length && (
        <PortfolioRow justify="center">
          <PortfolioCol>
            <EmptyListIcon />
            <PlaceholderText size="3rem">You have no assets yet.</PlaceholderText>
          </PortfolioCol>
        </PortfolioRow>
      )}
      {!!assetList.length &&
        assetList
          .sort(sortAssets)
          .map((coin) => (
            <PortfolioAsset
              key={coin.key}
              coin={coin}
              currency={currency}
              showEditAsset={showEditAsset}
              handleDelete={handleDelete}
            />
          ))}
      <PortfolioRow justify="end" gutter={16}>
        <PortfolioCol xs={8} sm={8} md={10} lg={15} xl={17} xxl={17} justify="flex-start">
          <StyledAnchor href="#">
            Back to top <UpCircleOutlined />
          </StyledAnchor>
        </PortfolioCol>
        <PortfolioCol xs={6} sm={6} md={7} lg={3} xl={2} xxl={2} justify="flex-end">
            Sort by:
          </PortfolioCol>
          <PortfolioCol xs={10} sm={10} md={7} lg={6} xl={5} xxl={5} justify="center">
            <StyledSelect
              value={sortBy}
              onChange={onChange}
              suffixIcon={<DownCircleOutlined />}
            >
              {options.map((el) => (
                <Option value={el} key={el}>
                  {camelCaseToCapitalize(el)}
                </Option>
              ))}
            </StyledSelect>
          </PortfolioCol>
      </PortfolioRow>
      <AddAsset
        coin={editCoin}
        destroyAddAsset={destroyAddAsset}
        openAddAsset={openAddAsset}
        getCoinInfo={getCoinInfo}
        handleClose={(e) => {
          e.preventDefault();
          handleClose();
        }}
        handleSelect={handleSelect}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  portfolio: state.portfolio,
  currency: state.app.currency,
  sortBy: state.portfolio.sortBy,
});

const mapDispatchToProps = {
  fetchAllCoins,
  getCoinInfo,
  getPriceAtDate,
  handleClose,
  handleDelete,
  handleSelect,
  handleSubmit,
  setCurrency,
  setOrder,
  showAddAsset,
  showEditAsset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

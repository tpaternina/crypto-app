import React, { useEffect } from "react";
import queryString from "query-string";
import moment from "moment";
import { connect } from "react-redux";
import { UpCircleOutlined, DownCircleOutlined } from "@ant-design/icons";
import { AddAsset, PortfolioAsset } from "components";
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
import { setCurrency } from "store/app/actions";
import {
  EmptyListIcon,
  PlaceholderText,
  StyledAnchor,
  StyledButton,
  StyledCol,
  StyledRow,
  StyledSelect,
  StyledTitle,
} from "./Portfolio.styles";

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
        return moment(item2[sortBy]) - moment(item1[sortBy]) 
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
      const { currency, sortBy } = queryString.parse(
        props.location.search
      );
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
    }, [currency, sortBy])
  
  return (
    <>
      <StyledRow justify="center">
        <StyledCol span={6}>
          <StyledButton onClick={showAddAsset}>Add Asset</StyledButton>
        </StyledCol>
      </StyledRow>
      <StyledRow justify="center" gutter={16}>
        <StyledCol span={4} justify="flex-start">
          <StyledTitle>Your statistics</StyledTitle>
        </StyledCol>
        <StyledCol span={15} justify="flex-end">
          Sort by:{" "}
        </StyledCol>
        <StyledCol span={5}>
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
        </StyledCol>
      </StyledRow>
      {!assetList.length && (
        <StyledRow justify="center">
          <StyledCol>
            <EmptyListIcon />
            <PlaceholderText>You have no assets yet.</PlaceholderText>
          </StyledCol>
        </StyledRow>
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
      <StyledRow justify="end" gutter={16}>
        <StyledCol span={17} justify="flex-end">
          <StyledAnchor href="#">Back to top <UpCircleOutlined /></StyledAnchor>
        </StyledCol>
        <StyledCol span={2} justify="flex-end">
          Sort by:{" "}
        </StyledCol>
        <StyledCol span={5}>
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
        </StyledCol>
      </StyledRow>
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

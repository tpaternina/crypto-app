import React from "react";
import queryString from "query-string";
import { connect } from "react-redux";
import { Row } from "antd";
import { AddAsset, PortfolioAsset } from "components";
import {
  getCoinInfo,
  handleClose,
  handleDelete,
  handleSelect,
  handleSubmit,
  getPriceAtDate,
  showAddAsset,
  showEditAsset,
} from "store/portfolio/actions";
import { setCurrency } from "store/app/actions";
import {
  EmptyListIcon,
  PlaceholderText,
  StyledButton,
  StyledCol,
  StyledTitle,
} from "./Portfolio.styles";

class Portfolio extends React.Component {
  componentDidMount() {
    if (this.props.location.search) {
      const { currency } = queryString.parse(this.props.location.search);
      this.props.setCurrency(currency);
    } else {
      const { currency } = this.props;
      const query = queryString.stringify({
        currency,
      });
      this.props.history.push(`?${query}`);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currency !== this.props.currency) {
      console.log(this.props.location)
      const { currency } = this.props;
      const query = queryString.stringify({
        currency
      });
      console.log(query)
      this.props.history.push(`?${query}`);
    }
  }

  render() {
    const {
      portfolio: { assetList, openAddAsset, destroyAddAsset, editCoin },
      currency,
      getCoinInfo,
      handleClose,
      handleDelete,
      handleSelect,
      handleSubmit,
      showAddAsset,
      showEditAsset,
    } = this.props;
    return (
      <>
        <Row justify="center">
          <StyledCol span={6}>
            <StyledButton onClick={showAddAsset}>Add Asset</StyledButton>
          </StyledCol>
        </Row>
        <StyledTitle>Your statistics</StyledTitle>
        {!assetList.length && (
          <Row justify="center">
            <StyledCol>
              <EmptyListIcon />
              <PlaceholderText>You have no assets yet.</PlaceholderText>
            </StyledCol>
          </Row>
        )}
        {!!assetList.length &&
          assetList
            .sort((coin1, coin2) => coin1.marketCapRank - coin2.marketCapRank)
            .map((coin) => (
              <PortfolioAsset
                key={coin.key}
                coin={coin}
                currency={currency}
                showEditAsset={showEditAsset}
                handleDelete={handleDelete}
              />
            ))}
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
  }
}

const mapStateToProps = (state) => ({
  portfolio: state.portfolio,
  currency: state.app.currency,
});

const mapDispatchToProps = {
  getCoinInfo,
  getPriceAtDate,
  handleClose,
  handleDelete,
  handleSelect,
  handleSubmit,
  setCurrency,
  showAddAsset,
  showEditAsset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);

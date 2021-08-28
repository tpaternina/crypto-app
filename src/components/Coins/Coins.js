import React from "react";
import { connect } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { CoinInfo } from "components";
import { LoadingMoreCoins, CoinWideDiv } from "styles";
import { fetchAllCoins, setPage } from "store/home/actions";

const sortCoins = (item1, item2, sortBy, descending) => {
  if (item1[sortBy] < item2[sortBy]) return descending ? 1 : -1;
  if (item1[sortBy] > item2[sortBy]) return descending ? -1 : 1;
  return 0;
};

const Coins = (props) => {
  const {
    currency,
    coinList,
    sortBy,
    descending,
    queryConfig: { perPage, page },
    fetchAllCoins,
    setPage,
  } = props;
  return (
    <InfiniteScroll
      dataLength={coinList.length} //This is important field to render the next data
      next={() => {
        fetchAllCoins(page + 1);
        setPage(page + 1);
      }}
      hasMore={true}
      loader={
        <CoinWideDiv>
          <LoadingMoreCoins />
        </CoinWideDiv>
      }
      scrollThreshold={0.95}
      initialScrollY={page * perPage}
      endMessage={
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
    >
      {[...coinList]
        .sort((item1, item2) => sortCoins(item1, item2, sortBy, descending))
        .map((coin) => (
          <CoinInfo key={coin.id} coin={coin} currency={currency} />
        ))}
    </InfiniteScroll>
  );
};

const mapStateToProps = (state) => ({
  currency: state.app.currency,
  sortBy: state.home.pageConfig.sortBy,
  descending: state.home.pageConfig.descending,
  queryConfig: state.home.queryConfig,
});

const mapDispatchToProps = {
  fetchAllCoins,
  setPage,
};

export default connect(mapStateToProps, mapDispatchToProps)(Coins);

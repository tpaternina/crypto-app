import React from "react";
import axios from "axios";
import { debounce } from "lodash";
import { DownCircleOutlined } from "@ant-design/icons";
import { ErrorList, LoadingList } from "components";
import { StyledSearch } from "styles";

const { Option } = StyledSearch;

export default class SearchCoin extends React.Component {
  state = {
    data: [],
    isLoading: false,
    hasError: false,
  };

  handleSelect = (id, Option) => {
    this.setState({ data: [] });
    window.location.pathname = `/coins/${id}`;
  };

  getCoinList = debounce(async (searchValue) => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(
        `${process.env.REACT_APP_SEARCH_LIST}/coins/?name_filter=${searchValue}`
      );
      this.setState({ data, isLoading: false, hasError: false });
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false, hasError: true });
    }
  }, 1000);

  handleSearch = (val) => {
    val !== "" ? this.getCoinList(val) : this.setState({ data: [] });
  };

  onBlur = () => {
    this.setState({ data: [] });
  };

  render() {
    const { data, isLoading, hasError } = this.state;

    return (
      <>
        <StyledSearch
          showSearch
          placeholder="Search coin..."
          optionFilterProp="children"
          onSearch={this.handleSearch}
          onChange={this.handleSelect}
          onBlur={this.onBlur}
          suffixIcon={<DownCircleOutlined />}
          notFoundContent={(isLoading && <LoadingList />) || (hasError && <ErrorList />)}
          aria-expanded="true"
        >
          {data.map((coin) => (
            <Option key={`${coin.id}-${Math.random()}`} value={coin.id}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </Option>
          ))}
        </StyledSearch>
      </>
    );
  }
}

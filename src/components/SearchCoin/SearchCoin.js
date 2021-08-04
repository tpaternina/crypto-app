import React from "react";
import axios from "axios";
import { debounce } from "lodash";
import { Select } from "antd";
import { LoadingList } from "components";
import {
  StyledSelect,
} from "./SearchCoin.styles";

const { Option } = Select;

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
        `${process.env.REACT_APP_SEARCH_LIST}/${searchValue}`
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
    console.log("blur")
    this.setState({data: []})
  }

  render() {
    const { data, isLoading } = this.state;

    return (
      <div ref={this.searchWrapper}>
        <StyledSelect
          showSearch
          placeholder="Search coin..."
          optionFilterProp="children"
          onSearch={this.handleSearch}
          onChange={this.handleSelect}
          onBlur={this.onBlur}
          notFoundContent={isLoading && <LoadingList />}
          aria-expanded="true"
        >
          {data.map((coin) => (
            <Option key={`${coin.id}-${Math.random()}`} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
            </Option>
          ))}
        </StyledSelect>
        {/*<StyledInput
          type="text"
          placeholder="Search coins..."
          list="coinList"
          value={searchValue}
          ref={this.searchInput}
          onChange={this.handleChange}
        />
        <StyledMenu onClick={this.handleSelect}>
          {data.map((coin) => (
            <Link key={coin.id} to={`/coins/${coin.id}`}>
              <StyledItem>{coin.name}</StyledItem>
            </Link>
          ))}
        </StyledMenu>*/}
      </div>
    );
  }
}

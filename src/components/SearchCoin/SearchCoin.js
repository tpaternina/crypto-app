import React from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import {
  StyledInput,
  StyledLink,
  StyledItem,
  StyledMenu,
} from "./SearchCoin.styles";

export default class SearchCoin extends React.Component {
  state = {
    data: [],
    searchValue: "",
    isLoading: true,
    hasError: false,
  };

  searchWrapper = React.createRef();
  searchInput = React.createRef();

  handleChange = ({ target: { value } }) => {
    this.setState({ searchValue: value });
  };

  handleClickOutside = ({ target }) => {
    if (
      this.searchWrapper !== null &&
      !this.searchWrapper.current.contains(target)
    ) {
      console.log("outside");
      this.setState({ searchValue: "", data: [] });
    }
  };

  handleSelect = ({ key }) => {
    this.setState({ searchValue: "", data: [] });
  };

  getCoinList = async () => {
    try {
      this.setState({ isLoading: true });
      const { searchValue } = this.state;
      const { data } = await axios(
        `${process.env.REACT_APP_SEARCH_LIST}/${searchValue}`
      );
      this.setState({ data, isLoading: false, hasError: false });
    } catch (err) {
      console.log(err);
      this.setState({ isLoading: false, hasError: true });
    }
  };

  componentDidMount() {
    // Add event to listen for click outside of component
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    // Remove click outside event
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchValue !== this.state.searchValue &&
      this.state.searchValue !== ""
    ) {
      this.getCoinList();
    }
    if (
      prevState.searchValue !== this.state.searchValue &&
      this.state.searchValue === ""
    ) {
      console.log("emtpy")
      this.setState({ data: [] });
    }
  }

  render() {
    const { isLoading, hasError, data, searchValue } = this.state;
    const hasResponse = !isEmpty(data) && !isLoading && !hasError;
    return (
      <div ref={this.searchWrapper}>
        <StyledInput
          type="text"
          placeholder="Search coins..."
          list="coinList"
          value={searchValue}
          ref={this.searchInput}
          onChange={this.handleChange}
        />
        <StyledMenu onClick={this.handleSelect}>
          {data.map((coin) => (
            <StyledItem key={coin.id}>
              <StyledLink to={`/coins/${coin.id}`}>{coin.name}</StyledLink>
            </StyledItem>
          ))}
        </StyledMenu>
      </div>
    );
  }
}

import React from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import {
  StyledArrow,
  StyledCurrency,
  StyledDollar,
  StyledItem,
  StyledMenu,
  StyledInput,
} from "./Currency.styles";

export default class Currency extends React.Component {
  state = {
    currencyList: [],
    isActive: false,
    hasError: false,
    searchTerm: "",
  };

  currencyInput = React.createRef();
  currencyWrapper = React.createRef();

  getCurrencies = async () => {
    try {
      this.setState({ isLoading: true });
      const { data } = await axios(process.env.REACT_APP_VS_COINS_ENDPOINT);
      this.setState({ currencyList: data, hasError: false });
    } catch (err) {
      this.setState({ hasError: true });
    }
  };

  toggleActive = () => {
    this.setState({ searchTerm: "", isActive: !this.state.isActive });
  };

  handleSelect = ({ key }) => {
    this.setState({ isActive: false, searchTerm: "" });
    this.props.handleCurrency(key.toUpperCase());
  };

  handleClickOutside = ({ target }) => {
    if (
      this.currencyWrapper &&
      !this.currencyWrapper.current.contains(target)
    ) {
      this.setState({ isActive: false, searchTerm: "" });
    }
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ searchTerm: value.toUpperCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.setCurrency(this.state.searchTerm);
    this.setState({ isActive: false, searchTerm: "" });
  };

  componentDidMount() {
    this.getCurrencies();

    // Add event listener for click outside event
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    // Remove event listener for click outside event
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isActive !== this.state.isActive && this.state.isActive) {
      this.currencyInput.current.focus();
    }
  }

  render() {
    const { currencyList, isActive, searchTerm } = this.state;

    return (
      <div ref={this.currencyWrapper}>
        <StyledCurrency onClick={this.toggleActive}>
          <StyledDollar />
          {!isActive && <span>{this.props.currency}</span>}
          {isActive && (
            <form onSubmit={this.handleSubmit}>
              <StyledInput
                ref={this.currencyInput}
                onChange={this.handleChange}
                value={searchTerm}
                placeholder="search..."
              />
            </form>
          )}
          <StyledArrow />
        </StyledCurrency>
        {isActive && (
          <StyledMenu onClick={this.handleSelect}>
            {!isEmpty(currencyList) && (
              <>
                {currencyList
                  .filter((item) => item.toUpperCase().includes(searchTerm))
                  .slice(0, 5)
                  .map((item) => (
                    <StyledItem key={item}>{item.toUpperCase()}</StyledItem>
                  ))}
              </>
            )}
          </StyledMenu>
        )}
      </div>
    );
  }
}

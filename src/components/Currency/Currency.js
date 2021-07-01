import React from "react";
import axios from "axios";
import { isEmpty } from "lodash";
import {
  StyledArrow,
  StyledCurrency,
  StyledDollar,
  StyledDropdownLink,
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
    console.log(key);
    this.props.handleCurrency(key);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ isActive: false });
    this.props.handleCurrency(this.state.searchTerm);
  };

  handleChange = (e) => {
    const {
      target: { value },
    } = e;
    this.setState({ searchTerm: value.toUpperCase() });
  };

  componentDidMount() {
    this.getCurrencies();
  }

  render() {
    const { currencyList, isActive, searchTerm } = this.state;

    return (
      <>
        <StyledCurrency>
          <StyledDollar />
          {!isActive && <span>{this.props.currency}</span>}
          {isActive && (
            <form onSubmit={this.handleSubmit}>
              <StyledInput
                onChange={this.handleChange}
                onBlur={this.toggleActive}
                value={searchTerm}
                placeholder="search..."
              />
            </form>
          )}
          <StyledArrow onClick={this.toggleActive} />
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
      </>
    );
  }
}

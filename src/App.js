import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import queryString from "query-string";
import {
  AppContainer,
  Container,
  StyledLink,
  StyledList,
  StyledNav,
} from "./App.styles";
import { Coin, Home, Portfolio } from "pages";
import { Currency, GlobalInfo } from "components";

console.clear();

export default class App extends React.Component {
  state = {
    currency: "EUR",
  };

  handleCurrency = (newCurrency) => {
    this.setState({ currency: newCurrency });
  };

  componentDidMount() {
    if (window.location.search) {
      const { currency } = queryString.parse(window.location.search);
      this.setState({ currency });
    } else {
      this.setState({ currency: "EUR" });
    }
  }

  render() {
    const { currency } = this.state;
    return (
      <AppContainer>
        <Router>
          <StyledNav>
            <StyledList>
              <li>
                <StyledLink exact activeClassName="selected" to="/">
                  Coins
                </StyledLink>
              </li>
              <li>
                <StyledLink exact activeClassName="selected" to="/portfolio">
                  Portfolio
                </StyledLink>
              </li>
            </StyledList>
            <Currency
              currency={currency}
              handleCurrency={this.handleCurrency}
            />
          </StyledNav>
          <Container>
            <GlobalInfo currency={currency} />
            <Switch>
              <Route
                path="/coins/:id"
                component={(props) => <Coin currency={currency} {...props} />}
              />
              <Route path="/portfolio">
                <Portfolio />
              </Route>
              <Route
                path="/"
                component={(props) => <Home currency={currency} {...props} />}
              />
            </Switch>
          </Container>
        </Router>
      </AppContainer>
    );
  }
}

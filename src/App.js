import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AppContainer,
  Container,
  StyledLink,
  StyledList,
  StyledNav,
} from "styled";
import { Coin, Home, Portfolio } from "pages";
import { Currency, GlobalInfo, SearchCoin } from "components";
import { setCurrency } from "store/app/actions";

console.clear();

class App extends React.Component {
  render() {
    const {
      app: { currency },
      pageConfig: { sortBy, descending },
      portfolio: {sortBy: portfolioSort},
    } = this.props;
    return (
      <AppContainer>
        <Router>
          <StyledNav>
            <StyledList>
              <li>
                <StyledLink
                  exact
                  activeClassName="selected"
                  to={`/?currency=${currency}&sortBy=${sortBy}&descending=${descending}`}
                >
                  Coins
                </StyledLink>
              </li>
              <li>
                <StyledLink
                  activeClassName="selected"
                  to={`/portfolio?currency=${currency}&sortBy=${portfolioSort}`}
                >
                  Portfolio
                </StyledLink>
              </li>
            </StyledList>
            <StyledList>
              <li>
                <SearchCoin />
              </li>
              <li>
                <Currency />
              </li>
            </StyledList>
          </StyledNav>
          <Container>
            <GlobalInfo currency={currency} />
            <Switch>
              <Route path="/coins/:id" component={Coin} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/" component={Home} />
            </Switch>
          </Container>
        </Router>
      </AppContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  app: state.app,
  pageConfig: state.home.pageConfig,
  portfolio: state.portfolio,
});

const mapDispatchToProps = {
  setCurrency,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

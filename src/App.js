import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  AppstoreFilled,
  ContainerOutlined,
  LineChartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  AppContainer,
  Container,
  StyledLink,
  StyledList,
  NavIcon,
  NavText,
  NarrowNav,
  WideNav,
  WideNavContainer,
} from "styles";
import { Coin, Home, Portfolio } from "pages";
import { Currency, GlobalInfo, SearchCoin } from "components";
import { setCurrency } from "store/app/actions";

console.clear();

class App extends React.Component {
  render() {
    const {
      app: { currency },
      pageConfig: { sortBy, descending },
      portfolio: { sortBy: portfolioSort },
    } = this.props;
    return (
      <AppContainer>
        <Router>
          <WideNavContainer>
            <WideNav>
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
            </WideNav>
          </WideNavContainer>
          <Container>
            <GlobalInfo currency={currency} />
            <Switch>
              <Route path="/coins/:id" component={Coin} />
              <Route path="/portfolio" component={Portfolio} />
              <Route path="/" component={Home} />
            </Switch>
          </Container>
          <NarrowNav>
            <StyledLink
              exact
              activeClassName="selected"
              to={`/?currency=${currency}&sortBy=${sortBy}&descending=${descending}`}
            >
              <NavIcon>
                <AppstoreFilled />
              </NavIcon>
              <NavText>Overview</NavText>
            </StyledLink>
            <StyledLink
              exact
              activeClassName="selected"
              to={`/portfolio?currency=${currency}&sortBy=${portfolioSort}`}
            >
              <NavIcon>
                <ContainerOutlined />
              </NavIcon>
              <NavText>Porfolio</NavText>
            </StyledLink>
            <StyledLink
              activeClassName="selected"
              to={`/coins/bitcoin?currency=${currency}`}
            >
              <NavIcon>
                <LineChartOutlined />
              </NavIcon>
              <NavText>Summary</NavText>
            </StyledLink>
            <StyledLink exact activeClassName="selected" to={`/search`}>
              <NavIcon>
                <SearchOutlined />
              </NavIcon>
              <NavText>Search</NavText>
            </StyledLink>
          </NarrowNav>
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

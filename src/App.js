import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AppContainer, StyledLink, StyledNav } from "./App.styles";
import {Home, Portfolio} from "pages";

export default function App() {
  return (
    <Router>
      <StyledNav>
        <ul>
          <li>
            <StyledLink to="/">Coins</StyledLink>
          </li>
          <li>
            <StyledLink to="/portfolio">Portfolio</StyledLink>
          </li>
        </ul>
      </StyledNav>
      <AppContainer>
        <Switch>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </AppContainer>
    </Router>
  );
}


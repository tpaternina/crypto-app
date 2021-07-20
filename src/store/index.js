import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import home from "./home/homeReducer";
import portfolio from "./portfolio/portfolioReducer";

const reducers = combineReducers({
  home,
  portfolio
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export default createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

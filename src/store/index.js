import { Router } from "react-router-dom";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import { merge } from "lodash";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  createReduxLocationActions,
  listenForHistoryChange,
} from "redux-location-state";
import createBrowserHistory from "history/createBrowserHistory";

import app from "./app";
import coin from "./coin";
import home from "./home";
import portfolio from "./portfolio";

// Local storage (save asset list only)
const portfolioPersistConfig = {
  key: "portfolio",
  storage,
  whitelist: ["assetList"],
};

const rootReducer = combineReducers({
  app,
  home,
  portfolio: persistReducer(portfolioPersistConfig, portfolio),
  coin,
});

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["app", "portfolio", "home", "coin"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Location state
const paramSetup = {
  "/": {
    sortBy: {
      stateKey: "home.pageConfig.sortBy",
    },
    descending: {
      stateKey: "home.pageConfig.descending",
      type: "bool",
    },
  },
  global: {
    currency: { stateKey: "app.currency", options: { shouldPush: true } },
  },
};

const mapLocationToState = (state, location) => {
  console.log(state, location.query);
  switch (location.pathname) {
    case "/":
      return merge({}, state, location.query);
    default:
      state.app.currency = location.query.app.currency;
      return state;
  }
};

const history = createBrowserHistory();

const { locationMiddleware, reducersWithLocation } = createReduxLocationActions(
  paramSetup,
  mapLocationToState,
  history,
  persistedReducer
);

// Add middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store and persistor
export const store = composeEnhancers(
  applyMiddleware(thunk, locationMiddleware)
)(createStore)(reducersWithLocation);
export const persistor = persistStore(store);

// State update
listenForHistoryChange(store, history);

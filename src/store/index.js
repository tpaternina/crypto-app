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

// Local storage

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
    currency: { stateKey: "app.currency" },
  },
};

const mapLocationToState = (state, location) => {
  switch (location.pathname) {
    case "/":
      return merge({}, state, location.query);
    default:
      return merge({}, state, location.query.app.currency);
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

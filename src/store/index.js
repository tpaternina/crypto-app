import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import app from "./app/appReducer";
import coin from "./coin/coinReducer";
import home from "./home/homeReducer";
import portfolio from "./portfolio/portfolioReducer";

const rootReducer = combineReducers({
  app,
  home,
  portfolio,
  coin
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ["portfolio"]
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(thunk)));
export const persistor = persistStore(store);
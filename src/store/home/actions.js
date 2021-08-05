import axios from "axios";
import queryString from "query-string";
import { keysToSnakeCase, keysToCamelCase } from "utils";
import {
  PARSE_HOME_QUERY_STRING,
  FETCH_ALL_COINS_SUCCESS,
  FETCH_ALL_COINS_PENDING,
  FETCH_ALL_COINS_ERROR,
  FETCH_PRICES_PENDING,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_ERROR,
  TOGGLE_ORDER,
} from "./index";

export const fetchAllCoins = () => async (dispatch, getState) => {
  try {
    const {
      home: { queryConfig },
      app: { currency },
    } = getState();
    dispatch({
      type: FETCH_ALL_COINS_PENDING,
    });
    const query = {
      ...keysToSnakeCase({
        ...queryConfig,
        vsCurrency: currency,
        priceChangePercentage: "1h,24h,7d",
        sparkline: true,
      }),
    };

    let { data } = await axios(
      queryString.stringifyUrl({
        url: process.env.REACT_APP_COINS_ENDPOINT,
        query: query,
      })
    );
    // Convert keys from API to camelCase
    data = data.map(keysToCamelCase);
    dispatch({
      type: FETCH_ALL_COINS_SUCCESS,
      payload: { data },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_ALL_COINS_ERROR,
      payload: { err },
    });
  }
};

export const fetchPrices = (currency) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_PRICES_PENDING,
    });
    const {
      home: { coinList },
    } = getState();
    const query = queryString.stringifyUrl({
      url: `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${coinList[0].id}/market_chart`,
      query: {
        vs_currency: currency,
        days: 30,
        interval: "daily",
      },
    });
    let { data } = await axios(query);
    data = keysToCamelCase(data);
    const { prices, totalVolumes } = data;
    dispatch({
      type: FETCH_PRICES_SUCCESS,
      payload: { prices, totalVolumes },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: FETCH_PRICES_ERROR,
      payload: { err },
    });
  }
};

export const toggleOrder = (sortBy, descending) => {
  return {
    type: TOGGLE_ORDER,
    payload: {
      sortBy,
      descending,
    },
  };
};

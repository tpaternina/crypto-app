import axios from "axios";
import queryString from "query-string";
import { keysToSnakeCase, keysToCamelCase, getInterval } from "utils";
import {
  SET_PAGE,
  FETCH_ALL_COINS_SUCCESS,
  FETCH_ALL_COINS_PENDING,
  FETCH_ALL_COINS_ERROR,
  FETCH_PRICES_PENDING,
  FETCH_PRICES_SUCCESS,
  FETCH_PRICES_ERROR,
  SET_TIME_RANGE,
  TOGGLE_ORDER,
  SEARCH_PAGE_OPEN,
  SEARCH_PAGE_UNOPEN,
  SEARCH_PAGE_DESTROY,
  SEARCH_PAGE_UNDESTROY,
} from "./index";

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: { page },
});

export const fetchAllCoins = (page) => async (dispatch, getState) => {
  const {
    home: { queryConfig, coinList },
    app: { currency },
  } = getState();

  page = page || queryConfig.page;
  const pages = !coinList.length ? [...Array(page).keys()].map((val) => val + 1): [page];
  try {
    console.log("fetching...")
    dispatch({
      type: FETCH_ALL_COINS_PENDING,
    });
    let data = await Promise.all(
      pages.map(async (page) => {
        const query = {
          ...keysToSnakeCase({
            ...queryConfig,
            page,
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
        return data;
      })
    );
    data = data.reduce((acc, list) => [...acc, ...list], []);
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

export const fetchPrices = (currency, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_PRICES_PENDING,
    });
    const {
      home: { coinList, timeRange },
    } = getState();
    id = id || coinList[0].id;
    const query = queryString.stringifyUrl({
      url: `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${id}/market_chart`,
      query: {
        vs_currency: currency,
        days: timeRange,
        ...getInterval(timeRange),
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

export const setTimeRange = ({ target: { value } }) => {
  return {
    type: SET_TIME_RANGE,
    payload: { timeRange: value },
  };
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

export const showSearchPage = () => (dispatch, getState) => {
  dispatch({
    type: SEARCH_PAGE_UNDESTROY,
  });
  setTimeout(
    () =>
      dispatch({
        type: SEARCH_PAGE_OPEN,
      }),
    250
  );
};

export const hideSearchPage = () => (dispatch, getState) => {
  dispatch({
    type: SEARCH_PAGE_UNOPEN,
  });
  setTimeout(
    () =>
      dispatch({
        type: SEARCH_PAGE_DESTROY,
      }),
    250
  );
};

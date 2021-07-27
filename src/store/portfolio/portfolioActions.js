import axios from "axios";
import { formatQueryDate, keysToCamelCase } from "utils";

export const ADD_ASSET_UNDESTROY_MODAL = "ADD_ASSET_UNDESTROY_MODAL";
export const ADD_ASSET_OPEN_MODAL = "ADD_ASSET_OPEN_MODAL";
export const ADD_ASSET_DESTROY_MODAL = "ADD_ASSET_DESTROY_MODAL";
export const ADD_ASSET_UNOPEN_MODAL = "ADD_ASSET_UNOPEN_MODAL";
export const ADD_ASSET_RESET_EDIT_COIN = "ADD_ASSET_RESET_EDIT_COIN";
export const ADD_ASSET_SELECT_COIN = "ADD_ASSET_SELECT_COIN";
export const ADD_ASSET_COIN_INFO_SUCCESS = "ADD_ASSET_COIN_INFO_SUCCESS";
export const ADD_ASSET_COIN_INFO_ERROR = "ADD_ASSET_COIN_INFO_ERROR";
export const ADD_ASSET_SUCCESS = "ADD_ASSET_SUCCESS";
export const EDIT_ASSET_EDIT_COIN = "EDIT_ASSET_EDIT_COIN";
export const EDIT_ASSET_SUCCESS = "EDIT_ASSET_SUCCESS";
export const GET_PRICE_AT_DATE_PENDING = "GET_PRICE_AT_DATE_PENDING";
export const GET_PRICE_AT_DATE_ERROR = "GET_PRICE_AT_DATE_ERROR";
export const GET_PRICE_AT_DATE_SUCCESS = "GET_PRICE_AT_DATE_SUCCESS";
export const DELETE_ASSET = "DELETE_ASSET";

export const getCoinInfo = () => async (dispatch, getState) => {
  if (getState().portfolio.editCoin.id) {
    try {
      const { id } = getState().portfolio.editCoin;
      let { data: coin } = await axios(
        `${process.env.REACT_APP_SINGLE_COIN_ENDPOINT}/${id}`
      );
      coin = keysToCamelCase(coin);
      dispatch({
        type: ADD_ASSET_COIN_INFO_SUCCESS,
        payload: {
          ...getState().portfolio.editCoin,
          ...coin,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: ADD_ASSET_COIN_INFO_ERROR,
        payload: err,
      });
    }
  }
};

export const getPriceAtDate = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PRICE_AT_DATE_PENDING,
    });

    const {
      portfolio: { assetList, currency },
    } = getState();
    const coin = assetList.find((coin) => !coin.priceAtPurchase);
    const { id, purchasedDate } = coin;
    let { data } = await axios(
      `${
        process.env.REACT_APP_SINGLE_COIN_ENDPOINT
      }/${id}/history?date=${formatQueryDate(purchasedDate)}&localization=false`
    );
    data = keysToCamelCase(data);

    const {
      marketData: { currentPrice: priceAtPurchase },
    } = data;
    coin.priceAtPurchase = priceAtPurchase[currency.toLowerCase()];
    dispatch({
      type: GET_PRICE_AT_DATE_SUCCESS,
      payload: coin,
    });
  } catch (err) {
    dispatch({
      type: GET_PRICE_AT_DATE_ERROR,
      payload: err,
    });
  }
};

export const handleClose = () => (dispatch, getState) => {
  dispatch({
    type: ADD_ASSET_UNOPEN_MODAL,
  });
  setTimeout(() => {
    dispatch({
      type: ADD_ASSET_DESTROY_MODAL,
    });
    dispatch({
      type: ADD_ASSET_RESET_EDIT_COIN,
    });
  }, 250);
};

export const handleDelete = (key) => {
  return {
    type: DELETE_ASSET,
    payload: { key },
  };
};

export const handleSelect = (coin) => {
  return {
    type: ADD_ASSET_SELECT_COIN,
    payload: coin,
  };
};

export const handleSubmit = (values) => async (dispatch, getState) => {
  const { editCoin } = getState().portfolio;
  const newCoin = { ...editCoin };
  newCoin.purchasedDate = values.purchasedDate;
  newCoin.purchasedAmount = values.purchasedAmount;

  // Get price at purchase date
  if (
    JSON.stringify(editCoin.purchasedDate) !==
    JSON.stringify(newCoin.purchasedDate)
  ) {
    try {
      dispatch({
        type: GET_PRICE_AT_DATE_PENDING,
      });

      const {
        portfolio: { currency },
      } = getState();
      const { id, purchasedDate } = newCoin;
      let { data } = await axios(
        `${
          process.env.REACT_APP_SINGLE_COIN_ENDPOINT
        }/${id}/history?date=${formatQueryDate(
          purchasedDate
        )}&localization=false`
      );
      data = keysToCamelCase(data);

      const {
        marketData: { currentPrice: priceAtPurchase },
      } = data;
      newCoin.priceAtPurchase = priceAtPurchase[currency.toLowerCase()];
      dispatch({
        type: GET_PRICE_AT_DATE_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: GET_PRICE_AT_DATE_ERROR,
        payload: err,
      });
    }
  }

  // Edit mode
  if (!newCoin.key) {
    newCoin.key = `${Math.random()}-${Math.random()}`;
    dispatch({
      type: ADD_ASSET_SUCCESS,
      payload: newCoin,
    });
  } else {
    dispatch({ type: EDIT_ASSET_SUCCESS, payload: newCoin });
  }

  dispatch({
    type: ADD_ASSET_UNOPEN_MODAL,
  });
  setTimeout(() => {
    dispatch({
      type: ADD_ASSET_DESTROY_MODAL,
    });
    dispatch({
      type: ADD_ASSET_RESET_EDIT_COIN,
    });
  }, 250);
};

export const showAddAsset = () => (dispatch, getState) => {
  dispatch({
    type: ADD_ASSET_UNDESTROY_MODAL,
  });
  setTimeout(
    () =>
      dispatch({
        type: ADD_ASSET_OPEN_MODAL,
      }),
    250
  );
};

export const showEditAsset = (editCoin) => (dispatch, getState) => {
  dispatch({
    type: EDIT_ASSET_EDIT_COIN,
    payload: editCoin,
  });
  dispatch({
    type: ADD_ASSET_UNDESTROY_MODAL,
  });
  setTimeout(
    () =>
      dispatch({
        type: ADD_ASSET_OPEN_MODAL,
      }),
    250
  );
};
import {
  ADD_ASSET_UNDESTROY_MODAL,
  ADD_ASSET_OPEN_MODAL,
  ADD_ASSET_DESTROY_MODAL,
  ADD_ASSET_UNOPEN_MODAL,
  ADD_ASSET_RESET_EDIT_COIN,
  ADD_ASSET_SELECT_COIN,
  ADD_ASSET_COIN_INFO_SUCCESS,
  ADD_ASSET_COIN_INFO_ERROR,
  ADD_ASSET_SUCCESS,
  EDIT_ASSET_EDIT_COIN,
  EDIT_ASSET_SUCCESS,
  GET_PRICE_AT_DATE_PENDING,
  GET_PRICE_AT_DATE_ERROR,
  GET_PRICE_AT_DATE_SUCCESS,
  DELETE_ASSET,
} from "./portfolioActions";

const initialState = {
  assetList: [],
  editCoin: {},
  coinSearchList: [],
  openAddAsset: false,
  destroyAddAsset: true,
  currency: "eur",
  hasError: false,
};

const portfolioReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ASSET_UNDESTROY_MODAL:
      return {
        ...state,
        destroyAddAsset: false,
      };
    case ADD_ASSET_OPEN_MODAL:
      return {
        ...state,
        openAddAsset: true,
      };
    case ADD_ASSET_UNOPEN_MODAL:
      return {
        ...state,
        openAddAsset: false,
      };
    case ADD_ASSET_DESTROY_MODAL:
      return {
        ...state,
        destroyAddAsset: true,
      };

    case ADD_ASSET_SELECT_COIN:
      return {
        ...state,
        editCoin: payload,
      };
    case ADD_ASSET_COIN_INFO_SUCCESS:
      return {
        ...state,
        editCoin: { ...state.editCoin, ...payload },
      };

    case ADD_ASSET_SUCCESS:
      const newList = [...state.assetList, payload];
      return {
        ...state,
        assetList: newList,
      };
    case EDIT_ASSET_EDIT_COIN:
      return {
        ...state,
        editCoin: payload,
      };
    case EDIT_ASSET_SUCCESS:
      const editedList = state.assetList.map((item) => {
        if (item.key === payload.key) {
          return payload;
        }
        return item;
      });
      return {
        ...state,
        assetList: editedList,
      };
    case DELETE_ASSET:
      const updatedList = state.assetList.filter(
        (item) => item.key !== payload.key
      );
      return {
        ...state,
        assetList: updatedList,
      };
    case GET_PRICE_AT_DATE_SUCCESS:
      const newListPrice = state.assetList.map((el) => {
        if (el.key === payload.key) {
          return payload;
        }
        return el;
      });
      return {
        ...state,
        assetList: newListPrice,
        hasError: false,
        editCoin: {},
      };

    case ADD_ASSET_RESET_EDIT_COIN:
      return {
        ...state,
        editCoin: { ...{} },
      };
    case GET_PRICE_AT_DATE_ERROR:
      return {
        ...state,
        hasError: payload,
      };
    default:
      return state;
  }
};

export default portfolioReducer;

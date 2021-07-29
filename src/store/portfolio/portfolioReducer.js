import {
  ADD_ASSET_UNDESTROY_MODAL,
  ADD_ASSET_OPEN_MODAL,
  ADD_ASSET_DESTROY_MODAL,
  ADD_ASSET_UNOPEN_MODAL,
  ADD_ASSET_RESET_EDIT_COIN,
  FETCH_COIN_LIST_PENDING,
  FETCH_COIN_LIST_SUCCESS,
  FETCH_COIN_LIST_ERROR,
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
  isPriceLoading: false,
  isSearchLoading: false,
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

    case FETCH_COIN_LIST_PENDING:
      return {
        ...state,
        isSearchLoading: true,
      };
    case FETCH_COIN_LIST_SUCCESS:
      return {
        ...state,
        isSearchLoading: false,
        coinSearchList: payload.coinList,
      };
    case FETCH_COIN_LIST_ERROR:
      return {
        ...state,
        hasError: payload.err,
      };

    case ADD_ASSET_SELECT_COIN:
      return {
        ...state,
        editCoin: payload.coin,
        coinSearchList: [],
      };
    case ADD_ASSET_COIN_INFO_SUCCESS:
      return {
        ...state,
        editCoin: payload.editCoin,
      };

    case ADD_ASSET_SUCCESS:
      const newList = [...state.assetList, payload];
      return {
        ...state,
        assetList: newList,
        hasError: false,
        editCoin: {},
      };
    case EDIT_ASSET_EDIT_COIN:
      return {
        ...state,
        editCoin: payload.editCoin,
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
        editCoin: {},
      };
    case ADD_ASSET_RESET_EDIT_COIN:
      return {
        ...state,
        editCoin: {},
      }


    case DELETE_ASSET:
      const updatedList = state.assetList.filter(
        (item) => item.key !== payload.key
      );
      return {
        ...state,
        assetList: updatedList,
      };
    case GET_PRICE_AT_DATE_PENDING:
      return {
        ...state,
        isPriceLoading: true,
      }
    case GET_PRICE_AT_DATE_SUCCESS:
      // TODO: loading feedback when retrieving price at date info
      return {
        ...state,
        isPriceLoading: false,
      };
    case GET_PRICE_AT_DATE_ERROR:
      return {
        ...state,
        hasError: payload,
        isPriceLoading: false
      };
    default:
      return state;
  }
};

export default portfolioReducer;

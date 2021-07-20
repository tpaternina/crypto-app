import {
  ADD_ASSET_UNDESTROY_MODAL,
  ADD_ASSET_OPEN_MODAL,
  ADD_ASSET_DESTROY_MODAL,
  ADD_ASSET_UNOPEN_MODAL,
  ADD_ASSET_RESET_EDIT_COIN,
} from "./portfolioActions";

const initialState = {
  assetList: [],
  editCoin: {},
  openAddAsset: false,
  destroyAddAsset: true,
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
    case ADD_ASSET_RESET_EDIT_COIN:
      return {
        ...state,
        editCoin: {},
      };
    default:
      return state;
  }
};

export default portfolioReducer;

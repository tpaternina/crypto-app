export const ADD_ASSET_UNDESTROY_MODAL = "ADD_ASSET_UNDESTROY_MODAL";
export const ADD_ASSET_OPEN_MODAL = "ADD_ASSET_OPEN_MODAL";
export const ADD_ASSET_DESTROY_MODAL = "ADD_ASSET_DESTROY_MODAL";
export const ADD_ASSET_UNOPEN_MODAL = "ADD_ASSET_UNOPEN_MODAL";
export const ADD_ASSET_RESET_EDIT_COIN = "ADD_ASSET_RESET_EDIT_COIN";

export const handleClose = () => (dispatch, getState) => {
  dispatch({
    type: ADD_ASSET_UNOPEN_MODAL,
  });
  setTimeout(
    () =>
      dispatch({
        type: ADD_ASSET_DESTROY_MODAL,
      }),
    250
  );
  dispatch({
    type: ADD_ASSET_RESET_EDIT_COIN,
  });
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

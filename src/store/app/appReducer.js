import { CHANGE_CURRENCY } from "./appActions";

/* ACTION TYPES */
const initialState = {
  currency: "EUR",
};

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_CURRENCY:
      return {
        ...state,
        currency: payload.currency,
      };
    default:
      return state;
  }
};

export default appReducer;

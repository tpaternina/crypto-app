export const CHANGE_CURRENCY = "CHANGE_CURRENCY";

export const setCurrency = (currency) => {
  return {
    type: CHANGE_CURRENCY,
    payload: { currency },
  };
};

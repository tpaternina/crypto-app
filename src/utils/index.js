import { camelCase, snakeCase, capitalize, isPlainObject } from "lodash";
import moment from "moment";

export function formatLongNumber(number, currency, decimals) {
  const symbols = ["", "K", "M", "B", "T", "Q"];
  decimals = decimals || 2;

  if (!number) return "∞";

  // Get the tier of number to determine symbol
  // e.g. if x = 1000, then log10(x) = 3, and  tier = 1, which is the 2nd element of symbols array
  const tier = Math.floor(Math.log10(number) / 3) || 0;
  // Get suffix and the value to scale the number down
  const suffix = symbols[tier];
  const scale = 10 ** (tier * 3);

  // Get the currency symbol (with a shameless StackOverflow hack)
  let currencySymbol;
  try {
    currencySymbol = Number()
      .toLocaleString(undefined, {
        style: "currency",
        currency: currency.toUpperCase(),
      })
      .slice(0, -4);
  } catch (err) {
    currencySymbol = currency.toUpperCase();
  }

  // Scale the number and add suffix
  return currencySymbol + (number / scale).toFixed(decimals) + suffix;
}

export const formatDate = (date) => {
  let currentDate = new Date(date);
  currentDate = currentDate.toDateString().split(" ").slice(1).join(" ");
  return currentDate;
};

export const formatLongDate = (date) => {
  date = new Date(date);
  return date.toUTCString();
};

export const formatOverviewChart = (array) => {
  // chart data
  const data = {
    x: formatLongDate(array[0]),
    y: array[1].toFixed(2),
  };
  return data;
};

export const formatCurrency = (number, currency) => {
  let result;
  try {
    result = number.toLocaleString("en-UK", {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    });
  } catch (err) {
    result = `${currency} ${number.toLocaleString("en-UK", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
    })}`;
  }
  return result;
};

export const keysToSnakeCase = (obj) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    return { ...acc, [snakeCase(key)]: val };
  }, {});

export const keysToCamelCase = (obj) =>
  Object.entries(obj).reduce((acc, [key, val]) => {
    // Check if it is nested object
    if (isPlainObject(val)) {
      val = keysToCamelCase(val);
    }
    return { ...acc, [camelCase(key)]: val };
  }, {});

export const camelCaseToCapitalize = (string) => {
  return capitalize(snakeCase(string).split("_").join(" "));
};

export const formatQueryDate = (dateString) => {
  return moment(dateString).format("DD-MM-YYYY");
};

export const getInterval = (timeRange) => {
  const map = {
    365: {interval: "daily"},
    180: {interval: "daily"},
    90: {interval: "daily"},
    30: {interval: "daily"},
    7: {},
    1: {},
  }
  return map[timeRange];
};
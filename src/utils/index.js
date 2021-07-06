import { camelCase, snakeCase, isPlainObject } from "lodash";

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
  const currencySymbol = Number().toLocaleString(undefined, {
    style: "currency",
    currency: currency.toUpperCase(),
  }).slice(0,-4);

  // Scale the number and add suffix
  return currencySymbol + (number / scale).toFixed(decimals) + suffix;
}

export const formatDate = (date) => {
  let currentDate = new Date(date);
  currentDate = currentDate.toDateString().split(" ").slice(1).join(" ");
  return currentDate;
};

export const formatOverviewChart = (array) => {
  // chart data
  const data = {
    x: formatDate(array[0]).split(" ").slice(0, 2).join(" "),
    y: array[1].toFixed(2),
  };
  return data;
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
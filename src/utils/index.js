export function formatLongNumber(number, currency) {
  const symbols = ["", "K", "M", "B", "T", "Q"];

  if (!number) return "unkown";

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
  })[0];

  // Scale the number and add suffix
  return currencySymbol + (number / scale).toFixed(2) + suffix;
}

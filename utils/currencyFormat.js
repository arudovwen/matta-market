export default function (
  value,
  currency = "NGN",
  fraction = 0,
  showSymbol = true
) {
  const { value: newValue, currency: newCurrency } = handleCurrencyZone(value);
  console.log("🚀 ~ newCurrency:", newCurrency);
  console.log("🚀 ~ newVlaue:", newValue);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: newCurrency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: fraction,
    maximumFractionDigits: 2,
  });

  const formattedValue = formatter.format(newValue || 0);

  return showSymbol ? formattedValue : formattedValue.replace(/[^0-9.-]/g, "");
}

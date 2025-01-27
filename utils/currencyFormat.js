export default function (
  value,
  currency = "NGN",
  fraction = 0,
  showSymbol = true
) {
  const currentCurrency = inject('currentCurrency')
  const { value: newValue } = handleCurrencyZone(value, currentCurrency?.value ?? currency);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currentCurrency?.value ?? currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: fraction,
    maximumFractionDigits: 2,
  });

  const formattedValue = formatter.format(newValue || 0);

  return showSymbol ? formattedValue : formattedValue.replace(/[^0-9.-]/g, "");
}

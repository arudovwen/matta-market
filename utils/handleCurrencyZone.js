export function handleCurrencyZone(value, currency) {
  const currentRate = useCurrencyStore().activeCurrency?.rate || 1;

  if (currency && currency.toLowerCase() === "ngn") {
    return { value };
  } else {
    return { value: value / currentRate };
  }
}

export function handleCurrencyZone(value, currency) {
  const currentRate = useCurrencyStore().activeCurrency?.rate;
  // console.log({ currentRate });

  if (currency?.toLowerCase() === "ngn") {
    return { value };
  } else {
    return { value: value / currentRate };
  }
}

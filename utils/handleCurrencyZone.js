export function handleCurrencyZone(value, currency) {
  const usdRate = useCartStore().usdRate;

  if (currency?.toLowerCase() === "ngn") {
    return { value };
  } else {
    return { value: value / usdRate };
  }
}

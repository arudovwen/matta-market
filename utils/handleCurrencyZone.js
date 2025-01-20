export function handleCurrencyZone(value) {
  const usdRate = useCartStore().usdRate;
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const NIGERIA_ZONE = "Africa/Lagos";
  if (zone.toLowerCase() === NIGERIA_ZONE.toLowerCase()) {
    return { value, currency: "NGN" };
  } else {
    return { value: value / usdRate, currency: "USD" };
  }
}

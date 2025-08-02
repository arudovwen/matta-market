import { defineStore } from "pinia";
import { getCurrencyRates } from "~/services/currencyservice";

export const useCurrencyStore = defineStore("curreny", () => {
  const currencies = ref([]);
  const defaultCurrency = ref("XOF");
  const activeCurrency = ref(null);
  const queryParams = reactive({
    PageSize: 1000,
    PageNumber: 1,
    ShowCountry: true,
    status: true,
  });
  function setCurrencies(data) {
    currencies.value = data;
  }
  function setActiveCurrency(data) {
    const tempData = currencies.value.find(
      (i) => i.destinationCurrencyCode === data
    );
    activeCurrency.value = tempData;
  }
  async function getCurrencies() {
    try {
      const response = await getCurrencyRates(queryParams);
      currencies.value = response.data.results.map((i) => ({
        ...i,
        label: i.destinationCurrencyCode,
        value: i.destinationCurrencyCode,
      }));
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const country = timezoneCountryMapping[zone];
      const tempCurrency = getCurrencyByCountry(country);
      setActiveCurrency(tempCurrency?.currencyCode);
      defaultCurrency.value = tempCurrency?.currencyCode;

      console.log({ tempCurrency });
    } catch (error) {}
  }

  function getCurrencyByCountry(countryName) {
    for (let currency of currencies.value) {
      // Check if this currency applies to the provided country
      const country = currency.countries.find(
        (c) => c.country.toLowerCase() === countryName.toLowerCase()
      );
      if (country) {
        return {
          currencyCode: currency.sourceCurrencyCode,
          symbol: currency.symbol,
          rate: currency.rate,
        };
      }
    }

    // If no match is found, return a message or a default
    return "Currency not found for this country";
  }
  return {
    currencies,
    getCurrencies,
    setCurrencies,
    activeCurrency,
    setActiveCurrency,
    getCurrencyByCountry,
    defaultCurrency,
  };
});

import { defineStore } from "pinia";
import { getCurrencyRates } from "~/services/currencyservice";

export const useCurrencyStore = defineStore("curreny", () => {
  const currencies = ref([]);
  const defaultCurrency = ref("NGN");
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
      // Fetch data in parallel if independent
      const [response, tempCountry] = await Promise.all([
        getCurrencyRates(queryParams),
        getUserCountry(),
      ]);

      // Map the currency data
      currencies.value = response.data.results.map((i) => ({
        ...i,
        label: i.destinationCurrencyCode,
        value: i.destinationCurrencyCode,
      }));

      // Get the user's timezone and related country currency
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const country = timezoneCountryMapping[zone];
      const tempCurrency = getCurrencyByCountry(country);
      // Get the currency from the API country
      const tempApiCurrency = getCurrencyByCountry(tempCountry, "countryCode");

      // Set default active currency
      setActiveCurrency(
        tempApiCurrency?.currencyCode || tempCurrency?.currencyCode
      );
      defaultCurrency.value =
        tempApiCurrency?.currencyCode || tempCurrency?.currencyCode;
    } catch (error) {
      // Handle the error
      console.error("Error fetching currencies or country info:", error);
      setActiveCurrency("NGN");
      defaultCurrency.value = "NGN";
    }
  }

  function getCurrencyByCountry(countryName, type = "country") {
    for (let currency of currencies.value) {
      // Check if this currency applies to the provided country
      const country = currency.countries.find(
        (c) => c?.[type].toLowerCase() === countryName.toLowerCase()
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

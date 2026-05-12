
import urls from "../helpers/url_helpers";
import store from "../store";
import { currencyGet } from "~/helpers/api_helpers";


const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export async function getCurrencyRate(data) {
  return await currencyGet(`${urls.GET_CURRENCY_RATE}/${data}`, config);
}

export async function getCurrencyRates(data) {
  return await currencyGet(
    `${urls.GET_ALL_CURRENCY_RATE}?${new URLSearchParams(data)}`,
    config
  );
}

import { createApiClient } from "~/helpers/update_api_helpers";
import urls from "../helpers/url_helpers";
import store from "../store";
import { currencyGet } from "~/helpers/api_helpers";

const { get } = createApiClient("https://staging.currency.matta.trade/apI");

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export async function getCurrencyRate(data) {
  return await currencyGet(`${urls.GET_CURRENCY_RATE}/${data}`, config);
}

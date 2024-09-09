import urls from "../helpers/url_helpers";
import { get, post } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getCreditRequest = withRetryHandling((payload) => {
  return get(
    `${urls.GET_ALL_CREDIT_REQUEST}?${new URLSearchParams(payload)}`,
    config
  );
});

export async function postCreditRequest(data) {
  return await post(`${urls.REQUEST_CREDIT}`, data, config);
}

export async function getCreditDetail() {
  return await get(urls.GET_CREDIT_DETAIL, config);
}
export async function getPrepaidInfo(amount) {
  return await get(`${urls.PREPAID_CREDIT_INFO}?amount=${amount}`, config);
}

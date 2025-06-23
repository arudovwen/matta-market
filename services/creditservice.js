import urls from "../helpers/url_helpers";
import { oxideGet, oxidePost } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getCreditRequest = withRetryHandling((payload) => {
  return oxideGet(
    `${urls.GET_ALL_CREDIT_REQUEST}?${new URLSearchParams(payload)}`,
    config
  );
});

export async function postCreditRequest(data) {
  return await oxidePost(`${urls.REQUEST_CREDIT}`, data, config);
}

export async function getCreditDetail() {
  return await oxideGet(urls.GET_CREDIT_DETAIL, config);
}
export async function getPrepaidInfo(amount) {
  return await oxideGet(`${urls.PREPAID_CREDIT_INFO}?amount=${amount}`, config);
}

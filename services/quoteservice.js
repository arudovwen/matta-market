import urls from "../helpers/url_helpers";
import { get, post } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const sellerquotes = withRetryHandling(
  ({ Status, Search, PageNumber, PageSize, SortOrder }) => {
    return get(
      `${urls.SELLER_QUOTES}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}
      &Status=${Status}`,
      config
    );
  }
);

export const sellerquotedetail = withRetryHandling((id) => {
  return get(`${urls.SELLER_QUOTE_DETAIL}?id=${id}`, config);
});

export const buyerquotes = withRetryHandling(
  ({ Status, Search, PageNumber, PageSize, SortOrder }) => {
    return get(
      `${urls.BUYER_QUOTES}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}
       &Status=${Status}&SortOrder=${SortOrder}`,
      config
    );
  }
);

export const buyerquotedetail = withRetryHandling((id) => {
  return get(`${urls.BUYER_QUOTE_DETAIL}?id=${id}`, config);
});

export async function newquote(data) {
  return await post(`${urls.NEW_QUOTE}`, data, config);
}
export async function uploaddoc(data) {
  return await post(`${urls.QUOTE_UPLOAD_DOCUMENT}`, data, config);
}

export async function confirmavailablilty(data) {
  return await post(`${urls.CONFIRM_QUOTE_AVAILABILITY}`, data, config);
}
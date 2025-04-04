import urls from "../helpers/url_helpers";
import { get, marketGet } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const storefrontorders = withRetryHandling(
  ({ Status, SortOrder, Search, PageNumber, PageSize }) => {
    return marketGet(
      `${urls.STOREFRONT_ORDERS}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}&Status=${Status}`,
      config
    );
  }
);

export const storefrontorderdetails = withRetryHandling((orderId) => {
  return marketGet(`${urls.STOREFRONT_ORDER_DETAILS}?orderId=${orderId}`, config);
});

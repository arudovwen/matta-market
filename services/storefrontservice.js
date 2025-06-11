import urls from "../helpers/url_helpers";
import { marketGet } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const storefrontorders = withRetryHandling(
  (payload) => {
    return marketGet(
      `${urls.STOREFRONT_ORDERS}?${new URLSearchParams((cleanObject(payload)))}`,
      config
    );
  }
);

export const storefrontorderdetails = withRetryHandling((orderId) => {
  return marketGet(`${urls.STOREFRONT_ORDER_DETAILS}?orderId=${orderId}`, config);
});

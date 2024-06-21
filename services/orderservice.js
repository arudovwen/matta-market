import urls from "../helpers/url_helpers";
import { get } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const procurementorders = withRetryHandling(
  (payload) => {
    return get(
      `${urls.PROCUREMENT_ORDERS}?${new URLSearchParams(cleanObject(payload))}`,
      config
    );
  }
);
export const buyerordertimeline = withRetryHandling((salesorderId) => {
  return get(
    `${urls.BUYER_ORDER_TIMELINE}?salesorderId=${salesorderId}`,
    config
  );
});
export const procurementorderdetails = withRetryHandling((orderId) => {
  return get(`${urls.PROCUREMENT_ORDER_DETAILS}?orderId=${orderId}`, config);
});

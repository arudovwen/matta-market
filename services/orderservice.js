import urls from "../helpers/url_helpers";
import { get } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const procurementorders = withRetryHandling(
  ({ Status, SortOrder, Search, PageNumber, PageSize }) => {
    return get(
      `${urls.PROCUREMENT_ORDERS}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}&Status=${Status}`,
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

import urls from "../helpers/url_helpers";
import { get, marketPost, post } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const procurementrequests = withRetryHandling(
  ({
    SortOrder,
    Search,
    PageNumber,
    PageSize,
    ProductId,
    ProducerId,
    RequestStatus,
    SupplierId,
  }) => {
    return get(
      `${urls.PROCUREMENT_MYREQUESTS}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}
      &SupplierId=${SupplierId}&RequestStatus=${RequestStatus}&ProducerId=${ProducerId}&ProductId=${ProductId}`,
      config
    );
  }
);

export const procurementrequestdetails = withRetryHandling((requestId) => {
  return get(
    `${urls.PROCUREMENT_MYREQUEST_DETAILS}?requestId=${requestId}`,
    config
  );
});
export const buyerordertimeline = withRetryHandling((salesorderId) => {
  return get(
    `${urls.BUYER_ORDER_TIMELINE}?salesorderId=${salesorderId}`,
    config
  );
});

export const procurementrequestcount = withRetryHandling(() => {
  return get(`${urls.PROCUREMENT_REQUEST_COUNT}`, config);
});

export const procurementproducts = withRetryHandling(() => {
  return get(
    `${urls.PROCUREMENT_PRODUCTS}?PageSize=${30}&PageNumber=${1}&Search=${""}`,
    config
  );
});
export const procurementsuppliers = withRetryHandling(() => {
  return get(
    `${urls.PROCUREMENT_SUPPLIERS}?PageSize=${30}&PageNumber=${1}&Search=''`,
    config
  );
});
export async function setascancelled(data) {
  return await marketPost(`${urls.PROCUREMENT_SET_CANCELLED}`, data, config);
}
export async function addrequest(data) {
  return await post(`${urls.ADD_SAMPLE_REQUEST}`, data, config);
}

import urls from "../helpers/url_helpers";
import { get, post } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const samplerequests = withRetryHandling(
  ({
    SortOrder,
    Search,
    PageNumber,
    PageSize,
    ProductId,
    ProducerId,
    RequestStatus,
  }) => {
    return get(
      `${urls.SAMPLE_REQUESTS}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}
      &SupplierId=${store.getters.userId}&RequestStatus=${RequestStatus}&ProducerId=${ProducerId}&ProductId=${ProductId}`,
      config
    );
  }
);

export const samplerequestdetails = withRetryHandling((requestId) => {
  return get(`${urls.SAMPLE_REQUEST_DETAILS}?requestId=${requestId}`, config);
});

export const samplerequestcount = withRetryHandling(() => {
  return get(`${urls.SAMPLE_REQUESTS_COUNT}`, config);
});

export const samplerequestproducts = withRetryHandling(
  ({ Search, PageNumber, PageSize }) => {
    return get(
      `${urls.SAMPLE_REQUESTS_PRODUCTS}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}`,
      config
    );
  }
);

export async function adddocument(data) {
  return await post(`${urls.ADD_DOCUMENT_REQUEST}`, data, config);
}

export const buyerdoc = withRetryHandling(
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
      `${urls.DOCUMENT_REQUESTS}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}
      &RequestStatus=${RequestStatus}&ProducerId=${ProducerId}&ProductId=${ProductId}&SupplierId=${SupplierId}`,
      config
    );
  }
);

export const docdetails = withRetryHandling((requestId) => {
  return get(`${urls.DOCUMENT_REQUEST_DETAILS}?requestId=${requestId}`, config);
});

export async function setascancelled(data) {
  return await post(`${urls.DOCUMENT_SET_CANCELLED}`, data, config);
}

export const sellerdoc = withRetryHandling(
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
      `${urls.SELLER_DOCUMENTS}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}
      &SupplierId=${store.getters.userId}&RequestStatus=${RequestStatus}&ProducerId=${ProducerId}&ProductId=${ProductId}&SupplierId=${SupplierId}`,
      config
    );
  }
);

export const sellerdocdetails = withRetryHandling((requestId) => {
  return get(`${urls.SELLER_DOCUMENT_DETAILS}?requestId=${requestId}`, config);
});

export async function sellersetascancelled(data) {
  return await post(`${urls.SELLER_DOCUMENT_SET_CANCELLED}`, data, config);
}

export async function uploaddoc(data) {
  return await post(`${urls.SAMPLE_REQUEST_UPLOAD_DOCUMENT}`, data, config);
}

export async function saveAsDraft(data) {
  return await post(`${urls.SAVE_REQUEST_DRAFT}`, data, config);
}

export async function getDraft() {
  return await get(`${urls.GET_REQUEST_DRAFT}`, config);
}
export async function deleteDraft() {
  return await get(`${urls.DELETE_REQUEST_DRAFT}`, config);
}

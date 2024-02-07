import urls from "../helpers/url_helpers";
import { get } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getAllFinance = withRetryHandling(
  ({ Status, SortOrder, Search, PageNumber, PageSize }) => {
    return get(
      `${urls.GET_ALL_FINANCE}?PageSize=${PageSize}&PageNumber=${PageNumber}&Search=${Search}&SortOrder=${SortOrder}&Status=${Status}`,
      config
    );
  }
);

export const addFinance = (data) => {
  return post(`${urls.ADD_FINANCE}`, data, config);
};
export const editFinance = (data) => {
  return put(`${urls.ADD_FINANCE}?id=${data.id}`, data, config);
};

export const updateApproval = (data) => {
  return post(`${urls.UPDATE_APPROVE_FINANCE}`, data, config);
};

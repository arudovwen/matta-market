import urls from "../helpers/url_helpers";
import { get, post, put, del } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const getAllFinance = withRetryHandling((data) => {
  return get(
    `${urls.GET_ALL_FINANCE}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
});

export const addFinance = (data) => {
  return post(`${urls.ADD_FINANCE}`, data, config);
};
export const getFinance = (data) => {
  return get(`${urls.GET_FINANCE}?id=${data}`, config);
};
export const editFinance = (data) => {
  return put(`${urls.EDIT_FINANCE}/${data.id}`, data, config);
};
export const withdrawFinance = (data) => {
  return put(`${urls.WITHDRAW_FINANCE}/${data}`, data, config);
};

export const updateFinanceStatus = (data) => {
  return post(`${urls.UPDATE_APPROVE_FINANCE}`, data, config);
};

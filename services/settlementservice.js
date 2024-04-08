import urls from "../helpers/url_helpers";
import { get, post, del, put } from "../helpers/api_helpers";
import store from "../store";
// import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const viewSettlement = () => {
  return get(`${urls.VIEW_SETTLEMENT}`, config);
};

export const addSettlement = (data) => {
  return post(`${urls.ADD_SETTLEMENT}`, data, config);
};

export const autoSettlement = (data) => {
  if (!data) return;
  return post(`${urls.AUTO_SETTLEMENT}`, data, config);
};
export const getAutoSettlement = () => {
  return get(`${urls.AUTO_SETTLEMENT_VALUE}`, config);
};
export const updateSettlement = (data) => {
  return put(`${urls.UPDATE_SETTLEMENT}/${data.id}`, data, config);
};

export const deleteSettlement = (data) => {
  return del(`${urls.DELETE_SETTLEMENT}/${data}`, config);
};

export const getBanks = () => {
  return get(
    `${urls.GET_BANKS}`,

    config
  );
};

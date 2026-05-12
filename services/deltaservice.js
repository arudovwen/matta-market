import urls from "../helpers/url_helpers";
import { createApiClient } from "~/helpers/api_helpers";
import store from "../store";
// import { withRetryHandling } from "../utils/retry-handling";

const { get, post } = createApiClient(
  "https://dev.gateway.matta.trade/flux/v1/"
);

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const calculateCost = (data) => {
  return post(`${urls.CALCULATOR_COST}`, data, {
    ...config,
    withCredentials: false,
  });
};

export const getEnquiry = (data) => {
  return post(`${urls.GET_ENQUIRY}`, data, {
    ...config,
    withCredentials: false,
  });
};

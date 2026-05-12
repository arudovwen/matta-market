import urls from "../helpers/url_helpers";
import { deltaPost } from "~/helpers/api_helpers";
import store from "../store";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Orders

export const calculateCost = (data) => {
  return deltaPost(`${urls.CALCULATOR_COST}`, data, {
    ...config,
    withCredentials: false,
  });
};

export const getEnquiry = (data) => {
  return deltaPost(`${urls.GET_ENQUIRY}`, data, {
    ...config,
    withCredentials: false,
  });
};

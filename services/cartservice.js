import urls from "../helpers/url_helpers";
import {
  post,
  get,
  del,
  put,
  marketPost,
  marketGet,
  marketPut,
  marketDelete,
} from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export async function createcart(data) {
  return await marketPost(urls.CREATE_CART, data, config);
}
export async function updatecart(data) {
  return await marketPost(urls.UPDATE_CART, data, config);
}
export async function getcart() {
  return await marketGet(urls.GET_CART, config);
}
export async function clearcart() {
  return await marketPost(urls.CLEAR_CART, {}, config);
}
export async function removecartitem(data) {
  return await marketPost(`${urls.REMOVE_CART}/${data}`, data, config);
}
export async function deleteAddress(data) {
  return await marketPost(`${urls.DELETE_SHIPPING}/${data}`, data, config);
}
export async function addshipping(data) {
  return await marketPost(urls.ADD_SHIPPING_ADDRESS, cleanObject(data), config);
}

export async function editshipping(data) {
  return await marketPost(urls.EDIT_SHIPPING_ADDRESS, data, config);
}
export async function applyDiscount(data) {
  return await marketPost(urls.APPLY_DISCOUNT, data, config);
}

export async function getDiscountByCode(data) {
  return await marketGet(urls.GET_DISCOUNT(data), config);
}

export async function setdefaultaddress(addressId) {
  return await marketPost(
    `${urls.DEFAULT_SHIPPING_ADDRESS}/${addressId}`,
    "",
    config
  );
}

export const getalladdress = withRetryHandling(() => {
  return marketGet(`${urls.GET_SHIPPING_ADDRESS}`, config);
});

export const getallpickuplocations = withRetryHandling(() => {
  return marketGet(`${urls.GET_PICKUP_ADDRESS}`, config);
});

export async function deletePickupLocation(data) {
  return await marketDelete(`${urls.DELETE_PICKUP}/${data}`, data, config);
}
export async function addPickupLocation(data) {
  return await marketPost(urls.ADD_PICKUP_ADDRESS, data, config);
}

export async function editPickupLocation(data) {
  return await marketPut(
    `${urls.EDIT_PICKUP_ADDRESS}/${data.id}`,
    data,
    config
  );
}
export async function confirmpurchase(data) {
  return await marketPost(`${urls.CONFIRM_PURCHASE}`, data, config);
}
export async function confirmavailablilty(data) {
  return await marketPost(`${urls.CONFIRM_AVAILABILITY}`, data, config);
}
export async function editOrder(data) {
  return await marketPost(`${urls.EDIT_ORDER}`, data, config);
}
export async function requestACall(data) {
  return await marketGet(`${urls.REQUEST_A_CALL}`, data, config);
}

export async function shippingBreakdown() {
  return await marketGet(`${urls.SHIPPONG_COST_BREAKDOWN}`, config);
}
export async function confirmpayment(data) {
  return await marketPost(`${urls.CONFIRM_PAYMENT}`, data, config);
}

export async function getcartorder(data) {
  return await marketGet(
    `${urls.GET_ORDER}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
}
export async function getcartcustomer(data) {
  return await marketGet(
    `${urls.GET_CUSTOMER_INFO}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
}

export async function addressSearch(data) {
  return await post(`${urls.ADDRESS_SEARCH}`, data, config);
}
export async function placeSuggestion(data) {
  return await get(
    `${urls.PLACE_SUGGESTION}?${new URLSearchParams(cleanObject(data))}`,
    config
  );
}

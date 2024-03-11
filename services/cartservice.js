import urls from "../helpers/url_helpers";
import { post, get } from "../helpers/api_helpers";
import store from "../store";
import { withRetryHandling } from "../utils/retry-handling";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export async function createcart(data) {
  return await post(urls.CREATE_CART, data, config);
}
export async function updatecart(data) {
  return await post(urls.UPDATE_CART, data, config);
}
export async function getcart() {
  return await get(urls.GET_CART, config);
}

export async function removecartitem(data) {
  return await post(`${urls.REMOVE_CART}/${data}`, data, config);
}
export async function deleteAddress(data) {
  return await post(`${urls.DELETE_SHIPPING}/${data}`, data, config);
}
export async function addshipping(data) {
  return await post(urls.ADD_SHIPPING_ADDRESS, data, config);
}

export async function editshipping(data) {
  return await post(urls.EDIT_SHIPPING_ADDRESS, data, config);
}

export async function setdefaultaddress(addressId) {
  return await post(
    `${urls.DEFAULT_SHIPPING_ADDRESS}/${addressId}`,
    "",
    config
  );
}

export const getalladdress = withRetryHandling(() => {
  return get(`${urls.GET_SHIPPING_ADDRESS}`, config);
});

export async function confirmpurchase(data) {
  return await post(`${urls.CONFIRM_PURCHASE}`, data, config);
}
export async function confirmpayment(data) {
  return await post(`${urls.CONFIRM_PAYMENT}/${data.orderId}`, data, config);
}

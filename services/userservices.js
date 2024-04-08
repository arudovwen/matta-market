import urls from "../helpers/url_helpers";
import { post, get } from "../helpers/api_helpers";
import store from "../store";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

export async function inviteUsers(data) {
  return await post(urls.INVITE_USERS, data, config);
}

export async function deleteInvite(data) {
  return await post(
    `${urls.DELETE_INVITES}?invitationId=${data.invitationId}`,
    data,
    config
  );
}
export async function resendInvite(data) {
  return await post(`${urls.RESEND_INVITE_USERS}`, data, config);
}
export async function customizeVendor(data) {
  return await post(`${urls.CUSTOMIZE_VENDOR_INFO}`, data, config);
}

export async function deleteUser(data) {
  return await post(`${urls.DELETE_USER}?email=${data.email}`, data, config);
}
export async function changeUserRole(data) {
  return await post(urls.CHANGE_ROLE, data, config);
}
export async function getInvites({
  Status,
  PageNumber = 1,
  PageSize = 10,
  Role,
  Search = "",
}) {
  return await get(
    `${urls.GET_INVITES}?Search=${Search}&Status=${Status}&Role=${Role}&PageNumber=${PageNumber}&PageSize=${PageSize}`,
    config
  );
}
export async function getRoles() {
  return await get(`${urls.GET_ROLES}`, config);
}
export async function getVendorInfo() {
  return await get(`${urls.GET_VENDOR_STORE}`, config);
}
export async function updateVendorInfo(data) {
  return await post(`${urls.UPDATE_VENDOR_STORE}`,data, config);
}
export async function postStoreName(data) {
  return await get(`${urls.POST_VENDOR_STORE_NAME}?storename=${data}`, config);
}

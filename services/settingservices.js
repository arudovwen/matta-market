import urls from "../helpers/url_helpers";
import { post, get, ssoGet, ssoPost, ssoPut } from "../helpers/api_helpers";
import store from "../store";

const config = {
  headers: { Authorization: `Bearer ${store.getters.accessToken}` },
};
//Authentication

//Markets
export async function getProfile() {
  return await ssoGet(`${urls.GET_SSO_PERSONAL_PROFILE}`, config);
}
export async function getCompanyProfile() {
  return await ssoGet(`${urls.GET_SSO_BUSINESS_PROFILE}`, config);
}
export async function updateProfile(data) {
  return await ssoPut(`${urls.GET_SSO_PERSONAL_PROFILE}`, data, config);
}
export async function updateDocuments(data) {
  return await ssoPut(`${urls.GET_SSO_BUSINESS_PROFILE}`, data, config);
}
export async function updateDirectors(data) {
  return await ssoPut(`${urls.GET_SSO_BUSINESS_PROFILE}`, data, config);
}
export async function changepassword(data) {
  return await post(`${urls.CHANGE_PASSWORD}`, data, config);
}
export async function updateCompanyProfile(data) {
  return await ssoPut(`${urls.GET_SSO_BUSINESS_PROFILE}`, data, config);
}
export async function settimezone(data) {
  return await post(`${urls.SET_TIMEZONE}`, data, config);
}
export async function deleteaccount(data) {
  return await post(`${urls.DELETE_ACCOUNT}`, data, config);
}
export async function getesfrontstats({ StartDate, EndDate }) {
  return await get(
    `${urls.STOREFRONT_STAT}?StartDate=${StartDate}&EndDate=${EndDate}`,
    config
  );
}
export async function getstorefronttrending({ StartDate, EndDate, top }) {
  return await get(
    `${urls.STOREFRONT_TRENDING_PRODUCT}?StartDate=${StartDate}&EndDate=${EndDate}&top=${top}`,
    config
  );
}

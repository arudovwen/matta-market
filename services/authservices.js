import urls from "../helpers/url_helpers";
import { post, get, ssoPost, ssoGet } from "../helpers/api_helpers";

//Authentication
export async function loginUser(user, config = {}) {
  return await ssoPost(urls.LOGIN_USER, user, config);
}
export async function logoutUser(user, config = {}) {
  return await ssoPost(urls.LOGIN_OUT, user, config);
}
export async function loginUser2FA(user, config = {}) {
  return await ssoPost(urls.LOGIN_USER_2FA, user, config);
}
export async function confirm2FA(user, config = {}) {
  return await get(`${urls.CONFIRM_2FA}?${new URLSearchParams(user)}`, config);
}
export async function ssoConfirmEmail(user, config = {}) {
  return await ssoPost(`${urls.CONFIRM_EMAIL}`,user, config);
}
export async function getTokenInfo(config = {}) {
  console.log("🚀 ~ getTokenInfo ~ config:", config)
  return await ssoPost(`${urls.GET_TOKEN_INFORMATION}`, {}, config);
}
export async function logOut() {
  const authStore = useAuthStore();
  // googleLogout();
  authStore.logOut();
}
export async function registerUser(user, config = {}) {
  return await post(urls.REGISTER, user, config);
}
export async function registerInvitedUser(user, config = {}) {
  return await post(urls.REGISTER_INVITED_USER, user, config);
}
export async function forgotPassword(user, config = {}) {
  return await post(urls.FORGOT_PASSWORD, user, config);
}
export async function resendVerification(data, config = {}) {
  return await post(urls.RESEND_VERIFICATION, data, config);
}

export async function resetPassword(user, config = {}) {
  return await post(urls.RESET_PASSWORD, user, config);
}
export async function resend2FA(data, config = {}) {
  return await ssoPost(urls.RESEND_2FA_OTP, data, config);
}
export async function confirmemail({ userId, code }, config = {}) {
  return await get(
    `${urls.CONFIRM_EMAIL}?userId=${userId}&code=${code}`,
    config
  );
}
export async function socialregister(data) {
  return await post(urls.SOCIAL_REGISTER, data);
}

export async function sociallogin(data) {
  return await post(urls.SOCIAL_LOGIN, data);
}
export async function sendMessage(data) {
  return await post(urls.CONTACT_USER, data);
}

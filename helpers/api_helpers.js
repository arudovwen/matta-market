import Axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { useAuthStore } from "~/stores/auth";
import { toast } from "vue3-toastify";

// const axios = setupCache(Axios);

const API_URL = "https://dev.gateway.matta.trade/api/";

const axiosApi = Axios.create({
  baseURL: API_URL,
});

axiosApi.defaults.withCredentials = true;
axiosApi.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  config.headers.Authorization = authStore?.access_token
    ? `Bearer ${authStore?.access_token}`
    : "";
  config.headers.Accept = "application/json";
  return config;
});
// Define an async function to handle token refresh
const handleTokenRefresh = async () => {
  const authStore = useAuthStore();
  // eslint-disable-next-line no-useless-catch
  try {
    // Call the API to refresh the token
    const refreshResponse = await axiosApi.post("/v1/Account/refreshtoken", {
      token: authStore.refresh_token,
      ipAddress: "string",
    });

    // Update the access token in the store or localStorage
    const newAccessToken = refreshResponse.data.jwToken;
    const newRefreshToken = refreshResponse.data.refreshToken;
    authStore.setAccessToken(newAccessToken);
    authStore.setRefreshToken(newRefreshToken);
    axiosApi.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${newAccessToken}`;

    // Return the new access token for further use
    return newAccessToken;
  } catch (refreshError) {
    throw refreshError;
  }
};
// Add a response interceptor to handle token refresh and retry requests
axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 403) {
      try {
        // Attempt to refresh the token
        const newAccessToken = await handleTokenRefresh();

        // Retry the failed request with the new access token
        error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axiosApi.request(error.config);
      } catch (refreshError) {
        const authStore = useAuthStore();
        // Handle refresh token failure, e.g., redirect to login
        // toast.info("Your session has expired");
        authStore.logOut();
        window.location.href = `/auth/login?info=session_expired&redirected_from=${window.location.href}`;
        return Promise.reject(refreshError);
      }
    } else {
      return Promise.reject(error);
    }
  }
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, config);
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, data, config);
}

export async function put(url, data, config = {}) {
  return axiosApi.put(url, data, config);
}

export async function del(url, config = {}) {
  return await axiosApi.delete(url, config);
}

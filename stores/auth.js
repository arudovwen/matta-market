import { defineStore } from "pinia";
import { logoutUser } from "~/services/authservices";

const cookieDomain =
  process.env.NODE_ENV === "production" ? ".matta.trade" : undefined;

const UserTypes = {
  0: "buyer",
  1: "supplier",
};

export const useAuthStore = defineStore(
  "matta_auth",
  () => {
    const config = useRuntimeConfig()
    const loggedUser = ref("");
    const hasPin = ref(false);
    const language = ref(window?.navigator?.language);
    const isLoggedIn = computed(() => !!loggedUser.value);
    const refresh_token = computed(() => loggedUser?.value?.refreshToken);
    const access_token = computed(() => loggedUser?.value?.jwToken);
    const roles = computed(() => loggedUser?.value?.roles);
    const userId = computed(() => loggedUser?.value?.id);
    const userType = computed(
      () => UserTypes[loggedUser?.value?.businessUserType]
    );
    const businessId = computed(() => loggedUser?.value?.businessId);
    const userInfo = computed(() => loggedUser?.value);

    function setLoggedUser(data) {
      loggedUser.value = data;
    }

    function setHasPin(data) {
      hasPin.value = data;
    }

    function setAccessToken(value) {
      let userInfo = { ...loggedUser?.value, access_token: value };
      setLoggedUser(userInfo);
    }
    function setRefreshToken(value) {
      let userInfo = { ...loggedUser?.value, refresh_token: value };
      setLoggedUser(userInfo);
    }
    function updateUser(value) {
      let userInfo = { ...loggedUser?.value, fullName: value };
      setLoggedUser(userInfo);
    }
    function updateAccountType(value) {
      let userInfo = { ...loggedUser?.value, accountType: value };

      setLoggedUser(userInfo);
    }
    function updateUserInfo(data) {
      let userInfo = { ...loggedUser?.value, ...data };
      setLoggedUser(userInfo);
    }

    const logOut = async () => {
      const response = await logoutUser({
        refreshToken: refresh_token.value,
        token: access_token.value,
      });
      if (response.status === 200) {
        localStorage.clear();
        clearCookies().then(() => {
          loggedUser.value = null;
          window.location.href = `${validationUrl}/auth/logout/${config.public.APP_ID}`;
        });
      }
    };
    return {
      updateUser,
      isLoggedIn,
      refresh_token,
      access_token,
      roles,
      userId,
      userType,
      userInfo,
      setRefreshToken,
      setAccessToken,
      updateAccountType,
      updateUserInfo,
      setLoggedUser,
      logOut,
      loggedUser,
      businessId,
      language,
      setHasPin,
      hasPin,
    };
  },
  {
    persist: {
      storage: persistedState.cookiesWithOptions({
        domain: cookieDomain,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
      }),
    },
  }
);

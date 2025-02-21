import { defineStore } from "pinia";
import { logoutUser } from "~/services/authservices";
import { logoutUrl } from "~/utils/constants";


const UserTypes = {
  0: "buyer",
  1: "supplier",
};

export const useAuthStore = defineStore(
  "matta_user",
  () => {
    const mattaAuth = useCookie("mattaAuth", defaultOptions);
    const appInfo = ref(null);
    const appList = ref([]);
    const loggedUser = ref("");
    const hasPin = ref(false);
    const language = ref(window?.navigator?.language);
    const isLoggedIn = computed(() => !!mattaAuth.value);
    const refresh_token = computed(() => mattaAuth?.value?.refreshToken);
    const jwToken = computed(() => mattaAuth?.value?.jwToken);
    const roles = computed(() => mattaAuth?.value?.roles);
    const userId = computed(() => mattaAuth?.value?.id);
    const userType = computed(
      () => UserTypes[mattaAuth?.value?.businessUserType]
    );
  const businessId = computed(() => mattaAuth?.value?.businessId);
    const userInfo = computed(() => mattaAuth?.value);

    function setLoggedUser(data) {
      loggedUser.value = data;
      mattaAuth.value = data;
    }

    function setAppInfo(data) {
      appInfo.value = data;
    }
    function setAppList(data) {
      appList.value = data;
    }
    function setHasPin(data) {
      hasPin.value = data;
    }

    function setAccessToken(value) {
      let userInfo = { ...loggedUser?.value, jwToken: value };
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
        token: jwToken.value,
      });
      if (response.status === 200) {
        localStorage.clear();
        clearCookies().then(() => {
          loggedUser.value = null;
          window.location.href = logoutUrl();
        });
      }
    };
    const clearAuth = () => {
      mattaAuth.value = null;
      clearCookies().then(() => {
        loggedUser.value = null;
        window.location.href = logoutUrl();
      });
    };
    return {
      updateUser,
      isLoggedIn,
      refresh_token,
      jwToken,
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
      appInfo,
      setAppInfo,
      setAppList,
      appList,
      clearAuth,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage
    },
  }
);

import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const loggedUser = ref("");
    const language = ref(window?.navigator?.language);
    const languages = [
      {
        code: "en",
        name: "En",
        cname: "英语",
        ename: "EnEnglish",
      },
      {
        code: "fr",
        name: "Fr",
        cname: "法语",
        ename: "Fr",
      },
    ];
    const isLoggedIn = computed(() => !!loggedUser.value);
    const refresh_token = computed(() => loggedUser?.value?.jwToken);
    const access_token = computed(() => loggedUser?.value?.jwToken);
    const roles = computed(() => loggedUser?.value?.roles);
    const userId = computed(() => loggedUser?.value?.id);
    const userType = computed(() => loggedUser?.value?.businessUserType);
    const businessId = computed(() => loggedUser?.value?.businessId);
    const userInfo = computed(() => loggedUser?.value);

    function setLoggedUser(data) {
      loggedUser.value = data;
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

    const logOut = () => {
      setLoggedUser(null)
      window.location.href = "/";
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
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);

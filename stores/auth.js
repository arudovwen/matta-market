import { defineStore } from "pinia";
import { logoutUser } from "~/services/authservices";
import { getCreditDetail } from "~/services/creditservice";
import { getBusinessType } from "~/services/userservices";
import { getWalletBalance } from "~/services/walletservice";
import { logoutUrl } from "~/utils/constants";

const UserTypes = {
  0: "buyer",
  1: "supplier",
};

export const useAuthStore = defineStore(
  "matta_user",
  () => {
    const mattaAuth = useCookie("mattaAuth_Dev", defaultOptions);
    const appInfo = ref(null);
    const appList = ref([]);
    const loggedUser = ref("");
    const hasPin = ref(false);
    const language = ref(window?.navigator?.language);
    const userBalance = ref(null);
    const isLoggedIn = computed(() => !!mattaAuth.value);
    const refreshToken = computed(() => mattaAuth?.value?.refreshToken);
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
      let userInfo = { ...loggedUser?.value, refreshToken: value };
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
      try {
        const response = await logoutUser({
          refreshToken: refreshToken.value,
          token: jwToken.value,
        });

        if (response.status === 200) {
          localStorage.clear();
          mattaAuth.value = null;
          signOut();
        }
      } catch (error) {
        console.error("Logout failed:", error);
        signOut();
      }
    };

    const signOut = () => {
      mattaAuth.value = null;
      clearCookies().then(() => {
        loggedUser.value = null;
        window.location.replace("/");
      });
    };
    async function getBusinessUserType() {
      try {
        const res = await getBusinessType();
        if (res.status === 200) {
          setLoggedUser({
            ...userInfo.value,
            businessUserType: res.data?.data?.businessUserType,
          });
          return true;
        }
        return false;
      } catch (error) {
        return false;
      }
    }
    async function getUserBalance() {
      try {
        let creditDetail = null;
        let balance = null;
        let hasCredit = false;

        const [creditRes, walletRes] = await Promise.allSettled([
          getCreditDetail(),
          getWalletBalance(),
        ]);

        if (
          creditRes.status === "fulfilled" &&
          creditRes.value.status === 200
        ) {
          creditDetail = creditRes.value.data.data;
          hasCredit = true;
        } else {
          hasCredit = false;
        }

        if (
          walletRes.status === "fulfilled" &&
          walletRes.value.status === 200
        ) {
          balance = walletRes.value.data.data;
        }

        userBalance.value = {
          balance,
          creditDetail: {
            ...creditDetail,
            hasCredit,
          },
        };
      } catch (error) {
        console.error("Unexpected error:", error);
      } finally {
      }
    }

    return {
      updateUser,
      isLoggedIn,
      refreshToken,
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
      signOut,
      getBusinessUserType,
      userBalance,
      getUserBalance,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);

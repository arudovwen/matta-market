<template>
  <div class="flex items-center justify-center w-screen h-screen p-10">
    <div class="flex flex-col items-center justify-center text-center gap-y-6">
      <AppLoaderV2 />
      <span class="block text-sm text-center">Signing you in</span>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { getTokenInfo } from "~/services/authservices";

const mattaAuth = useEncryptedCookie(AUTH_COOKIE_NAME, defaultOptions);
const authStore = useAuthStore();
const route = useRoute();
onMounted(async () => {
  const response = await getTokenInfo();
  if (response.status === 200) {
    let userData = {
      ...response.data.data,
      ...mattaAuth.value,
    };

    if (!userData.firstName && !userData.lastName) {
      userData.firstName = userData.companyName;
      userData.lastName = userData.companyName;
      userData.fullName = userData.companyName;
    }

    authStore.setLoggedUser(userData);
    authStore.setHasPin(response.data.data.hasTransactionPIN);
    localStorage.setItem("fetchCart", true);
    navigateTo(route.query.redirectUrl ||"/");
    return;
  }
});
</script>

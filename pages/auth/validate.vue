<template>
  <div class="flex justify-center items-center p-10 h-screen w-screen">
    <div class="text-center flex flex-col justify-center items-center gap-y-6">
      <AppLoaderV2 />
      <span class="text-sm text-center block">Validating user</span>
    </div>
  </div>
</template>

<script setup>
import { getTokenInfo } from "~/services/authservices";

const route = useRoute();
const { token } = route.query;
const authStore = useAuthStore();
onMounted(async () => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const response = await getTokenInfo(config);
  if (response.status === 200) {
    authStore.setLoggedUser(response.data.data);
    authStore.setHasPin(response.data.data.hasTransactionPIN);
    localStorage.setItem("fetchCart", true);
    window.location.replace("/user-type");
    return;
  }
});
</script>

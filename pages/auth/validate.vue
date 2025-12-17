<template>
  <div class="flex items-center justify-center w-screen h-screen p-10">
    <div class="flex flex-col items-center justify-center text-center gap-y-6">
      <AppLoaderV2 />
      <span class="block text-sm text-center">Signing you in</span>
    </div>
  </div>
</template>

<script setup>
import { getTokenInfo } from "~/services/authservices";

const { decrypt } = useEncryption();
const route = useRoute();
const { token, code } = route.query;
const authStore = useAuthStore();

onMounted(async () => {
  const decryptedRefresh = decrypt(code);
  const decryptedToken = decrypt(token);
  const config = {
    headers: { Authorization: `Bearer ${decryptedToken}` },
  };
  const response = await getTokenInfo(config);
  if (response.status === 200) {
    authStore.setLoggedUser({
      ...response.data.data,
      email: decrypt(response.data.data?.email),
      jwToken: decryptedToken,
      refreshToken: decryptedRefresh,
    });
    authStore.setHasPin(response.data.data.hasTransactionPIN);
    localStorage.setItem("fetchCart", true);
    window.location.replace("/");
    return;
  }
});
</script>

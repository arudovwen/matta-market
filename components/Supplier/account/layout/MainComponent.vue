<template>
  <section class="flex flex-col">
    <div
      v-if="
        route.name !== 'company settings' &&
        store.getters.loggedUser.accountType == 1
      "
    >
      <!-- <VerificationBox /> -->
    </div>
    <NuxtPage />
  </section>
</template>
<script setup>
import VerificationBox from "~/components/VerificationBox";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const route = useRoute();
</script>

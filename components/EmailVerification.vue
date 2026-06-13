<template>
  <div
    class="rounded-[20px] bg-white p-6 lg:p-10 shadow text-center w-[350px] max-w-[400px] mt-6"
    v-if="current == 'verified'"
  >
    <NuxtImg
      src="/images/success.png"
      class="mx-auto mb-[10px]"
      alt="success"
    />
    <h3 class="text-2xl mb-[27px] font-bold">Email verified</h3>

    <NuxtLink to="/auth/login">
      <button
        class="whitespace-nowrap appearance-none leading-none px-10 py-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
      >
        Back to login
      </button>
    </NuxtLink>
  </div>
  <div
    class="rounded-[20px] bg-white p-6 lg:p-10 shadow text-center w-[350px] max-w-[400px]"
    v-if="current == 'pending'"
  >
    <i class="fa fa-spinner fa-spin fa-6x mx-auto mb-6" aria-hidden="true"></i>
    <h3 class="text-xl font-medium text-matta-black mb-6">Verifying email..</h3>
  </div>
  <div
    class="rounded-[20px] bg-white p-6 lg:p-10 shadow text-center w-[350px] max-w-[400px]"
    v-if="current == 'failed'"
  >
    <XMarkIcon class="w-32 h-32 text-red-500 mx-auto" />
    <h3 class="text-xl font-medium text-matta-black mb-6">
      Verification failed
    </h3>

    <NuxtLink to="/auth/login">
      <button
        class="whitespace-nowrap appearance-none leading-none px-10 py-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
      >
        Back to login
      </button>
    </NuxtLink>
  </div>
</template>

<script setup>
import { CheckCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { confirmemail } from "~/services/authservices";

const current = ref("pending");
const route = useRoute();
onMounted(() => {
  confirmemail({ userId: route.query.userId, code: route.query.code })
    .then((res) => {
      if (res.status == 200) {
        current.value = "verified";
      }
    })
    .catch(() => {
      current.value = "failed";
    });
});
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>

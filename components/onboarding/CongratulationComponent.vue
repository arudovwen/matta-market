<template>
  <div
    class="bg-[#E7EBEE] p-6 flex flex-col gap-y-2 h-screen w-full overflow-y-auto justify-center items-center"
  >
    <div
      class="rounded-[20px] bg-white p-6 lg:p-10 shadow-lg text-center max-w-[400px]"
    >
      <i class="uil uil-check-circle text-[#59B221] mb-8 text-[80px]"></i>
      <h3 class="text-xl font-medium text-matta-black mb-6">
        Congratulations!
      </h3>

      <p class="text-matta-black mb-10">
        Thank you! We will contact you shortly to verify your account.
      </p>
      <NuxtLink to="/overview">
        <button
          class="appearance-none leading-none px-10 py-4 rounded-lg text-white bg-primary-500 hover:opacity-70 text-[13px] uppercase"
        >
          Proceed to dashboard
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<style lang="scss" scoped>
.bg-img {
  background-image: url("~/assets/img/bee.svg");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}
</style>

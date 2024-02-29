<template>
  <section class="">
    <header class="h-[200px] xl:h-[672px] bg-gray-600 mb-[70px]">
      <img
        src="/images/financeimg.png"
        class="w-full h-full object-cover"
      />
    </header>

    <div class="container pb-20">
      <h1 class="text-center font-semibold text-3xl xl:text-4xl mb-5 text-[#101828]">
        All-in-one finance for any business
      </h1>
      <p
        class="text-center text-base xl:text-xl text-[#475467] mb-[60px] max-w-[768px] mx-auto"
      >
        Get a deposit account, credit card, and spend management software—in one
        refreshingly easy solution. No fees or minimums.
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-[60px] lg:gap-y-[50px]">
        <article class="" v-for="n in FinancesOptions" :key="n.title">
          <div class="h-[240px] text-left mb-5">
            <img
              :src="n.img"
              class="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div class="text-left">
            <h2 class="mb-2 text-[#101828] text-2xl capitalize font-semibold">
              {{ n.title }}
            </h2>
            <p class="text-[#475467] text-base mb-5">{{ n.text }}</p>
            <AppButton
              :link="n.url"
              text="Get started"
              btnClass="text-primary-500 !px-0 !py-0 font-semibold"
            />
          </div>
        </article>
      </div>
    </div>
    <LandingCall />
  </section>
</template>

<script setup>
definePageMeta({
  layout: "default",
});
</script>

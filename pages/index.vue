<template>
  <div class="min-h-screen mx-auto">
    <LandingBanner />

    <div class="bg-[#F4F4F4] darks:bg-gray-700 pt-8 sm:pt-[60px]">
      <div class="hidden lg:block mb-6 sm:mb-10 container">
        <LandingBoard
          link="https://matta.trade/product/ASPARTAME/3009649000015519001?categoryId="
        />
      </div>
      <div class="pb-8 xl:pb-[70px]">
        <LandingHistory />
        <LandingHot tag="hotdeals" />
        <div class="lg:hidden mb-6 sm:mb-10 container">
          <LandingBoard
            link="https://matta.trade/product/ASPARTAME/3009649000015519001?categoryId="
          />
        </div>
        <!-- <LandingRecommended tag="recommended" /> -->
        <LandingHot title="Recommended" tag="recommended" />
        <LandingHot title="Best sellers" tag="bestsellers" />
        <div class="container">
          <LandingBoard
            url="https://res.cloudinary.com/arudovwen-me/image/upload/f_auto,q_auto/icxwdfiszid12mimlr3h"
            link="https://matta.trade/product/Sodium%20Cyclamate/3009649000015634003?categoryId="
          />
        </div>
      </div>
      <LandingInfo />
    </div>
    <div class="bg-white pt-6 md:pt-10">
      <LandingCategories />
      <LandingBrands />
      <LandingTestimonials />
      <LandingCall />
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: "default",
});
</script>

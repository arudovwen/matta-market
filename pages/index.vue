<template>
  <div class="min-h-screen mx-auto">
    <LandingBanner />

    <div class="bg-[#F4F4F4] darks:bg-gray-700 pt-8 sm:pt-[60px]">
      <div class="container hidden mb-6 lg:block sm:mb-10">
        <LandingBoard
          link="https://matta.trade/product/ASPARTAME/3009649000015519001?categoryId="
          url="https://res.cloudinary.com/arudovwen-me/image/upload/v1757331185/Signature2-ezgif.com-video-to-gif-converter_1_zlt4lc.gif"
        />
      </div>
      <div class="pb-8 xl:pb-[70px]">
        <LandingHistory />
        <LandingHot tag="hotdeals" />
        <div class="container mb-6 lg:hidden sm:mb-10">
          <LandingBoard
            link="https://matta.trade/product/ASPARTAME/3009649000015519001?categoryId="
            url="https://res.cloudinary.com/arudovwen-me/image/upload/v1757331185/Signature2-ezgif.com-video-to-gif-converter_1_zlt4lc.gif"
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
    <div class="pt-6 bg-white md:pt-10">
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
